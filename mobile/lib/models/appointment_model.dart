class AppointmentModel {
  final String id;
  final String appointmentNumber;
  final String patientId;
  final String patientName;
  final String doctorId;
  final String doctorName;
  final String departmentId;
  final String departmentName;
  final String appointmentDate;
  final String timeSlot;
  final String status; // 'scheduled' | 'checked_in' | 'completed' | 'cancelled' | 'no_show'
  final String symptoms;
  final String priority;

  AppointmentModel({
    required this.id,
    required this.appointmentNumber,
    required this.patientId,
    required this.patientName,
    required this.doctorId,
    required this.doctorName,
    required this.departmentId,
    required this.departmentName,
    required this.appointmentDate,
    required this.timeSlot,
    this.status = 'scheduled',
    required this.symptoms,
    this.priority = 'normal',
  });

  factory AppointmentModel.fromJson(Map<String, dynamic> json) {
    return AppointmentModel(
      id: json['_id'] ?? json['id'] ?? '',
      appointmentNumber: json['appointmentNumber'] ?? '',
      patientId: json['patient'] is Map ? (json['patient']['_id'] ?? '') : (json['patientId'] ?? ''),
      patientName: json['patient'] is Map ? (json['patient']['name'] ?? '') : (json['patientName'] ?? ''),
      doctorId: json['doctor'] is Map ? (json['doctor']['_id'] ?? '') : (json['doctorId'] ?? ''),
      doctorName: json['doctor'] is Map ? (json['doctor']['name'] ?? '') : (json['doctorName'] ?? ''),
      departmentId: json['department'] is Map ? (json['department']['_id'] ?? '') : (json['departmentId'] ?? ''),
      departmentName: json['department'] is Map ? (json['department']['name'] ?? '') : (json['departmentName'] ?? ''),
      appointmentDate: json['appointmentDate'] ?? '',
      timeSlot: json['timeSlot'] ?? '',
      status: json['status'] ?? 'scheduled',
      symptoms: json['symptoms'] ?? '',
      priority: json['priority'] ?? 'normal',
    );
  }
}
