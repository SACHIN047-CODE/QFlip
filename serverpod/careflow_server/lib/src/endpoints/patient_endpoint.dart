import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Patient Records & Medical Profile Endpoint
class PatientEndpoint extends Endpoint {
  /// Search or list registered patients
  Future<List<Patient>> getPatients(
    Session session, {
    String? search,
  }) async {
    final list = await Patient.db.find(
      session,
      orderBy: (t) => t.id,
      limit: 100,
    );
    return list.reversed.toList();
  }

  /// Get patient by ID
  Future<Patient?> getPatientById(Session session, int id) async {
    return await Patient.db.findById(session, id);
  }

  /// Get patient by patientId string (e.g. "PT-10001")
  Future<Patient?> getPatientByPatientId(Session session, String patientId) async {
    return await Patient.db.findFirstRow(
      session,
      where: (t) => t.patientId.equals(patientId),
    );
  }

  /// Register patient profile
  Future<Patient> createPatient(
    Session session,
    int userId,
    String patientId, {
    int? age,
    String? gender,
    String? bloodGroup,
    String? abhaId,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? address,
  }) async {
    final patient = Patient(
      patientId: patientId,
      userId: userId,
      age: age ?? 30,
      gender: gender ?? 'Male',
      bloodGroup: bloodGroup ?? 'Unknown',
      abhaId: abhaId,
      emergencyContactName: emergencyContactName,
      emergencyContactPhone: emergencyContactPhone,
      address: address,
      registrationDate: DateTime.now(),
      createdAt: DateTime.now(),
    );
    return await Patient.db.insertRow(session, patient);
  }
}
