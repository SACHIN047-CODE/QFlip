/* AUTOMATICALLY GENERATED CODE DO NOT MODIFY */
/*   To generate run: "serverpod generate"    */

// ignore_for_file: implementation_imports
// ignore_for_file: library_private_types_in_public_api
// ignore_for_file: non_constant_identifier_names
// ignore_for_file: public_member_api_docs
// ignore_for_file: type_literal_in_constant_pattern
// ignore_for_file: use_super_parameters
// ignore_for_file: invalid_use_of_internal_member

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:serverpod_client/serverpod_client.dart' as _isc;

abstract class Doctor
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Doctor._({
    this.id,
    required this.doctorId,
    required this.userId,
    required this.departmentId,
    required this.specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    this.createdAt,
    this.updatedAt,
  }) : qualification = qualification ?? 'MBBS, MD',
       roomNumber = roomNumber ?? 'Room 101',
       opdShiftStart = opdShiftStart ?? '09:00 AM',
       opdShiftEnd = opdShiftEnd ?? '02:00 PM',
       isAvailable = isAvailable ?? true,
       maxDailyPatients = maxDailyPatients ?? 50,
       consultationFee = consultationFee ?? 0.0,
       averageConsultationTimeMinutes = averageConsultationTimeMinutes ?? 10,
       bufferCapacityLimit = bufferCapacityLimit ?? 5;

  factory Doctor({
    int? id,
    required String doctorId,
    required int userId,
    required int departmentId,
    required String specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _DoctorImpl;

  factory Doctor.fromJson(Map<String, dynamic> jsonSerialization) {
    return Doctor(
      id: jsonSerialization['id'] as int?,
      doctorId: jsonSerialization['doctorId'] as String,
      userId: jsonSerialization['userId'] as int,
      departmentId: jsonSerialization['departmentId'] as int,
      specialization: jsonSerialization['specialization'] as String,
      qualification: jsonSerialization['qualification'] as String?,
      roomNumber: jsonSerialization['roomNumber'] as String?,
      opdShiftStart: jsonSerialization['opdShiftStart'] as String?,
      opdShiftEnd: jsonSerialization['opdShiftEnd'] as String?,
      isAvailable: jsonSerialization['isAvailable'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isAvailable']),
      maxDailyPatients: jsonSerialization['maxDailyPatients'] as int?,
      consultationFee: (jsonSerialization['consultationFee'] as num?)
          ?.toDouble(),
      averageConsultationTimeMinutes:
          jsonSerialization['averageConsultationTimeMinutes'] as int?,
      bufferCapacityLimit: jsonSerialization['bufferCapacityLimit'] as int?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  /// The database id, set if the object has been inserted into the
  /// database or if it has been fetched from the database. Otherwise,
  /// the id will be null.
  int? id;

  String doctorId;

  int userId;

  int departmentId;

  String specialization;

  String qualification;

  String roomNumber;

  String opdShiftStart;

  String opdShiftEnd;

  bool isAvailable;

  int maxDailyPatients;

  double consultationFee;

  int averageConsultationTimeMinutes;

  int bufferCapacityLimit;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [Doctor]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Doctor copyWith({
    int? id,
    String? doctorId,
    int? userId,
    int? departmentId,
    String? specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Doctor',
      if (id != null) 'id': id,
      'doctorId': doctorId,
      'userId': userId,
      'departmentId': departmentId,
      'specialization': specialization,
      'qualification': qualification,
      'roomNumber': roomNumber,
      'opdShiftStart': opdShiftStart,
      'opdShiftEnd': opdShiftEnd,
      'isAvailable': isAvailable,
      'maxDailyPatients': maxDailyPatients,
      'consultationFee': consultationFee,
      'averageConsultationTimeMinutes': averageConsultationTimeMinutes,
      'bufferCapacityLimit': bufferCapacityLimit,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Doctor',
      if (id != null) 'id': id,
      'doctorId': doctorId,
      'userId': userId,
      'departmentId': departmentId,
      'specialization': specialization,
      'qualification': qualification,
      'roomNumber': roomNumber,
      'opdShiftStart': opdShiftStart,
      'opdShiftEnd': opdShiftEnd,
      'isAvailable': isAvailable,
      'maxDailyPatients': maxDailyPatients,
      'consultationFee': consultationFee,
      'averageConsultationTimeMinutes': averageConsultationTimeMinutes,
      'bufferCapacityLimit': bufferCapacityLimit,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _DoctorImpl extends Doctor {
  _DoctorImpl({
    int? id,
    required String doctorId,
    required int userId,
    required int departmentId,
    required String specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         doctorId: doctorId,
         userId: userId,
         departmentId: departmentId,
         specialization: specialization,
         qualification: qualification,
         roomNumber: roomNumber,
         opdShiftStart: opdShiftStart,
         opdShiftEnd: opdShiftEnd,
         isAvailable: isAvailable,
         maxDailyPatients: maxDailyPatients,
         consultationFee: consultationFee,
         averageConsultationTimeMinutes: averageConsultationTimeMinutes,
         bufferCapacityLimit: bufferCapacityLimit,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Doctor]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Doctor copyWith({
    Object? id = _Undefined,
    String? doctorId,
    int? userId,
    int? departmentId,
    String? specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return Doctor(
      id: id is int? ? id : this.id,
      doctorId: doctorId ?? this.doctorId,
      userId: userId ?? this.userId,
      departmentId: departmentId ?? this.departmentId,
      specialization: specialization ?? this.specialization,
      qualification: qualification ?? this.qualification,
      roomNumber: roomNumber ?? this.roomNumber,
      opdShiftStart: opdShiftStart ?? this.opdShiftStart,
      opdShiftEnd: opdShiftEnd ?? this.opdShiftEnd,
      isAvailable: isAvailable ?? this.isAvailable,
      maxDailyPatients: maxDailyPatients ?? this.maxDailyPatients,
      consultationFee: consultationFee ?? this.consultationFee,
      averageConsultationTimeMinutes:
          averageConsultationTimeMinutes ?? this.averageConsultationTimeMinutes,
      bufferCapacityLimit: bufferCapacityLimit ?? this.bufferCapacityLimit,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
