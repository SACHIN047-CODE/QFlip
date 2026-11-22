import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Doctor Consultation, Prescriptions & Cross-Role Sync Endpoint
class ConsultationEndpoint extends Endpoint {
  /// Record consultation note with automated cross-role sync to Pharmacy & Laboratory
  Future<Consultation> createConsultation(
    Session session,
    int patientId,
    int doctorId,
    int departmentId,
    String chiefComplaints,
    String diagnosis, {
    int? queueId,
    String? clinicalObservations,
    String? bp,
    String? pulse,
    String? temperature,
    String? spO2,
    String? weight,
    String? clinicalNotes,
    DateTime? followUpDate,
    List<String>? prescribedMedicines,
    List<String>? orderedLabTests,
  }) async {
    final consultationId = 'CONS-${DateTime.now().millisecondsSinceEpoch}';

    final consultation = await Consultation.db.insertRow(
      session,
      Consultation(
        consultationId: consultationId,
        patientId: patientId,
        doctorId: doctorId,
        departmentId: departmentId,
        queueId: queueId,
        chiefComplaints: chiefComplaints,
        clinicalObservations: clinicalObservations ?? '',
        diagnosis: diagnosis,
        bp: bp ?? '120/80 mmHg',
        pulse: pulse ?? '72 bpm',
        temperature: temperature ?? '98.6 °F',
        spO2: spO2 ?? '98%',
        weight: weight ?? '68 kg',
        clinicalNotes: clinicalNotes ?? '',
        followUpDate: followUpDate,
        status: 'completed',
        createdAt: DateTime.now(),
      ),
    );

    // 1. Cross-Role Sync: Generate digital prescription for Jan Aushadhi Pharmacy
    if (prescribedMedicines != null && prescribedMedicines.isNotEmpty && consultation.id != null) {
      final rxNumber = 'RX-${DateTime.now().millisecondsSinceEpoch}';
      final prescription = await Prescription.db.insertRow(
        session,
        Prescription(
          prescriptionNumber: rxNumber,
          consultationId: consultation.id!,
          patientId: patientId,
          doctorId: doctorId,
          dietaryAdvice: 'Follow prescribed dosage after meals.',
          status: 'pending_pharmacy',
          createdAt: DateTime.now(),
        ),
      );

      if (prescription.id != null) {
        for (final med in prescribedMedicines) {
          await PrescriptionItem.db.insertRow(
            session,
            PrescriptionItem(
              prescriptionId: prescription.id!,
              medicineName: med,
              dosage: '500 mg',
              quantity: 10,
              consumptionTiming: 'After breakfast',
              frequency: 'Twice daily',
              duration: '5 days',
              instructions: 'Take with warm water',
            ),
          );
        }

        // Create Pharmacy Dispensing Order
        await PharmacyOrder.db.insertRow(
          session,
          PharmacyOrder(
            orderNumber: 'ORD-${DateTime.now().millisecondsSinceEpoch}',
            prescriptionId: prescription.id!,
            patientId: patientId,
            totalAmount: 0.0, // Subsidized in government hospital
            paymentStatus: 'exempt_gov',
            status: 'received',
            createdAt: DateTime.now(),
          ),
        );
      }
    }

    // 2. Cross-Role Sync: Generate diagnostic requests for Laboratory
    if (orderedLabTests != null && orderedLabTests.isNotEmpty && consultation.id != null) {
      for (final test in orderedLabTests) {
        await LabTest.db.insertRow(
          session,
          LabTest(
            testRequestId: 'LAB-${DateTime.now().millisecondsSinceEpoch}-${test.hashCode.abs() % 1000}',
            consultationId: consultation.id!,
            patientId: patientId,
            doctorId: doctorId,
            testName: test,
            testCategory: test.toLowerCase().contains('x-ray') ? 'Radiology' : 'Pathology',
            priority: 'routine',
            status: 'requested',
            createdAt: DateTime.now(),
          ),
        );
      }
    }

    return consultation;
  }

  /// Get consultation history
  Future<List<Consultation>> getConsultations(
    Session session, {
    int? patientId,
    int? doctorId,
  }) async {
    final list = await Consultation.db.find(
      session,
      where: (t) =>
          (patientId != null ? t.patientId.equals(patientId) : Constant.bool(true)) &
          (doctorId != null ? t.doctorId.equals(doctorId) : Constant.bool(true)),
      orderBy: (t) => t.createdAt,
    );
    return list.reversed.toList();
  }
}
