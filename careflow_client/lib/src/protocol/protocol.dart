import 'package:serverpod_client/serverpod_client.dart';

class Token extends SerializableEntity {
  Token({
    this.id,
    required this.tokenNumber,
    required this.department,
    required this.doctorName,
    this.roomNumber,
    required this.patientId,
    required this.patientName,
    this.patientPhone,
    this.patientAge,
    this.patientGender,
    this.symptoms,
    required this.status,
    required this.priority,
    required this.estimatedWaitMinutes,
    required this.queuePosition,
    this.calledAt,
    this.completedAt,
    required this.createdAt,
  });

  int? id;
  String tokenNumber;
  String department;
  String doctorName;
  String? roomNumber;
  String patientId;
  String patientName;
  String? patientPhone;
  int? patientAge;
  String? patientGender;
  String? symptoms;
  String status;
  String priority;
  int estimatedWaitMinutes;
  int queuePosition;
  DateTime? calledAt;
  DateTime? completedAt;
  DateTime createdAt;

  factory Token.fromJson(Map<String, dynamic> json, [SerializationManager? sm]) {
    return Token(
      id: json['id'],
      tokenNumber: json['tokenNumber'] ?? '',
      department: json['department'] ?? '',
      doctorName: json['doctorName'] ?? '',
      roomNumber: json['roomNumber'],
      patientId: json['patientId'] ?? '',
      patientName: json['patientName'] ?? '',
      patientPhone: json['patientPhone'],
      patientAge: json['patientAge'],
      patientGender: json['patientGender'],
      symptoms: json['symptoms'],
      status: json['status'] ?? 'WAITING',
      priority: json['priority'] ?? 'NORMAL',
      estimatedWaitMinutes: json['estimatedWaitMinutes'] ?? 15,
      queuePosition: json['queuePosition'] ?? 1,
      calledAt: json['calledAt'] != null ? DateTime.tryParse(json['calledAt']) : null,
      completedAt: json['completedAt'] != null ? DateTime.tryParse(json['completedAt']) : null,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tokenNumber': tokenNumber,
      'department': department,
      'doctorName': doctorName,
      'roomNumber': roomNumber,
      'patientId': patientId,
      'patientName': patientName,
      'patientPhone': patientPhone,
      'patientAge': patientAge,
      'patientGender': patientGender,
      'symptoms': symptoms,
      'status': status,
      'priority': priority,
      'estimatedWaitMinutes': estimatedWaitMinutes,
      'queuePosition': queuePosition,
      'calledAt': calledAt?.toIso8601String(),
      'completedAt': completedAt?.toIso8601String(),
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class TriageResult extends SerializableEntity {
  TriageResult({
    required this.department,
    required this.urgency,
    required this.recommendedDoctor,
    required this.reason,
    required this.confidence,
    required this.suggestedRoom,
    required this.estimatedWaitMinutes,
  });

  String department;
  String urgency;
  String recommendedDoctor;
  String reason;
  double confidence;
  String suggestedRoom;
  int estimatedWaitMinutes;

  factory TriageResult.fromJson(Map<String, dynamic> json, [SerializationManager? sm]) {
    return TriageResult(
      department: json['department'] ?? 'General Medicine',
      urgency: json['urgency'] ?? 'NORMAL',
      recommendedDoctor: json['recommendedDoctor'] ?? '',
      reason: json['reason'] ?? '',
      confidence: (json['confidence'] as num?)?.toDouble() ?? 0.85,
      suggestedRoom: json['suggestedRoom'] ?? 'Room 12',
      estimatedWaitMinutes: json['estimatedWaitMinutes'] ?? 15,
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'department': department,
      'urgency': urgency,
      'recommendedDoctor': recommendedDoctor,
      'reason': reason,
      'confidence': confidence,
      'suggestedRoom': suggestedRoom,
      'estimatedWaitMinutes': estimatedWaitMinutes,
    };
  }
}

class Protocol extends SerializationManager {
  static final Protocol instance = Protocol();

  @override
  Map<String, constructor> get constructors => {
        'Token': (Map<String, dynamic> json) => Token.fromJson(json, this),
        'TriageResult': (Map<String, dynamic> json) => TriageResult.fromJson(json, this),
      };
}
