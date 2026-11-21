import dayjs from 'dayjs';
import { Queue } from '../models/Queue.js';
import { Department } from '../models/Department.js';
import { Doctor } from '../models/Doctor.js';
import { ApiError } from '../utils/ApiError.js';
import { generateQueueToken } from '../utils/generateQueueToken.js';
import { getSocketIO, sendNotification } from './notificationService.js';
import { QueueCapacityService } from './queueCapacityService.js';
import logger from '../config/logger.js';

export class QueueService {
  /**
   * Calculate live estimated wait time in minutes for a queue position
   */
  static async calculateWaitTime(departmentId, patientsAheadCount) {
    if (!departmentId) {
      return Math.max(Math.round(patientsAheadCount * 12), 2);
    }
    const department = await Department.findById(departmentId);
    const avgTime = department?.averageWaitTimeMinutes || 12;

    // Count currently active and available doctors in this department
    const activeDoctorsCount = await Doctor.countDocuments({
      departmentId,
      isAvailable: true
    });

    const effectiveDoctors = Math.max(activeDoctorsCount, 1);
    const waitTime = Math.round((patientsAheadCount * avgTime) / effectiveDoctors);
    return Math.max(waitTime, 2); // At least 2 minutes minimum
  }

  /**
   * Generate next token for department with doctor capacity & buffer controls
   */
  static async generateToken({
    patientId,
    departmentId,
    doctorId = null,
    appointmentId = null,
    triageLevel = 'green',
    symptoms = ''
  }) {
    const department = await Department.findById(departmentId);
    if (!department) {
      throw ApiError.notFound('Department not found');
    }

    let isBufferEntry = false;

    // 1. Enforce Doctor-wise Queue Capacity & Buffer limit
    if (doctorId) {
      const capacity = await QueueCapacityService.calculateDoctorCapacity(doctorId);
      if (!capacity.canAccept) {
        throw ApiError.badRequest(capacity.reason, {
          capacityExhausted: true,
          remainingOpdMinutes: capacity.remainingOpdMinutes,
          activeWorkload: capacity.activeWorkload,
          bufferLimit: capacity.bufferLimit,
          alternativeDoctors: capacity.alternativeDoctors
        });
      }
      isBufferEntry = capacity.isBuffer;
    }

    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();

    // Find highest sequence for this department today
    const lastToken = await Queue.findOne({
      departmentId,
      createdAt: { $gte: todayStart, $lte: todayEnd }
    }).sort({ sequenceNumber: -1 });

    const nextSeq = lastToken ? lastToken.sequenceNumber + 1 : 1;
    const tokenNumber = generateQueueToken(department.code, nextSeq);

    // Compute priority score
    let priorityScore = 10;
    if (triageLevel === 'red') priorityScore = 100;
    else if (triageLevel === 'yellow') priorityScore = 50;

    // Count patients currently waiting ahead (only active waiting and called patients)
    const waitingAhead = await Queue.countDocuments({
      departmentId,
      status: { $in: ['waiting', 'called'] },
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const estimatedWaitTimeMinutes = await this.calculateWaitTime(
      departmentId,
      waitingAhead
    );

    const queueEntry = await Queue.create({
      tokenNumber,
      sequenceNumber: nextSeq,
      patientId,
      departmentId,
      doctorId,
      appointmentId,
      status: 'waiting',
      triageLevel,
      priorityScore,
      symptoms,
      estimatedWaitTimeMinutes,
      checkInTime: new Date(),
      isBuffer: isBufferEntry,
      entryType: isBufferEntry ? 'buffer' : 'standard',
      statusHistory: [
        {
          status: 'waiting',
          timestamp: new Date(),
          note: isBufferEntry
            ? 'Token issued under Extended Buffer Capacity quota'
            : 'Standard token issued'
        }
      ]
    });

    // Populate patient, department, and doctor
    await queueEntry.populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
      { path: 'departmentId', select: 'name code floor' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
    ]);

    // Broadcast queue update via Socket.IO
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${departmentId}`).emit('queue:new_token', {
        queueEntry,
        waitingAhead,
        isBuffer: isBufferEntry
      });
      io.emit('queue:stats_update', {
        departmentId,
        departmentCode: department.code,
        waitingCount: waitingAhead + 1
      });
    }

    return queueEntry;
  }

  /**
   * Get Live OPD Queue Board for a department
   */
  static async getDepartmentQueue(departmentId) {
    const todayStart = dayjs().startOf('day').toDate();

    const currentServing = await Queue.findOne({
      departmentId,
      status: 'in_consultation',
      createdAt: { $gte: todayStart }
    })
      .sort({ updatedAt: -1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    const currentlyCalled = await Queue.findOne({
      departmentId,
      status: 'called',
      createdAt: { $gte: todayStart }
    })
      .sort({ updatedAt: -1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    // Active main queue: strictly 'waiting' status only (skipped are completely excluded)
    const waitingList = await Queue.find({
      departmentId,
      status: 'waiting',
      createdAt: { $gte: todayStart }
    })
      .sort({ priorityScore: -1, sequenceNumber: 1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    // Separate skipped patients queue
    const skippedList = await Queue.find({
      departmentId,
      status: 'skipped',
      createdAt: { $gte: todayStart }
    })
      .sort({ skippedAt: -1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    const completedCount = await Queue.countDocuments({
      departmentId,
      status: 'completed',
      createdAt: { $gte: todayStart }
    });

    return {
      currentServing,
      currentlyCalled,
      waitingList,
      skippedList,
      totalWaiting: waitingList.length,
      totalSkipped: skippedList.length,
      totalCompleted: completedCount
    };
  }

  /**
   * Get Skipped Patients Queue awaiting reception check-in
   */
  static async getSkippedQueue(departmentId = null) {
    const todayStart = dayjs().startOf('day').toDate();
    const query = {
      status: 'skipped',
      createdAt: { $gte: todayStart }
    };
    if (departmentId) {
      query.departmentId = departmentId;
    }

    const skippedPatients = await Queue.find(query)
      .sort({ skippedAt: -1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name phone email abhaId' } },
        { path: 'departmentId', select: 'name code floor' },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    return skippedPatients;
  }

  /**
   * Advance Queue Status (Doctor calls patient, starts consultation, completes, or skips)
   */
  static async updateQueueStatus(queueId, nextStatus, staffOrDoctorId = null, delayReason = '') {
    const queue = await Queue.findById(queueId).populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
      { path: 'departmentId', select: 'name code' }
    ]);

    if (!queue) {
      throw ApiError.notFound('Queue token record not found');
    }

    // When skipping a patient:
    // Completely remove from active main queue, move into separate Waiting / Skipped Patients Queue
    if (nextStatus === 'skipped') {
      return this.skipPatient(queueId, staffOrDoctorId, delayReason);
    }

    queue.status = nextStatus;

    if (staffOrDoctorId) {
      queue.doctorId = staffOrDoctorId;
    }

    if (nextStatus === 'called') {
      queue.callTime = new Date();
    } else if (nextStatus === 'in_consultation') {
      queue.consultationStartTime = new Date();
    } else if (nextStatus === 'completed') {
      queue.completionTime = new Date();
    }

    if (delayReason) {
      queue.delayReason = delayReason;
    }

    queue.statusHistory.push({
      status: nextStatus,
      timestamp: new Date(),
      updatedBy: staffOrDoctorId,
      note: delayReason || `Status updated to ${nextStatus}`
    });

    await queue.save();

    // Real-time broadcast
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${queue.departmentId._id}`).emit('queue:status_changed', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        status: nextStatus,
        doctorId: queue.doctorId
      });
      io.emit('queue:stats_update', {
        departmentId: queue.departmentId._id,
        departmentCode: queue.departmentId.code
      });
    }

    // Send push notification to patient
    if (queue.patientId?.userId?._id) {
      const recipientId = queue.patientId.userId._id;
      let alertMsg = `Your token ${queue.tokenNumber} is now: ${nextStatus.replace('_', ' ').toUpperCase()}`;
      if (nextStatus === 'called') {
        alertMsg = `Attention: Token ${queue.tokenNumber} is being called to the consultation room! Please proceed inside.`;
      }
      await sendNotification({
        recipientUserId: recipientId,
        title: `Queue Status: ${queue.tokenNumber}`,
        message: alertMsg,
        type: 'queue_update',
        metadata: { tokenNumber: queue.tokenNumber, status: nextStatus }
      });
    }

    return queue;
  }

  /**
   * Skip a patient in the priority queue.
   * Removes from active main queue into separate Skipped Patients Queue.
   * Patient must not occupy a position in the active main queue while waiting.
   */
  static async skipPatient(queueId, staffOrDoctorId = null, delayReason = '') {
    const queue = await Queue.findById(queueId).populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
      { path: 'departmentId', select: 'name code' }
    ]);

    if (!queue) {
      throw ApiError.notFound('Queue token record not found');
    }

    queue.status = 'skipped';
    queue.skippedAt = new Date();
    queue.delayReason = delayReason || 'Patient skipped during consultation call. Awaiting reception check-in.';

    queue.statusHistory.push({
      status: 'skipped',
      timestamp: new Date(),
      updatedBy: staffOrDoctorId,
      note: delayReason || 'Patient skipped – awaiting physical reception check-in'
    });

    await queue.save();

    // Recalculate wait times for all remaining active waiting patients
    await this.recalculateDepartmentWaitTimes(queue.departmentId._id);

    // Broadcast via Socket.IO
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${queue.departmentId._id}`).emit('queue:status_changed', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        status: 'skipped',
        displayStatus: 'Skipped – Awaiting Reception Check-in'
      });
      io.to(`dept:${queue.departmentId._id}`).emit('queue:patient_skipped', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        skippedAt: queue.skippedAt
      });
      io.emit('queue:stats_update', {
        departmentId: queue.departmentId._id,
        departmentCode: queue.departmentId.code
      });
    }

    // Send patient-facing notification with explicit instructions
    if (queue.patientId?.userId?._id) {
      await sendNotification({
        recipientUserId: queue.patientId.userId._id,
        title: `Token Skipped: ${queue.tokenNumber}`,
        message: `Your token ${queue.tokenNumber} was skipped. Please visit reception and scan your token to rejoin the queue.`,
        type: 'queue_update',
        metadata: {
          tokenNumber: queue.tokenNumber,
          status: 'skipped',
          instruction: 'Your token was skipped. Please visit reception and scan your token to rejoin the queue.'
        }
      });
    }

    return queue;
  }

  /**
   * Reception re-entry verification and rejoining with THREE-PLACE PENALTY.
   * Only staff or authorized personnel can confirm physical arrival via token/QR scan.
   */
  static async rejoinPatient({ tokenNumber, queueId, verifiedByStaffId }) {
    const todayStart = dayjs().startOf('day').toDate();

    let queue = null;
    if (queueId) {
      queue = await Queue.findById(queueId).populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
        { path: 'departmentId', select: 'name code' },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);
    } else if (tokenNumber) {
      queue = await Queue.findOne({
        tokenNumber: tokenNumber.trim().toUpperCase(),
        createdAt: { $gte: todayStart }
      }).populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
        { path: 'departmentId', select: 'name code' },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);
    }

    if (!queue) {
      throw ApiError.notFound('Queue token record not found for today.');
    }

    // Prevent duplicate scans and validate status
    if (queue.status === 'waiting') {
      // Find current position in active queue
      const activeAhead = await Queue.countDocuments({
        departmentId: queue.departmentId._id,
        status: 'waiting',
        $or: [
          { priorityScore: { $gt: queue.priorityScore } },
          { priorityScore: queue.priorityScore, sequenceNumber: { $lt: queue.sequenceNumber } }
        ],
        createdAt: { $gte: todayStart }
      });
      throw ApiError.badRequest(
        `Duplicate scan: Token ${queue.tokenNumber} is already active in the main queue at position #${activeAhead + 1}.`
      );
    }

    if (queue.status === 'in_consultation' || queue.status === 'called') {
      throw ApiError.badRequest(
        `Duplicate scan: Token ${queue.tokenNumber} is already currently being attended in the consultation room.`
      );
    }

    if (queue.status === 'completed') {
      throw ApiError.badRequest(
        `Token ${queue.tokenNumber} has already completed consultation.`
      );
    }

    if (queue.status !== 'skipped') {
      throw ApiError.badRequest(
        `Token ${queue.tokenNumber} is not in the skipped queue (current status: ${queue.status}).`
      );
    }

    // 1. Retrieve all currently active waiting patients in this department
    const activeWaiting = await Queue.find({
      departmentId: queue.departmentId._id,
      status: 'waiting',
      createdAt: { $gte: todayStart }
    }).sort({ priorityScore: -1, sequenceNumber: 1 });

    // 2. Determine natural position under priority rules
    // Emergency cases (priorityScore 100) must maintain clinical priority.
    let naturalIndex = 0;
    while (
      naturalIndex < activeWaiting.length &&
      activeWaiting[naturalIndex].priorityScore > queue.priorityScore
    ) {
      naturalIndex++;
    }

    // 3. Apply THREE-PLACE PENALTY:
    // The patient joins 3 positions behind the position they would otherwise receive
    let targetIndex = naturalIndex + 3;
    if (targetIndex > activeWaiting.length) {
      targetIndex = activeWaiting.length;
    }

    // Preserve emergency triage rules:
    // A non-emergency patient with penalty can NEVER be placed ahead of an emergency patient!
    const emergencyCount = activeWaiting.filter((t) => t.priorityScore === 100).length;
    if (queue.priorityScore < 100 && targetIndex < emergencyCount) {
      targetIndex = emergencyCount;
    }

    // 4. Insert returning patient into active waiting list at targetIndex
    const newOrderedList = [...activeWaiting];
    newOrderedList.splice(targetIndex, 0, queue);

    // 5. Update sequence numbers across the active waiting list to establish new ordering
    for (let i = 0; i < newOrderedList.length; i++) {
      const entry = newOrderedList[i];
      const newSequenceNumber = (i + 1) * 10;
      if (entry._id.toString() === queue._id.toString()) {
        queue.sequenceNumber = newSequenceNumber;
      } else if (entry.sequenceNumber !== newSequenceNumber) {
        await Queue.updateOne({ _id: entry._id }, { sequenceNumber: newSequenceNumber });
      }
    }

    // 6. Update queue entry state
    queue.status = 'waiting';
    queue.rejoinedAt = new Date();
    queue.reentryPenaltyApplied = true;
    queue.reentryPenaltyPositions = 3;
    queue.verifiedByStaff = verifiedByStaffId || null;

    const patientsAhead = targetIndex;
    queue.estimatedWaitTimeMinutes = await this.calculateWaitTime(
      queue.departmentId._id,
      patientsAhead
    );

    queue.statusHistory.push({
      status: 'waiting',
      timestamp: new Date(),
      updatedBy: verifiedByStaffId,
      note: `Physical arrival verified by reception staff. Rejoined active main queue at position #${targetIndex + 1} with 3-place penalty applied.`
    });

    await queue.save();

    // 7. Recalculate wait times for all waiting patients
    await this.recalculateDepartmentWaitTimes(queue.departmentId._id);

    // 8. Broadcast update to all connected users via Socket.IO
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${queue.departmentId._id}`).emit('queue:token_rejoined', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        newPosition: targetIndex + 1,
        patientsAhead,
        estimatedWaitTimeMinutes: queue.estimatedWaitTimeMinutes,
        penaltyApplied: 3
      });
      io.to(`dept:${queue.departmentId._id}`).emit('queue:status_changed', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        status: 'waiting',
        displayStatus: 'Rejoined Main Queue'
      });
      io.emit('queue:stats_update', {
        departmentId: queue.departmentId._id,
        departmentCode: queue.departmentId.code
      });
    }

    // 9. Send patient push notification
    if (queue.patientId?.userId?._id) {
      await sendNotification({
        recipientUserId: queue.patientId.userId._id,
        title: `Rejoined Queue: ${queue.tokenNumber}`,
        message: `Your physical arrival has been verified. You have rejoined the main queue at position #${targetIndex + 1}. Estimated wait: ${queue.estimatedWaitTimeMinutes} mins.`,
        type: 'queue_update',
        metadata: {
          tokenNumber: queue.tokenNumber,
          status: 'waiting',
          newPosition: targetIndex + 1,
          estimatedWaitTimeMinutes: queue.estimatedWaitTimeMinutes
        }
      });
    }

    return {
      queueEntry: queue,
      newPosition: targetIndex + 1,
      patientsAhead,
      estimatedWaitTimeMinutes: queue.estimatedWaitTimeMinutes
    };
  }

  /**
   * Helper to recalculate live wait times for all active waiting patients in a department
   */
  static async recalculateDepartmentWaitTimes(departmentId) {
    try {
      const todayStart = dayjs().startOf('day').toDate();
      const waitingList = await Queue.find({
        departmentId,
        status: 'waiting',
        createdAt: { $gte: todayStart }
      }).sort({ priorityScore: -1, sequenceNumber: 1 });

      for (let i = 0; i < waitingList.length; i++) {
        const estWait = await this.calculateWaitTime(departmentId, i);
        if (waitingList[i].estimatedWaitTimeMinutes !== estWait) {
          waitingList[i].estimatedWaitTimeMinutes = estWait;
          await waitingList[i].save();
        }
      }
    } catch (err) {
      logger.error('Failed to recalculate department wait times', err);
    }
  }
}

export default QueueService;
