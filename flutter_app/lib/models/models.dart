import 'dart:convert';

enum UserRole { patient, doctor, staff, admin, lab, pharmacy }

enum TokenStatus {
  waiting,
  called,
  inConsultation,
  completed,
  skipped,
  labPending,
  pharmacyPending
}

enum PriorityLevel { normal, senior, emergency, pediatric }

class User {
  final String id;
  final String name;
  final String email;
  final UserRole role;
  final String? phone;
  final String? abhaId;
  final String? department;
  final String? roomNumber;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
    this.abhaId,
    this.department,
    this.roomNumber,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? json['_id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: _parseRole(json['role'] ?? 'patient'),
      phone: json['phone'],
      abhaId: json['abhaId'],
      department: json['department'],
      roomNumber: json['roomNumber'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'email': email,
    'role': role.name,
    'phone': phone,
    'abhaId': abhaId,
    'department': department,
    'roomNumber': roomNumber,
  };

  static UserRole _parseRole(String roleStr) {
    switch (roleStr.toLowerCase()) {
      case 'doctor':
        return UserRole.doctor;
      case 'staff':
        return UserRole.staff;
      case 'admin':
        return UserRole.admin;
      case 'lab':
        return UserRole.lab;
      case 'pharmacy':
        return UserRole.pharmacy;
      default:
        return UserRole.patient;
    }
  }
}

class PatientVitals {
  final String? bp;
  final int? pulse;
  final int? spo2;
  final double? temp;
  final double? weight;

  PatientVitals({this.bp, this.pulse, this.spo2, this.temp, this.weight});

  factory PatientVitals.fromJson(Map<String, dynamic> json) {
    return PatientVitals(
      bp: json['bp'],
      pulse: json['pulse'] != null ? (json['pulse'] as num).toInt() : null,
      spo2: json['spo2'] != null ? (json['spo2'] as num).toInt() : null,
      temp: json['temp'] != null ? (json['temp'] as num).toDouble() : null,
      weight: json['weight'] != null ? (json['weight'] as num).toDouble() : null,
    );
  }

  Map<String, dynamic> toJson() => {
    'bp': bp,
    'pulse': pulse,
    'spo2': spo2,
    'temp': temp,
    'weight': weight,
  };
}

class PatientToken {
  final String id;
  final String tokenNumber;
  final String patientId;
  final String patientName;
  final int age;
  final String gender;
  final String phone;
  final String? abhaId;
  final String department;
  final String? assignedDoctorId;
  final String? assignedDoctorName;
  final String? roomNumber;
  final List<String> symptoms;
  final String? symptomSummary;
  final PriorityLevel priority;
  final TokenStatus status;
  final String registeredAt;
  final int estimatedWaitMinutes;
  final PatientVitals? vitals;

  PatientToken({
    required this.id,
    required this.tokenNumber,
    required this.patientId,
    required this.patientName,
    required this.age,
    required this.gender,
    required this.phone,
    this.abhaId,
    required this.department,
    this.assignedDoctorId,
    this.assignedDoctorName,
    this.roomNumber,
    required this.symptoms,
    this.symptomSummary,
    required this.priority,
    required this.status,
    required this.registeredAt,
    required this.estimatedWaitMinutes,
    this.vitals,
  });

