class TokenModel {
  final String id;
  final String tokenNumber;
  final String patientName;
  final String phone;
  final int age;
  final String gender;
  final String? abhaId;
  final String department;
  final String? assignedDoctorName;
  final String? roomNumber;
  final List<String> symptoms;
  final String priority; // 'Normal' | 'Senior' | 'Emergency' | 'Pediatric'
  final String status; // 'WAITING' | 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'SKIPPED' | 'CANCELLED'
  final int estimatedWaitMinutes;
  final int? sequenceNumber;
  final String? registeredAt;

  TokenModel({
    required this.id,
    required this.tokenNumber,
    required this.patientName,
    required this.phone,
    required this.age,
    required this.gender,
    this.abhaId,
    required this.department,
    this.assignedDoctorName,
    this.roomNumber,
    required this.symptoms,
    this.priority = 'Normal',
    this.status = 'WAITING',
    this.estimatedWaitMinutes = 15,
    this.sequenceNumber,
    this.registeredAt,
  });

  factory TokenModel.fromJson(Map<String, dynamic> json) {
    List<String> parsedSymptoms = [];
    if (json['symptoms'] is List) {
      parsedSymptoms = (json['symptoms'] as List).map((e) => e.toString()).toList();
    } else if (json['symptoms'] is String && json['symptoms'].isNotEmpty) {
      parsedSymptoms = [json['symptoms'].toString()];
    }

    return TokenModel(
      id: json['_id'] ?? json['id'] ?? '',
      tokenNumber: json['tokenNumber'] ?? '',
      patientName: json['patientName'] ?? (json['patient'] is Map ? json['patient']['name'] : 'Walk-in Patient'),
      phone: json['phone'] ?? (json['patient'] is Map ? json['patient']['phone'] : ''),
      age: json['age'] is int ? json['age'] : (int.tryParse(json['age']?.toString() ?? '35') ?? 35),
      gender: json['gender'] ?? 'Male',
      abhaId: json['abhaId'],
      department: json['department'] is Map ? (json['department']['name'] ?? '') : (json['department'] ?? 'General Medicine'),
      assignedDoctorName: json['assignedDoctorName'] ?? (json['doctor'] is Map ? json['doctor']['name'] : null),
      roomNumber: json['roomNumber'] ?? (json['doctor'] is Map ? json['doctor']['room'] : 'OPD Room 101'),
      symptoms: parsedSymptoms,
      priority: json['priority'] ?? 'Normal',
      status: (json['status'] ?? 'WAITING').toString().toUpperCase(),
      estimatedWaitMinutes: json['estimatedWaitMinutes'] is int
          ? json['estimatedWaitMinutes']
          : (int.tryParse(json['estimatedWaitMinutes']?.toString() ?? '15') ?? 15),
      sequenceNumber: json['sequenceNumber'],
      registeredAt: json['registeredAt'] ?? json['createdAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tokenNumber': tokenNumber,
      'patientName': patientName,
      'phone': phone,
      'age': age,
      'gender': gender,
      'abhaId': abhaId,
      'department': department,
      'assignedDoctorName': assignedDoctorName,
      'roomNumber': roomNumber,
      'symptoms': symptoms,
      'priority': priority,
      'status': status,
      'estimatedWaitMinutes': estimatedWaitMinutes,
    };
  }
}
