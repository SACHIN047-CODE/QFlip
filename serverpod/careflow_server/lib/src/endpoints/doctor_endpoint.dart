import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Doctor Directory, Roster & Availability Endpoint
class DoctorEndpoint extends Endpoint {
  /// List all active doctors (optional department filter)
  Future<List<Doctor>> getDoctors(
    Session session, {
    int? departmentId,
  }) async {
    return await Doctor.db.find(
      session,
      where: (t) => departmentId != null
          ? t.departmentId.equals(departmentId)
          : Constant.bool(true),
      orderBy: (t) => t.doctorId,
    );
  }

  /// Get specific doctor by ID
  Future<Doctor?> getDoctorById(Session session, int id) async {
    return await Doctor.db.findById(session, id);
  }

  /// Update doctor availability (e.g. in consultation, on break, shift ended)
  Future<Doctor> updateAvailability(
    Session session,
    int doctorId,
    bool isAvailable,
  ) async {
    final doctor = await Doctor.db.findById(session, doctorId);
    if (doctor == null) throw Exception('Doctor not found');

    doctor.isAvailable = isAvailable;
    return await Doctor.db.updateRow(session, doctor);
  }
}
