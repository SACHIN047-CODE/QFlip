import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// OPD Queue Management, Token Generation & Reception Re-entry Endpoint
class QueueEndpoint extends Endpoint {
  /// Fetch all active queue tokens (optional department/status filter)
  Future<List<QueueEntry>> getTokens(
    Session session, {
    String? department,
    String? status,
  }) async {
    final tokens = await QueueEntry.db.find(
      session,
      orderBy: (t) => t.sequenceNumber,
    );

    return tokens.where((t) {
      if (status != null && status.isNotEmpty && status != 'All') {
        if (t.status.toLowerCase() != status.toLowerCase()) return false;
      }
      return true;
    }).toList();
  }

  /// Get specific token by token number e.g. "OPD-104"
  Future<QueueEntry?> getTokenByNumber(
    Session session,
    String tokenNumber,
  ) async {
    return await QueueEntry.db.findFirstRow(
      session,
      where: (t) => t.tokenNumber.equals(tokenNumber.trim().toUpperCase()),
    );
  }

  /// Check live doctor capacity, remaining OPD time, and buffer limits
  Future<DoctorCapacity> checkDoctorCapacity(
    Session session,
    int doctorId,
  ) async {
    final doctor = await Doctor.db.findById(session, doctorId);
    final activeTokens = await QueueEntry.db.find(
      session,
      where: (t) =>
          t.doctorId.equals(doctorId) &
          (t.status.equals('waiting') | t.status.equals('in_consultation')),
    );

    final activeWorkload = activeTokens.length;
    final avgDuration = doctor?.averageConsultationTimeMinutes.toDouble() ?? 8.0;
    const bufferLimit = 5;

    // Simulated standard shift: 09:00 AM to 02:00 PM (300 total mins)
    const totalOpdMinutes = 300;
    final remainingOpdMinutes = totalOpdMinutes - (activeWorkload * avgDuration.toInt()).clamp(0, totalOpdMinutes);
    final estimatedCompletionMinutes = (activeWorkload * avgDuration).round();
    final isClosed = remainingOpdMinutes <= 0;

    final bufferTokens = activeTokens.where((t) => t.isBuffer).length;
    final remainingBufferCapacity = (bufferLimit - bufferTokens).clamp(0, bufferLimit);
    final standardCapacity = (totalOpdMinutes / avgDuration).floor();
    final remainingStandardCapacity = (standardCapacity - activeWorkload).clamp(0, standardCapacity);

    bool canAccept = true;
    bool isBuffer = false;
    String reason = 'Standard queue capacity available.';

    if (isClosed) {
      canAccept = false;
      reason = 'Doctor OPD session has closed for today.';
    } else if (activeWorkload < standardCapacity) {
      canAccept = true;
      isBuffer = false;
      reason = 'Standard queue capacity available.';
    } else {
      // Standard full -> check buffer
      if (bufferTokens < bufferLimit) {
        canAccept = true;
        isBuffer = true;
        reason = 'Standard capacity reached. Accepted under Extended Buffer Capacity ($remainingBufferCapacity slot(s) left).';
      } else {
        canAccept = false;
        isBuffer = false;
        reason = 'Doctor queue reached maximum booking capacity (including buffer limit of $bufferLimit).';
      }
    }

    return DoctorCapacity(
      canAccept: canAccept,
      isBuffer: isBuffer,
      reason: reason,
      remainingOpdMinutes: remainingOpdMinutes,
      activeWorkload: activeWorkload,
      avgConsultationDurationMinutes: avgDuration,
      estimatedCompletionMinutes: estimatedCompletionMinutes,
      remainingStandardCapacity: remainingStandardCapacity,
      currentBufferPatients: bufferTokens,
      remainingBufferCapacity: remainingBufferCapacity,
      bufferLimit: bufferLimit,
      isAvailable: doctor?.isAvailable ?? true,
      isClosed: isClosed,
    );
  }

  /// Generate a digital OPD queue token
  Future<QueueEntry> generateToken(
    Session session,
    int patientId,
    int departmentId, {
    int? doctorId,
    String? triageLevel = 'green',
    String? symptoms = '',
    String? priority = 'Normal',
  }) async {
    // Count existing tokens for today
    final existingTokens = await QueueEntry.db.find(
      session,
      where: (t) => t.departmentId.equals(departmentId),
      orderBy: (t) => t.sequenceNumber,
    );

    final nextSeq = existingTokens.isEmpty ? 1 : (existingTokens.last.sequenceNumber + 1);
    final tokenNumber = 'OPD-${nextSeq.toString().padLeft(3, '0')}';

    int priorityScore = 10;
    if (priority == 'Emergency' || triageLevel == 'red') {
      priorityScore = 100;
    } else if (priority == 'Senior' || triageLevel == 'yellow') {
      priorityScore = 50;
    } else if (priority == 'Pediatric') {
      priorityScore = 30;
    }

    // Capacity check if doctor specified
    bool isBuffer = false;
    if (doctorId != null) {
      final cap = await checkDoctorCapacity(session, doctorId);
      if (!cap.canAccept) {
        throw Exception(cap.reason);
      }
      isBuffer = cap.isBuffer;
    }

    final waitingAhead = existingTokens.where((t) => t.status == 'waiting').length;
    final waitMinutes = (waitingAhead * 6).clamp(3, 180);

    final newEntry = QueueEntry(
      tokenNumber: tokenNumber,
      sequenceNumber: nextSeq,
      patientId: patientId,
      departmentId: departmentId,
      doctorId: doctorId,
      status: 'waiting',
      triageLevel: triageLevel ?? 'green',
      priorityScore: priorityScore,
      symptoms: symptoms,
      estimatedWaitTimeMinutes: waitMinutes,
      checkInTime: DateTime.now(),
      isBuffer: isBuffer,
      entryType: isBuffer ? 'buffer' : 'standard',
      createdAt: DateTime.now(),
    );

    return await QueueEntry.db.insertRow(session, newEntry);
  }

