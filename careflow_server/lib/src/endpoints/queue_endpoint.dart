import 'dart:async';
import 'package:serverpod/serverpod.dart';
import '../generated/token.dart';

class QueueEndpoint extends Endpoint {
  static final List<Token> _activeTokens = [
    Token(
      id: 1,
      tokenNumber: 'GM-101',
      department: 'General Medicine',
      doctorName: 'Dr. Rajesh Sharma',
      roomNumber: 'Room 12',
      patientId: 'PT-10088',
      patientName: 'Rohan Verma',
      patientPhone: '9876543210',
      patientAge: 34,
      patientGender: 'Male',
      symptoms: 'Fever, sore throat for 3 days',
      status: 'IN_CONSULTATION',
      priority: 'NORMAL',
      estimatedWaitMinutes: 0,
      queuePosition: 0,
      calledAt: DateTime.now().subtract(const Duration(minutes: 5)),
      createdAt: DateTime.now().subtract(const Duration(minutes: 40)),
    ),
    Token(
      id: 2,
      tokenNumber: 'GM-102',
      department: 'General Medicine',
      doctorName: 'Dr. Rajesh Sharma',
      roomNumber: 'Room 12',
      patientId: 'PT-10089',
      patientName: 'Sunita Devi',
      patientPhone: '9811223344',
      patientAge: 62,
      patientGender: 'Female',
      symptoms: 'High blood pressure, severe dizziness',
      status: 'WAITING',
      priority: 'SENIOR',
      estimatedWaitMinutes: 5,
      queuePosition: 1,
      createdAt: DateTime.now().subtract(const Duration(minutes: 30)),
    ),
    Token(
      id: 3,
      tokenNumber: 'GM-103',
      department: 'General Medicine',
      doctorName: 'Dr. Rajesh Sharma',
      roomNumber: 'Room 12',
      patientId: 'PT-10090',
      patientName: 'Harpreet Singh',
      patientPhone: '9877665544',
      patientAge: 29,
      patientGender: 'Male',
      symptoms: 'Persistent cough, mild chest congestion',
      status: 'WAITING',
      priority: 'NORMAL',
      estimatedWaitMinutes: 12,
      queuePosition: 2,
      createdAt: DateTime.now().subtract(const Duration(minutes: 20)),
    ),
    Token(
      id: 4,
      tokenNumber: 'PD-201',
      department: 'Pediatrics',
      doctorName: 'Dr. Ananya Roy',
      roomNumber: 'Room 8',
      patientId: 'PT-10091',
      patientName: 'Aarav Patel (Child)',
      patientAge: 4,
      patientGender: 'Male',
      symptoms: 'Ear infection and high fever',
      status: 'WAITING',
      priority: 'NORMAL',
      estimatedWaitMinutes: 8,
      queuePosition: 1,
      createdAt: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    Token(
      id: 5,
      tokenNumber: 'OR-301',
      department: 'Orthopedics',
      doctorName: 'Dr. Vikram Sethi',
      roomNumber: 'Room 15',
      patientId: 'PT-10092',
      patientName: 'Gurdeep Kaur',
      patientAge: 55,
      patientGender: 'Female',
      symptoms: 'Severe knee pain and swelling',
      status: 'WAITING',
      priority: 'NORMAL',
      estimatedWaitMinutes: 15,
      queuePosition: 1,
      createdAt: DateTime.now().subtract(const Duration(minutes: 10)),
    ),
  ];

  static int _tokenCounter = 104;

  /// Returns active OPD tokens filtered by department or status
  Future<List<Token>> getTokens(
    Session session, {
    String? department,
    String? status,
  }) async {
    return _activeTokens.where((t) {
      if (department != null && department.isNotEmpty && t.department != department) {
        return false;
      }
      if (status != null && status.isNotEmpty && t.status != status) {
        return false;
      }
      return true;
    }).toList();
  }

  /// Create a new token in real time
  Future<Token> createToken(
    Session session, {
    required String department,
    required String patientName,
    required String patientId,
    String? patientPhone,
    int? patientAge,
    String? patientGender,
    String? symptoms,
    String? priority,
    String? doctorName,
    String? roomNumber,
  }) async {
    final prefix = department == 'Pediatrics'
        ? 'PD'
        : (department == 'Orthopedics'
            ? 'OR'
            : (department == 'Cardiology' ? 'CD' : 'GM'));
    
    final tokenNum = '$prefix-${_tokenCounter++}';
    final waitingInDept = _activeTokens
        .where((t) => t.department == department && t.status == 'WAITING')
        .length;

    final token = Token(
      id: DateTime.now().millisecondsSinceEpoch,
      tokenNumber: tokenNum,
      department: department,
      doctorName: doctorName ?? 'Dr. Rajesh Sharma',
      roomNumber: roomNumber ?? 'Room 12',
      patientId: patientId,
      patientName: patientName,
      patientPhone: patientPhone,
      patientAge: patientAge,
      patientGender: patientGender,
      symptoms: symptoms,
      status: 'WAITING',
      priority: priority ?? 'NORMAL',
      estimatedWaitMinutes: (waitingInDept + 1) * 7,
      queuePosition: waitingInDept + 1,
      createdAt: DateTime.now(),
    );

    _activeTokens.add(token);
    session.log('Created Serverpod Token: ${token.tokenNumber} for $patientName in $department');

    // Broadcast update across Serverpod real-time stream channel
    session.messages.postMessage(
      'careflow_queue_stream',
      token,
    );

    return token;
  }

  /// Call next patient in department
  Future<Token?> callNext(
    Session session, {
    required String department,
    required String doctorName,
  }) async {
    // 1. Mark existing IN_CONSULTATION tokens as COMPLETED
    for (var t in _activeTokens) {
      if (t.department == department && t.status == 'IN_CONSULTATION') {
        t.status = 'COMPLETED';
        t.completedAt = DateTime.now();
      }
    }

    // 2. Find next WAITING token (prioritizing EMERGENCY > SENIOR > NORMAL)
    final waitingTokens = _activeTokens
        .where((t) => t.department == department && t.status == 'WAITING')
        .toList();

    if (waitingTokens.isEmpty) return null;

    waitingTokens.sort((a, b) {
      if (a.priority == 'EMERGENCY') return -1;
      if (b.priority == 'EMERGENCY') return 1;
      if (a.priority == 'SENIOR') return -1;
      if (b.priority == 'SENIOR') return 1;
      return a.createdAt.compareTo(b.createdAt);
    });

    final nextToken = waitingTokens.first;
    nextToken.status = 'IN_CONSULTATION';
    nextToken.calledAt = DateTime.now();
    nextToken.doctorName = doctorName;
    nextToken.queuePosition = 0;
    nextToken.estimatedWaitMinutes = 0;

    // Recalculate positions for remaining waiting patients
    int pos = 1;
    for (var t in _activeTokens.where((t) => t.department == department && t.status == 'WAITING')) {
      t.queuePosition = pos++;
      t.estimatedWaitMinutes = (pos - 1) * 7;
    }

    session.messages.postMessage(
      'careflow_queue_stream',
      nextToken,
    );

    return nextToken;
  }

  /// Complete patient consultation
  Future<bool> completeConsultation(
    Session session,
    String tokenNumber,
  ) async {
    final idx = _activeTokens.indexWhere((t) => t.tokenNumber == tokenNumber);
    if (idx != -1) {
      _activeTokens[idx].status = 'COMPLETED';
      _activeTokens[idx].completedAt = DateTime.now();
      session.messages.postMessage('careflow_queue_stream', _activeTokens[idx]);
      return true;
    }
    return false;
  }

  /// Skip token
  Future<bool> skipToken(
    Session session,
    String tokenNumber,
  ) async {
    final idx = _activeTokens.indexWhere((t) => t.tokenNumber == tokenNumber);
    if (idx != -1) {
      _activeTokens[idx].status = 'SKIPPED';
      session.messages.postMessage('careflow_queue_stream', _activeTokens[idx]);
      return true;
    }
    return false;
  }

  /// Real-time Serverpod streaming endpoint for live queues
  Stream<Token> streamQueueUpdates(Session session) async* {
    final messages = session.messages.createStream<Token>('careflow_queue_stream');
    await for (final message in messages) {
      yield message;
    }
  }
}
