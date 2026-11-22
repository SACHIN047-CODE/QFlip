class UserModel {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String role; // 'patient' | 'doctor' | 'staff' | 'admin' | 'lab' | 'pharmacy'
  final String? abhaId;
  final int? age;
  final String? gender;
  final String? roomNumber;
  final String? specialization;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.role,
    this.abhaId,
    this.age,
    this.gender,
    this.roomNumber,
    this.specialization,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      role: json['role'] ?? 'patient',
      abhaId: json['abhaId'],
      age: json['age'] is int ? json['age'] : (int.tryParse(json['age']?.toString() ?? '')),
      gender: json['gender'],
      roomNumber: json['roomNumber'] ?? json['room'],
      specialization: json['specialization'] ?? json['specialty'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'role': role,
      'abhaId': abhaId,
      'age': age,
      'gender': gender,
      'roomNumber': roomNumber,
      'specialization': specialization,
    };
  }
}