  /// Call next patient into consultation room (Emergency > Senior > Normal)
  Future<QueueEntry?> callNext(
    Session session,
    int departmentId, {
    int? doctorId,
  }) async {
    // 1. Mark current in_consultation token as completed
    final inConsultation = await QueueEntry.db.findFirstRow(
      session,
      where: (t) =>
          t.departmentId.equals(departmentId) &
          t.status.equals('in_consultation'),
    );
    if (inConsultation != null) {
      inConsultation.status = 'completed';
      inConsultation.completionTime = DateTime.now();
      await QueueEntry.db.updateRow(session, inConsultation);
    }

    // 2. Find next waiting patient sorted by priorityScore
    final waitingTokens = await QueueEntry.db.find(
      session,
      where: (t) =>
          t.departmentId.equals(departmentId) &
          t.status.equals('waiting'),
      orderBy: (t) => t.priorityScore,
    );

    if (waitingTokens.isEmpty) return null;

    final sorted = waitingTokens.reversed.toList();
    final next = sorted.first;
    next.status = 'in_consultation';
    next.callTime = DateTime.now();
    next.consultationStartTime = DateTime.now();
    next.estimatedWaitTimeMinutes = 0;
    if (doctorId != null) next.doctorId = doctorId;

    return await QueueEntry.db.updateRow(session, next);
  }

  /// Skip a patient (moves them to separate Skipped queue)
  Future<QueueEntry> skipPatient(
    Session session,
    int queueId, {
    String? reason,
  }) async {
    final entry = await QueueEntry.db.findById(session, queueId);
    if (entry == null) throw Exception('Queue token not found');

    entry.status = 'skipped';
    entry.skippedAt = DateTime.now();
    entry.delayReason = reason ?? 'Patient not present when called';
    return await QueueEntry.db.updateRow(session, entry);
  }

  /// Reception Physical Re-entry with THREE-PLACE PENALTY
  Future<QueueEntry> rejoinPatient(
    Session session,
    String tokenNumber, {
    int? staffId,
  }) async {
    final entry = await QueueEntry.db.findFirstRow(
      session,
      where: (t) => t.tokenNumber.equals(tokenNumber.trim().toUpperCase()),
    );

    if (entry == null) {
      throw Exception('Token "$tokenNumber" not found in hospital registry.');
    }

    if (entry.status == 'waiting') {
      throw Exception('Duplicate scan: Token ${entry.tokenNumber} is already active in the queue.');
    }
    if (entry.status == 'in_consultation') {
      throw Exception('Token ${entry.tokenNumber} is currently inside the consultation room.');
    }
    if (entry.status == 'completed') {
      throw Exception('Token ${entry.tokenNumber} has already completed consultation today.');
    }

    // Get active waiting tokens in this department
    final waiting = await QueueEntry.db.find(
      session,
      where: (t) =>
          t.departmentId.equals(entry.departmentId) &
          t.status.equals('waiting'),
      orderBy: (t) => t.priorityScore,
    );

    // Apply 3-position penalty
    final penalty = 3;
    final targetPosition = (waiting.length >= penalty) ? penalty : waiting.length;

    entry.status = 'waiting';
    entry.rejoinedAt = DateTime.now();
    entry.reentryPenaltyApplied = true;
    entry.reentryPenaltyPositions = penalty;
    entry.estimatedWaitTimeMinutes = (targetPosition * 6).clamp(5, 60);

    return await QueueEntry.db.updateRow(session, entry);
  }

  /// Get all skipped patients awaiting reception check-in
  Future<List<QueueEntry>> getSkippedTokens(
    Session session, {
    int? departmentId,
  }) async {
    final list = await QueueEntry.db.find(
      session,
      where: (t) =>
          t.status.equals('skipped') &
          (departmentId != null ? t.departmentId.equals(departmentId) : Constant.bool(true)),
      orderBy: (t) => t.skippedAt,
    );
    return list.reversed.toList();
  }

  /// Update general queue token status
  Future<QueueEntry> updateStatus(
    Session session,
    int queueId,
    String status,
  ) async {
    final entry = await QueueEntry.db.findById(session, queueId);
    if (entry == null) throw Exception('Queue entry not found');

    entry.status = status;
    if (status == 'completed') entry.completionTime = DateTime.now();
    return await QueueEntry.db.updateRow(session, entry);
  }
}
