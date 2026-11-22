import 'package:serverpod/serverpod.dart';

class Token extends TableRow {
  @override
  String get tableName => 'careflow_tokens';

  Token({
    int? id,
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
  }) : super(id);

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

  factory Token.fromJson(Map<String, dynamic> jsonSerialization, [SerializationManager? serializationManager]) {
    return Token(
      id: jsonSerialization['id'],
      tokenNumber: jsonSerialization['tokenNumber'] ?? '',
      department: jsonSerialization['department'] ?? '',
      doctorName: jsonSerialization['doctorName'] ?? '',
      roomNumber: jsonSerialization['roomNumber'],
      patientId: jsonSerialization['patientId'] ?? '',
      patientName: jsonSerialization['patientName'] ?? '',
      patientPhone: jsonSerialization['patientPhone'],
      patientAge: jsonSerialization['patientAge'],
      patientGender: jsonSerialization['patientGender'],
      symptoms: jsonSerialization['symptoms'],
      status: jsonSerialization['status'] ?? 'WAITING',
      priority: jsonSerialization['priority'] ?? 'NORMAL',
      estimatedWaitMinutes: jsonSerialization['estimatedWaitMinutes'] ?? 15,
      queuePosition: jsonSerialization['queuePosition'] ?? 1,
      calledAt: jsonSerialization['calledAt'] != null ? DateTime.tryParse(jsonSerialization['calledAt']) : null,
      completedAt: jsonSerialization['completedAt'] != null ? DateTime.tryParse(jsonSerialization['completedAt']) : null,
      createdAt: jsonSerialization['createdAt'] != null ? DateTime.parse(jsonSerialization['createdAt']) : DateTime.now(),
    );
  }

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

  Token copyWith({
    int? id,
    String? tokenNumber,
    String? department,
    String? doctorName,
    String? roomNumber,
    String? patientId,
    String? patientName,
    String? patientPhone,
    int? patientAge,
    String? patientGender,
    String? symptoms,
    String? status,
    String? priority,
    int? estimatedWaitMinutes,
    int? queuePosition,
    DateTime? calledAt,
    DateTime? completedAt,
    DateTime? createdAt,
  }) {
    return Token(
      id: id ?? this.id,
      tokenNumber: tokenNumber ?? this.tokenNumber,
      department: department ?? this.department,
      doctorName: doctorName ?? this.doctorName,
      roomNumber: roomNumber ?? this.roomNumber,
      patientId: patientId ?? this.patientId,
      patientName: patientName ?? this.patientName,
      patientPhone: patientPhone ?? this.patientPhone,
      patientAge: patientAge ?? this.patientAge,
      patientGender: patientGender ?? this.patientGender,
      symptoms: symptoms ?? this.symptoms,
      status: status ?? this.status,
      priority: priority ?? this.priority,
      estimatedWaitMinutes: estimatedWaitMinutes ?? this.estimatedWaitMinutes,
      queuePosition: queuePosition ?? this.queuePosition,
      calledAt: calledAt ?? this.calledAt,
      completedAt: completedAt ?? this.completedAt,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
