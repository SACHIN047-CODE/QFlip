import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Outpatient Appointments Scheduling Endpoint
class AppointmentEndpoint extends Endpoint {
  /// Book a new OPD appointment
  Future<Appointment> bookAppointment(
    Session session,
    int patientId,
    int departmentId,
    DateTime appointmentDate,
    String timeSlot, {
    int? doctorId,
    String? reason,
    String? symptoms,
  }) async {
    final num = 'APT-${DateTime.now().millisecondsSinceEpoch % 100000}';
    final apt = Appointment(
      appointmentNumber: num,
      patientId: patientId,
      departmentId: departmentId,
      doctorId: doctorId,
      appointmentDate: appointmentDate,
      timeSlot: timeSlot,
      status: 'scheduled',
      reason: reason,
      symptoms: symptoms,
      createdAt: DateTime.now(),
    );
    return await Appointment.db.insertRow(session, apt);
  }

  /// List appointments (optional patient or department filter)
  Future<List<Appointment>> getAppointments(
    Session session, {
    int? patientId,
    int? departmentId,
  }) async {
    final list = await Appointment.db.find(
      session,
      where: (t) =>
          (patientId != null ? t.patientId.equals(patientId) : Constant.bool(true)) &
          (departmentId != null ? t.departmentId.equals(departmentId) : Constant.bool(true)),
      orderBy: (t) => t.appointmentDate,
    );
    return list.reversed.toList();
  }

  /// Update appointment status (checked_in, completed, cancelled)
  Future<Appointment> updateStatus(
    Session session,
    int appointmentId,
    String status,
  ) async {
    final apt = await Appointment.db.findById(session, appointmentId);
    if (apt == null) throw Exception('Appointment not found');

    apt.status = status;
    return await Appointment.db.updateRow(session, apt);
  }
}
