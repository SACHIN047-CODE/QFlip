import 'package:serverpod/serverpod.dart';
import '../generated/models.dart';

class AuthEndpoint extends Endpoint {
  // In-memory fallback state for rapid development & zero-db deployment
  static final List<User> _mockUsers = [
    User(
      id: 1,
      name: 'Rohan Verma',
      email: 'rohan.patient@careflow.health',
      role: 'patient',
      phone: '9876543210',
      abhaId: '91-8274-1049-9812',
      isActive: true,
      createdAt: DateTime.now().subtract(const Duration(days: 30)),
    ),
    User(
      id: 2,
      name: 'Dr. Rajesh Sharma',
      email: 'dr.rajesh@careflow.health',
      role: 'doctor',
      phone: '9812345678',
      department: 'General Medicine',
      roomNumber: 'Room 12',
      isActive: true,
      createdAt: DateTime.now().subtract(const Duration(days: 90)),
    ),
    User(
      id: 3,
      name: 'Pooja Rani (Staff)',
      email: 'staff@careflow.health',
      role: 'staff',
      phone: '9823456789',
      department: 'Registration & Triage',
      isActive: true,
      createdAt: DateTime.now().subtract(const Duration(days: 60)),
    ),
    User(
      id: 4,
      name: 'Hospital Command Admin',
      email: 'admin@careflow.health',
      role: 'admin',
      phone: '9834567890',
      isActive: true,
      createdAt: DateTime.now().subtract(const Duration(days: 120)),
    ),
  ];

  Future<Map<String, dynamic>> login(
    Session session,
    String email,
    String password,
  ) async {
    session.log('AuthEndpoint.login called for email: $email');
    
    final matched = _mockUsers.firstWhere(
      (u) => u.email.toLowerCase() == email.toLowerCase(),
      orElse: () => User(
        id: DateTime.now().millisecondsSinceEpoch,
        name: email.split('@').first,
        email: email,
        role: email.contains('doctor') ? 'doctor' : (email.contains('admin') ? 'admin' : (email.contains('staff') ? 'staff' : 'patient')),
        isActive: true,
        createdAt: DateTime.now(),
      ),
    );

    return {
      'success': true,
      'token': 'serverpod_jwt_token_${matched.id}_${DateTime.now().millisecondsSinceEpoch}',
      'user': matched.toJson(),
    };
  }

  Future<Map<String, dynamic>> loginWithAbha(
    Session session,
    String abhaId,
  ) async {
    session.log('AuthEndpoint.loginWithAbha called for ABHA: $abhaId');

    final cleanAbha = abhaId.replaceAll(' ', '');
    final matched = _mockUsers.firstWhere(
      (u) => (u.abhaId ?? '').replaceAll(' ', '').replaceAll('-', '') == cleanAbha.replaceAll('-', ''),
      orElse: () => User(
        id: DateTime.now().millisecondsSinceEpoch,
        name: 'ABHA Patient',
        email: 'patient_$cleanAbha@careflow.health',
        role: 'patient',
        abhaId: abhaId,
        isActive: true,
        createdAt: DateTime.now(),
      ),
    );

    return {
      'success': true,
      'token': 'serverpod_jwt_abha_${matched.id}',
      'user': matched.toJson(),
    };
  }

  Future<User> registerPatient(
    Session session,
    String name,
    String phone,
    String? abhaId,
  ) async {
    final newUser = User(
      id: _mockUsers.length + 1,
      name: name,
      email: 'patient_${phone.substring(phone.length - 4)}@careflow.health',
      role: 'patient',
      phone: phone,
      abhaId: abhaId ?? '91-${phone.substring(0, 4)}-${phone.substring(4, 8)}-${phone.substring(8)}',
      isActive: true,
      createdAt: DateTime.now(),
    );

    _mockUsers.add(newUser);
    return newUser;
  }
}
