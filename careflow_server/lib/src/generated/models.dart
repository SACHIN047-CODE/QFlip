import 'package:serverpod/serverpod.dart';

class User extends TableRow {
  @override
  String get tableName => 'careflow_users';

  User({
    int? id,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
    this.abhaId,
    this.department,
    this.roomNumber,
    required this.isActive,
    required this.createdAt,
  }) : super(id);

  String name;
  String email;
  String role;
  String? phone;
  String? abhaId;
  String? department;
  String? roomNumber;
  bool isActive;
  DateTime createdAt;

  factory User.fromJson(Map<String, dynamic> jsonSerialization, [SerializationManager? serializationManager]) {
    return User(
      id: jsonSerialization['id'],
      name: jsonSerialization['name'] ?? '',
      email: jsonSerialization['email'] ?? '',
      role: jsonSerialization['role'] ?? 'patient',
      phone: jsonSerialization['phone'],
      abhaId: jsonSerialization['abhaId'],
      department: jsonSerialization['department'],
      roomNumber: jsonSerialization['roomNumber'],
      isActive: jsonSerialization['isActive'] ?? true,
      createdAt: jsonSerialization['createdAt'] != null ? DateTime.parse(jsonSerialization['createdAt']) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'role': role,
      'phone': phone,
      'abhaId': abhaId,
      'department': department,
      'roomNumber': roomNumber,
      'isActive': isActive,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class Department extends TableRow {
  @override
  String get tableName => 'careflow_departments';

  Department({
    int? id,
    required this.name,
    required this.code,
    required this.description,
    required this.activeTokensCount,
    required this.averageWaitTimeMinutes,
    required this.rooms,
  }) : super(id);

  String name;
  String code;
  String description;
  int activeTokensCount;
  int averageWaitTimeMinutes;
  List<String> rooms;

  factory Department.fromJson(Map<String, dynamic> jsonSerialization, [SerializationManager? serializationManager]) {
    return Department(
      id: jsonSerialization['id'],
      name: jsonSerialization['name'] ?? '',
      code: jsonSerialization['code'] ?? '',
      description: jsonSerialization['description'] ?? '',
      activeTokensCount: jsonSerialization['activeTokensCount'] ?? 0,
      averageWaitTimeMinutes: jsonSerialization['averageWaitTimeMinutes'] ?? 15,
      rooms: (jsonSerialization['rooms'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'code': code,
      'description': description,
      'activeTokensCount': activeTokensCount,
      'averageWaitTimeMinutes': averageWaitTimeMinutes,
      'rooms': rooms,
    };
  }
}

class Doctor extends TableRow {
  @override
  String get tableName => 'careflow_doctors';

  Doctor({
    int? id,
    required this.name,
    required this.email,
    required this.department,
    required this.roomNumber,
    required this.shift,
    required this.isAvailable,
    required this.activePatientsCount,
    this.phone,
    this.qualification,
  }) : super(id);

  String name;
  String email;
  String department;
  String roomNumber;
  String shift;
  bool isAvailable;
  int activePatientsCount;
  String? phone;
  String? qualification;

  factory Doctor.fromJson(Map<String, dynamic> jsonSerialization, [SerializationManager? serializationManager]) {
    return Doctor(
      id: jsonSerialization['id'],
      name: jsonSerialization['name'] ?? '',
      email: jsonSerialization['email'] ?? '',
      department: jsonSerialization['department'] ?? '',
      roomNumber: jsonSerialization['roomNumber'] ?? '',
      shift: jsonSerialization['shift'] ?? 'Morning (09:00 - 14:00)',
      isAvailable: jsonSerialization['isAvailable'] ?? true,
      activePatientsCount: jsonSerialization['activePatientsCount'] ?? 0,
      phone: jsonSerialization['phone'],
      qualification: jsonSerialization['qualification'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'department': department,
      'roomNumber': roomNumber,
      'shift': shift,
      'isAvailable': isAvailable,
      'activePatientsCount': activePatientsCount,
      'phone': phone,
      'qualification': qualification,
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

  factory TriageResult.fromJson(Map<String, dynamic> jsonSerialization, [SerializationManager? serializationManager]) {
    return TriageResult(
      department: jsonSerialization['department'] ?? 'General Medicine',
      urgency: jsonSerialization['urgency'] ?? 'NORMAL',
      recommendedDoctor: jsonSerialization['recommendedDoctor'] ?? 'Dr. Rajesh Sharma',
      reason: jsonSerialization['reason'] ?? '',
      confidence: (jsonSerialization['confidence'] as num?)?.toDouble() ?? 0.85,
      suggestedRoom: jsonSerialization['suggestedRoom'] ?? 'Room 12',
      estimatedWaitMinutes: jsonSerialization['estimatedWaitMinutes'] ?? 15,
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
