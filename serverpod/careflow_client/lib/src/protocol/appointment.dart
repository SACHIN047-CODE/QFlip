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

abstract class Appointment
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Appointment._({
    this.id,
    required this.appointmentNumber,
    required this.patientId,
    this.doctorId,
    required this.departmentId,
    required this.appointmentDate,
    required this.timeSlot,
    String? status,
    this.reason,
    this.symptoms,
    this.notes,
    this.createdAt,
    this.updatedAt,
  }) : status = status ?? 'scheduled';

  factory Appointment({
    int? id,
    required String appointmentNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    required DateTime appointmentDate,
    required String timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _AppointmentImpl;

  factory Appointment.fromJson(Map<String, dynamic> jsonSerialization) {
    return Appointment(
      id: jsonSerialization['id'] as int?,
      appointmentNumber: jsonSerialization['appointmentNumber'] as String,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int?,
      departmentId: jsonSerialization['departmentId'] as int,
      appointmentDate: _isc.DateTimeJsonExtension.fromJson(
        jsonSerialization['appointmentDate'],
      ),
      timeSlot: jsonSerialization['timeSlot'] as String,
      status: jsonSerialization['status'] as String?,
      reason: jsonSerialization['reason'] as String?,
      symptoms: jsonSerialization['symptoms'] as String?,
      notes: jsonSerialization['notes'] as String?,
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

  String appointmentNumber;

  int patientId;

  int? doctorId;

  int departmentId;

  DateTime appointmentDate;

  String timeSlot;

  String status;

  String? reason;

  String? symptoms;

  String? notes;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [Appointment]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Appointment copyWith({
    int? id,
    String? appointmentNumber,
    int? patientId,
    int? doctorId,
    int? departmentId,
    DateTime? appointmentDate,
    String? timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Appointment',
      if (id != null) 'id': id,
      'appointmentNumber': appointmentNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'appointmentDate': appointmentDate.toJson(),
      'timeSlot': timeSlot,
      'status': status,
      if (reason != null) 'reason': reason,
      if (symptoms != null) 'symptoms': symptoms,
      if (notes != null) 'notes': notes,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Appointment',
      if (id != null) 'id': id,
      'appointmentNumber': appointmentNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'appointmentDate': appointmentDate.toJson(),
      'timeSlot': timeSlot,
      'status': status,
      if (reason != null) 'reason': reason,
      if (symptoms != null) 'symptoms': symptoms,
      if (notes != null) 'notes': notes,
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

class _AppointmentImpl extends Appointment {
  _AppointmentImpl({
    int? id,
    required String appointmentNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    required DateTime appointmentDate,
    required String timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         appointmentNumber: appointmentNumber,
         patientId: patientId,
         doctorId: doctorId,
         departmentId: departmentId,
         appointmentDate: appointmentDate,
         timeSlot: timeSlot,
         status: status,
         reason: reason,
         symptoms: symptoms,
         notes: notes,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Appointment]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Appointment copyWith({
    Object? id = _Undefined,
    String? appointmentNumber,
    int? patientId,
    Object? doctorId = _Undefined,
    int? departmentId,
    DateTime? appointmentDate,
    String? timeSlot,
    String? status,
    Object? reason = _Undefined,
    Object? symptoms = _Undefined,
    Object? notes = _Undefined,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return Appointment(
      id: id is int? ? id : this.id,
      appointmentNumber: appointmentNumber ?? this.appointmentNumber,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId is int? ? doctorId : this.doctorId,
      departmentId: departmentId ?? this.departmentId,
      appointmentDate: appointmentDate ?? this.appointmentDate,
      timeSlot: timeSlot ?? this.timeSlot,
      status: status ?? this.status,
      reason: reason is String? ? reason : this.reason,
      symptoms: symptoms is String? ? symptoms : this.symptoms,
      notes: notes is String? ? notes : this.notes,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
