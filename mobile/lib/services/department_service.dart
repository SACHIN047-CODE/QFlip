import '../core/constants/api_endpoints.dart';
import '../core/network/api_client.dart';
import '../models/department_model.dart';
import '../models/doctor_model.dart';

class DepartmentService {
  static Future<List<DepartmentModel>> getDepartments() async {
    try {
      final response = await ApiClient.get(ApiEndpoints.departments);
      if (response is List) {
        return response.map((e) => DepartmentModel.fromJson(e)).toList();
      }
    } catch (_) {}

    // Fallback standard clinical departments
    return [
      DepartmentModel(
        id: 'dept-gen',
        name: 'General Medicine',
        code: 'GEN',
        description: 'Primary consultation, fever, infection, chronic ailments',
        floor: 'Ground Floor',
        roomNumbers: ['Room 101', 'Room 102', 'Room 103'],
      ),
      DepartmentModel(
        id: 'dept-cardio',
        name: 'Cardiology',
        code: 'CARD',
        description: 'Heart care, hypertension, chest discomfort, ECG',
        floor: 'Floor 1',
        roomNumbers: ['Room 201', 'Room 202'],
      ),
      DepartmentModel(
        id: 'dept-ortho',
        name: 'Orthopedics',
        code: 'ORTHO',
        description: 'Bone fractures, joints, knee pain, arthritis',
        floor: 'Ground Floor',
        roomNumbers: ['Room 108', 'Room 109'],
      ),
      DepartmentModel(
        id: 'dept-peds',
        name: 'Pediatrics',
        code: 'PED',
        description: 'Child wellness, vaccinations, pediatric acute care',
        floor: 'Floor 2',
        roomNumbers: ['Room 301', 'Room 302'],
      ),
    ];
  }
}

class DoctorService {
  static Future<List<DoctorModel>> getDoctors() async {
    try {
      final response = await ApiClient.get(ApiEndpoints.doctors);
      if (response is List) {
        return response.map((e) => DoctorModel.fromJson(e)).toList();
      }
    } catch (_) {}

    // Fallback standard doctors directory
    return [
      DoctorModel(
        id: 'doc-1',
        name: 'Dr. Rahul Verma',
        email: 'rahul@example.com',
        specialization: 'General Medicine',
        qualification: 'MBBS, MD (Medicine)',
        room: 'OPD Room 101',
        floor: 'Ground Floor',
      ),
      DoctorModel(
        id: 'doc-2',
        name: 'Dr. Priya Singh',
        email: 'priya@example.com',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD, DM (Cardio)',
        room: 'Room 201',
        floor: 'Floor 1',
      ),
      DoctorModel(
        id: 'doc-3',
        name: 'Dr. Karan Malhotra',
        email: 'karan@example.com',
        specialization: 'Orthopedics',
        qualification: 'MBBS, MS (Ortho)',
        room: 'Room 108',
        floor: 'Ground Floor',
      ),
      DoctorModel(
        id: 'doc-4',
        name: 'Dr. Simran Kaur',
        email: 'simran@example.com',
        specialization: 'Pediatrics',
        qualification: 'MBBS, MD (Pediatrics)',
        room: 'Room 301',
        floor: 'Floor 2',
      ),
    ];
  }
}
