import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Clinical Departments Management Endpoint
class DepartmentEndpoint extends Endpoint {
  /// List all active clinical departments
  Future<List<Department>> getDepartments(Session session) async {
    return await Department.db.find(
      session,
      where: (t) => t.isActive.equals(true),
      orderBy: (t) => t.name,
    );
  }

  /// Get specific department by ID
  Future<Department?> getDepartmentById(Session session, int id) async {
    return await Department.db.findById(session, id);
  }

  /// Create a new department
  Future<Department> createDepartment(
    Session session,
    String name,
    String code, {
    String? description,
    String? floor,
    int? maxDailyCapacity,
  }) async {
    final dept = Department(
      name: name,
      code: code.toUpperCase(),
      description: description ?? '',
      floor: floor ?? 'Ground Floor',
      maxDailyCapacity: maxDailyCapacity ?? 250,
      averageWaitTimeMinutes: 20,
      isActive: true,
      createdAt: DateTime.now(),
    );
    return await Department.db.insertRow(session, dept);
  }
}
