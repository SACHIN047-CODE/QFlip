import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/models.dart';

class ApiService {
  // Configurable base URL: 10.0.2.2 for Android emulator, localhost for Web/Desktop/iOS
  static const String baseUrl = 'http://localhost:8000/api';

  static String? _authToken;

  static Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _authToken = prefs.getString('auth_token');
  }

  static Future<void> setAuthToken(String token) async {
    _authToken = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', token);
  }

  static Future<void> clearAuthToken() async {
    _authToken = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }

  static Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_authToken != null) 'Authorization': 'Bearer $_authToken',
      };

  // 1. Auth APIs
  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: _headers,
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['data']?['token'] != null) {
          await setAuthToken(data['data']['token']);
        }
        return data;
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Login failed');
      }
    } catch (e) {
      // Offline / Demo fallback mock
      return _mockLogin(email);
    }
  }

  static Future<Map<String, dynamic>> register(Map<String, dynamic> userData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: _headers,
        body: jsonEncode(userData),
      );
      return jsonDecode(response.body);
    } catch (e) {
      return {'success': true, 'message': 'Registered successfully (Demo mode)'};
    }
  }

  static Future<User?> getCurrentUser() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/auth/me'),
        headers: _headers,
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return User.fromJson(data['data']['user']);
      }
    } catch (_) {}
    return null;
  }

  // 2. Queue & Token APIs
  static Future<List<PatientToken>> getDepartmentQueue(String departmentId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/queues/department/$departmentId'),
        headers: _headers,
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final list = data['data'] as List<dynamic>;
        return list.map((e) => PatientToken.fromJson(e)).toList();
      }
    } catch (_) {}
    return _mockDepartmentQueue();
  }

  static Future<PatientToken?> generateToken({
    required String patientId,
    required String departmentId,
    required String triageLevel,
    required String symptoms,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/queues/token'),
        headers: _headers,
        body: jsonEncode({
          'patientId': patientId,
          'departmentId': departmentId,
          'triageLevel': triageLevel,
          'symptoms': symptoms,
        }),
      );
      if (response.statusCode == 201 || response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return PatientToken.fromJson(data['data']);
      }
    } catch (_) {}
    return null;
  }

  static Future<bool> updateQueueStatus(String queueId, String status) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/queues/$queueId/status'),
        headers: _headers,
        body: jsonEncode({'status': status}),
      );
      return response.statusCode == 200;
    } catch (_) {
      return true; // Optimistic update
    }
  }

  // 3. Departments
  static Future<List<HospitalDepartment>> getDepartments() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/departments'),
        headers: _headers,
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final list = data['data'] as List<dynamic>;
        return list.map((e) => HospitalDepartment.fromJson(e)).toList();
      }
    } catch (_) {}
    return _mockDepartments();
  }

  // Fallback Mock Handlers for offline hackathon preview
  static Map<String, dynamic> _mockLogin(String email) {
    UserRole role = UserRole.patient;
    String name = 'Demo Patient';
    if (email.contains('doctor')) {
      role = UserRole.doctor;
      name = 'Dr. Rajesh Sharma (MD)';
    } else if (email.contains('staff') || email.contains('counter')) {
      role = UserRole.staff;
      name = 'Pooja Verma (Registration)';
    } else if (email.contains('lab')) {
      role = UserRole.lab;
      name = 'Vikram Malhotra (Pathologist)';
    } else if (email.contains('pharmacy')) {
      role = UserRole.pharmacy;
      name = 'Sunil Gupta (Chief Chemist)';
    } else if (email.contains('admin')) {
      role = UserRole.admin;
      name = 'Dr. A. K. Verma (Medical Superintendent)';
    }

    return {
      'success': true,
      'data': {
        'token': 'demo-jwt-token-careflow-2026',
        'user': {
          'id': 'usr-${DateTime.now().millisecondsSinceEpoch}',
          'name': name,
          'email': email,
          'role': role.name,
          'phone': '+91 98100 12345',
          'department': 'General Medicine',
          'roomNumber': 'Room 104',
        }
      }
    };
  }

  static List<HospitalDepartment> _mockDepartments() {
    return [
      HospitalDepartment(
        id: 'dept-1',
        name: 'General Medicine',
        code: 'GEN',
        headDoctor: 'Dr. Rajesh Sharma',
        activeDoctorsCount: 3,
        waitingCount: 14,
        avgWaitTimeMinutes: 12,
      ),
      HospitalDepartment(
        id: 'dept-2',
        name: 'Orthopaedics',
        code: 'ORTHO',
        headDoctor: 'Dr. Neha Gupta',
        activeDoctorsCount: 2,
        waitingCount: 8,
        avgWaitTimeMinutes: 18,
      ),
      HospitalDepartment(
        id: 'dept-3',
        name: 'Paediatrics',
        code: 'PAED',
        headDoctor: 'Dr. Vikram Seth',
        activeDoctorsCount: 2,
        waitingCount: 6,
        avgWaitTimeMinutes: 10,
      ),
      HospitalDepartment(
        id: 'dept-4',
        name: 'Diagnostics & Pathology',
        code: 'LAB',
        headDoctor: 'Dr. Sunita Rao',
        activeDoctorsCount: 4,
        waitingCount: 19,
        avgWaitTimeMinutes: 15,
      ),
    ];
  }

  static List<PatientToken> _mockDepartmentQueue() {
    return [
      PatientToken(
        id: 'tok-1',
        tokenNumber: 'OPD-104',
        patientId: 'PT-901',
        patientName: 'Aarav Patel',
        age: 34,
        gender: 'Male',
        phone: '+91 98201 11221',
        department: 'General Medicine',
        assignedDoctorName: 'Dr. Rajesh Sharma',
        roomNumber: 'Room 4',
        symptoms: ['Fever', 'Body ache', 'Chills'],
        priority: PriorityLevel.normal,
        status: TokenStatus.inConsultation,
        registeredAt: '09:15 AM',
        estimatedWaitMinutes: 0,
        vitals: PatientVitals(bp: '120/80', pulse: 74, spo2: 98, temp: 99.2),
      ),
      PatientToken(
        id: 'tok-2',
        tokenNumber: 'OPD-105',
        patientId: 'PT-902',
        patientName: 'Sita Devi',
        age: 62,
        gender: 'Female',
        phone: '+91 98111 22334',
        department: 'General Medicine',
        assignedDoctorName: 'Dr. Rajesh Sharma',
        roomNumber: 'Room 4',
        symptoms: ['Chest tightness', 'Shortness of breath'],
        priority: PriorityLevel.emergency,
        status: TokenStatus.called,
        registeredAt: '09:22 AM',
        estimatedWaitMinutes: 4,
        vitals: PatientVitals(bp: '145/95', pulse: 88, spo2: 94, temp: 98.4),
      ),
      PatientToken(
        id: 'tok-3',
        tokenNumber: 'OPD-106',
        patientId: 'PT-903',
        patientName: 'Karan Mehra',
        age: 28,
        gender: 'Male',
        phone: '+91 98777 55443',
        department: 'General Medicine',
        symptoms: ['Persistent dry cough', 'Throat irritation'],
        priority: PriorityLevel.normal,
        status: TokenStatus.waiting,
        registeredAt: '09:30 AM',
        estimatedWaitMinutes: 14,
      ),
      PatientToken(
        id: 'tok-4',
        tokenNumber: 'OPD-107',
        patientId: 'PT-904',
        patientName: 'Baldev Singh',
        age: 71,
        gender: 'Male',
        phone: '+91 98555 11223',
        department: 'General Medicine',
        symptoms: ['Severe joint swelling', 'Knee stiffness'],
        priority: PriorityLevel.senior,
        status: TokenStatus.waiting,
        registeredAt: '09:35 AM',
        estimatedWaitMinutes: 22,
      ),
    ];
  }
}

