import 'package:serverpod/serverpod.dart';
import '../generated/models.dart';

class DepartmentEndpoint extends Endpoint {
  static final List<Department> _departments = [
    Department(
      id: 1,
      name: 'General Medicine',
      code: 'GEN',
      description: 'Outpatient diagnosis, acute illnesses, diabetes, hypertension, and primary clinical triage.',
      activeTokensCount: 14,
      averageWaitTimeMinutes: 14,
      rooms: ['Room 11', 'Room 12', 'Room 13'],
    ),
    Department(
      id: 2,
      name: 'Pediatrics',
      code: 'PED',
      description: 'Infant, child, and adolescent specialized clinical consultations and immunization.',
      activeTokensCount: 8,
      averageWaitTimeMinutes: 10,
      rooms: ['Room 8', 'Room 9'],
    ),
    Department(
      id: 3,
      name: 'Orthopedics',
      code: 'ORT',
      description: 'Musculoskeletal injuries, fracture plaster clinic, joints, spine, and arthritis.',
      activeTokensCount: 12,
      averageWaitTimeMinutes: 20,
      rooms: ['Room 15', 'Room 16'],
    ),
    Department(
      id: 4,
      name: 'Cardiology',
      code: 'CRD',
      description: 'Cardiac evaluations, ECG triage, chronic heart conditions, and vascular consults.',
      activeTokensCount: 6,
      averageWaitTimeMinutes: 18,
      rooms: ['Room 4', 'Room 5'],
    ),
    Department(
      id: 5,
      name: 'ENT & Head Neck',
      code: 'ENT',
      description: 'Ear, nose, throat diagnostics, audiology, endoscopic screenings.',
      activeTokensCount: 5,
      averageWaitTimeMinutes: 12,
      rooms: ['Room 21'],
    ),
  ];

  Future<List<Department>> getDepartments(Session session) async {
    return _departments;
  }
}

class DoctorEndpoint extends Endpoint {
  static final List<Doctor> _doctors = [
    Doctor(
      id: 1,
      name: 'Dr. Rajesh Sharma',
      email: 'dr.rajesh@careflow.health',
      department: 'General Medicine',
      roomNumber: 'Room 12',
      shift: 'Morning (09:00 - 14:00)',
      isAvailable: true,
      activePatientsCount: 6,
      phone: '9812345678',
      qualification: 'MBBS, MD (Internal Medicine)',
    ),
    Doctor(
      id: 2,
      name: 'Dr. Ananya Roy',
      email: 'dr.ananya@careflow.health',
      department: 'Pediatrics',
      roomNumber: 'Room 8',
      shift: 'Morning (09:00 - 14:00)',
      isAvailable: true,
      activePatientsCount: 4,
      phone: '9822334455',
      qualification: 'MBBS, DCH, MD (Pediatrics)',
    ),
    Doctor(
      id: 3,
      name: 'Dr. Vikram Sethi',
      email: 'dr.vikram@careflow.health',
      department: 'Orthopedics',
      roomNumber: 'Room 15',
      shift: 'Morning (09:00 - 14:00)',
      isAvailable: true,
      activePatientsCount: 5,
      phone: '9833445566',
      qualification: 'MS (Orthopedics), DNB Ortho',
    ),
    Doctor(
      id: 4,
      name: 'Dr. Sunita Rao',
      email: 'dr.sunita@careflow.health',
      department: 'Cardiology',
      roomNumber: 'Room 4',
      shift: 'Morning (09:00 - 14:00)',
      isAvailable: true,
      activePatientsCount: 3,
      phone: '9844556677',
      qualification: 'DM (Cardiology), MD Medicine',
    ),
  ];

  Future<List<Doctor>> getDoctors(Session session, {String? department}) async {
    if (department != null && department.isNotEmpty) {
      return _doctors.where((d) => d.department == department).toList();
    }
    return _doctors;
  }

  Future<bool> updateAvailability(
    Session session,
    int doctorId,
    bool isAvailable,
  ) async {
    final idx = _doctors.indexWhere((d) => d.id == doctorId);
    if (idx != -1) {
      _doctors[idx].isAvailable = isAvailable;
      return true;
    }
    return false;
  }
}
