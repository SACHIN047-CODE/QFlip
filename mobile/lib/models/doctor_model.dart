class DoctorModel {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String specialization;
  final String qualification;
  final String room;
  final String floor;
  final String opdShift;
  final bool isAvailable;
  final int capacity;
  final int activeQueueCount;

  DoctorModel({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    required this.specialization,
    required this.qualification,
    required this.room,
    this.floor = 'Ground Floor',
    this.opdShift = '09:00 AM - 02:00 PM',
    this.isAvailable = true,
    this.capacity = 30,
    this.activeQueueCount = 0,
  });

  factory DoctorModel.fromJson(Map<String, dynamic> json) {
    final user = json['user'] is Map ? json['user'] : null;
    return DoctorModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: user != null ? (user['name'] ?? '') : (json['name'] ?? ''),
      email: user != null ? (user['email'] ?? '') : (json['email'] ?? ''),
      phone: user != null ? user['phone'] : json['phone'],
      specialization: json['specialization'] ?? json['specialty'] ?? 'General Medicine',
      qualification: json['qualification'] ?? 'MBBS, MD',
      room: json['room'] ?? json['roomNumber'] ?? 'OPD Room 101',
      floor: json['floor'] ?? 'Ground Floor',
      opdShift: json['opdShift'] ?? json['shift'] ?? '09:00 AM - 02:00 PM',
      isAvailable: json['isAvailable'] ?? json['available'] ?? true,
      capacity: json['capacity'] ?? 30,
      activeQueueCount: json['activeQueueCount'] ?? 0,
    );
  }
}