  factory PatientToken.fromJson(Map<String, dynamic> json) {
    return PatientToken(
      id: json['id'] ?? json['_id'] ?? '',
      tokenNumber: json['tokenNumber'] ?? '',
      patientId: json['patientId'] ?? '',
      patientName: json['patientName'] ?? '',
      age: json['age'] is int ? json['age'] : int.tryParse('${json['age']}') ?? 30,
      gender: json['gender'] ?? 'Male',
      phone: json['phone'] ?? '',
      abhaId: json['abhaId'],
      department: json['department'] ?? 'General Medicine',
      assignedDoctorId: json['assignedDoctorId'],
      assignedDoctorName: json['assignedDoctorName'],
      roomNumber: json['roomNumber'],
      symptoms: (json['symptoms'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      symptomSummary: json['symptomSummary'],
      priority: _parsePriority(json['priority'] ?? 'Normal'),
      status: _parseStatus(json['status'] ?? 'WAITING'),
      registeredAt: json['registeredAt'] ?? DateTime.now().toIso8601String(),
      estimatedWaitMinutes: json['estimatedWaitMinutes'] is int
          ? json['estimatedWaitMinutes']
          : int.tryParse('${json['estimatedWaitMinutes']}') ?? 15,
      vitals: json['vitals'] != null ? PatientVitals.fromJson(json['vitals']) : null,
    );
  }

  static PriorityLevel _parsePriority(String prio) {
    switch (prio.toLowerCase()) {
      case 'emergency':
        return PriorityLevel.emergency;
      case 'senior':
        return PriorityLevel.senior;
      case 'pediatric':
        return PriorityLevel.pediatric;
      default:
        return PriorityLevel.normal;
    }
  }

  static TokenStatus _parseStatus(String stat) {
    switch (stat.toUpperCase()) {
      case 'CALLED':
        return TokenStatus.called;
      case 'IN_CONSULTATION':
        return TokenStatus.inConsultation;
      case 'COMPLETED':
        return TokenStatus.completed;
      case 'SKIPPED':
        return TokenStatus.skipped;
      case 'LAB_PENDING':
        return TokenStatus.labPending;
      case 'PHARMACY_PENDING':
        return TokenStatus.pharmacyPending;
      default:
        return TokenStatus.waiting;
    }
  }

  String get statusDisplay {
    switch (status) {
      case TokenStatus.waiting:
        return 'Waiting in Queue';
      case TokenStatus.called:
        return 'Token Called';
      case TokenStatus.inConsultation:
        return 'In Consultation';
      case TokenStatus.completed:
        return 'Consultation Finished';
      case TokenStatus.skipped:
        return 'Skipped';
      case TokenStatus.labPending:
        return 'Lab Pending';
      case TokenStatus.pharmacyPending:
        return 'Pharmacy Ready';
    }
  }
}

class PrescriptionMedicine {
  final String id;
  final String name;
  final String dosage;
  final String frequency;
  final String duration;
  final String instructions;

  PrescriptionMedicine({
    required this.id,
    required this.name,
    required this.dosage,
    required this.frequency,
    required this.duration,
    required this.instructions,
  });

  factory PrescriptionMedicine.fromJson(Map<String, dynamic> json) {
    return PrescriptionMedicine(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      dosage: json['dosage'] ?? '',
      frequency: json['frequency'] ?? 'Once daily',
      duration: json['duration'] ?? '5 days',
      instructions: json['instructions'] ?? 'After Food',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'dosage': dosage,
    'frequency': frequency,
    'duration': duration,
    'instructions': instructions,
  };
}

class ConsultationNote {
  final String id;
  final String patientId;
  final String patientName;
  final String doctorId;
  final String doctorName;
  final String department;
  final String date;
  final String chiefComplaints;
  final String clinicalFindings;
  final String diagnosis;
  final List<PrescriptionMedicine> prescriptions;
  final List<String> labTestsOrdered;

  ConsultationNote({
    required this.id,
    required this.patientId,
    required this.patientName,
    required this.doctorId,
    required this.doctorName,
    required this.department,
    required this.date,
    required this.chiefComplaints,
    required this.clinicalFindings,
    required this.diagnosis,
    required this.prescriptions,
    required this.labTestsOrdered,
  });

  factory ConsultationNote.fromJson(Map<String, dynamic> json) {
    return ConsultationNote(
      id: json['id'] ?? json['_id'] ?? '',
      patientId: json['patientId'] ?? '',
      patientName: json['patientName'] ?? '',
      doctorId: json['doctorId'] ?? '',
      doctorName: json['doctorName'] ?? '',
      department: json['department'] ?? '',
      date: json['date'] ?? '',
      chiefComplaints: json['chiefComplaints'] ?? '',
      clinicalFindings: json['clinicalFindings'] ?? '',
      diagnosis: json['diagnosis'] ?? '',
      prescriptions: (json['prescriptions'] as List<dynamic>?)
              ?.map((e) => PrescriptionMedicine.fromJson(e))
              .toList() ??
          [],
      labTestsOrdered: (json['labTestsOrdered'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
    );
  }
}

class HospitalDepartment {
  final String id;
  final String name;
  final String code;
  final String headDoctor;
  final int activeDoctorsCount;
  final int waitingCount;
  final int avgWaitTimeMinutes;

  HospitalDepartment({
    required this.id,
    required this.name,
    required this.code,
    required this.headDoctor,
    required this.activeDoctorsCount,
    required this.waitingCount,
    required this.avgWaitTimeMinutes,
  });

  factory HospitalDepartment.fromJson(Map<String, dynamic> json) {
    return HospitalDepartment(
      id: json['id'] ?? json['_id'] ?? '',
      name: json['name'] ?? '',
      code: json['code'] ?? '',
      headDoctor: json['headDoctor'] ?? '',
      activeDoctorsCount: json['activeDoctorsCount'] ?? 1,
      waitingCount: json['waitingCount'] ?? 0,
      avgWaitTimeMinutes: json['avgWaitTimeMinutes'] ?? 15,
    );
  }
}

class AppNotification {
  final String id;
  final String title;
  final String message;
  final String timestamp;
  final bool read;
  final String? actionUrl;

  AppNotification({
    required this.id,
    required this.title,
    required this.message,
    required this.timestamp,
    required this.read,
    this.actionUrl,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      message: json['message'] ?? '',
      timestamp: json['timestamp'] ?? '',
      read: json['read'] ?? false,
      actionUrl: json['actionUrl'],
    );
  }
}

