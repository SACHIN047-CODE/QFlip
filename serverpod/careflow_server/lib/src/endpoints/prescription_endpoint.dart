import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Digital Prescriptions & Jan Aushadhi Dispensing Endpoint
class PrescriptionEndpoint extends Endpoint {
  /// Fetch prescriptions (optional patient or status filter)
  Future<List<Prescription>> getPrescriptions(
    Session session, {
    int? patientId,
    String? status,
  }) async {
    final list = await Prescription.db.find(
      session,
      where: (t) =>
          (patientId != null ? t.patientId.equals(patientId) : Constant.bool(true)) &
          (status != null ? t.status.equals(status) : Constant.bool(true)),
      orderBy: (t) => t.createdAt,
    );
    return list.reversed.toList();
  }

  /// Get prescription items for a prescription
  Future<List<PrescriptionItem>> getPrescriptionItems(
    Session session,
    int prescriptionId,
  ) async {
    return await PrescriptionItem.db.find(
      session,
      where: (t) => t.prescriptionId.equals(prescriptionId),
    );
  }

  /// Update prescription status (pending_pharmacy, dispensed, etc.)
  Future<Prescription> updateStatus(
    Session session,
    int prescriptionId,
    String status,
  ) async {
    final rx = await Prescription.db.findById(session, prescriptionId);
    if (rx == null) throw Exception('Prescription not found');

    rx.status = status;
    return await Prescription.db.updateRow(session, rx);
  }
}
