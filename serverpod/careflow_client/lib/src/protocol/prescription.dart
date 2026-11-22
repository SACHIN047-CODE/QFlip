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

abstract class Prescription
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Prescription._({
    this.id,
    required this.prescriptionNumber,
    required this.consultationId,
    required this.patientId,
    required this.doctorId,
    this.dietaryAdvice,
    String? status,
    this.createdAt,
    this.updatedAt,
  }) : status = status ?? 'pending_pharmacy';

  factory Prescription({
    int? id,
    required String prescriptionNumber,
    required int consultationId,
    required int patientId,
    required int doctorId,
    String? dietaryAdvice,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _PrescriptionImpl;

  factory Prescription.fromJson(Map<String, dynamic> jsonSerialization) {
    return Prescription(
      id: jsonSerialization['id'] as int?,
      prescriptionNumber: jsonSerialization['prescriptionNumber'] as String,
      consultationId: jsonSerialization['consultationId'] as int,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int,
      dietaryAdvice: jsonSerialization['dietaryAdvice'] as String?,
      status: jsonSerialization['status'] as String?,
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

  String prescriptionNumber;

  int consultationId;

  int patientId;

  int doctorId;

  String? dietaryAdvice;

  String status;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [Prescription]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Prescription copyWith({
    int? id,
    String? prescriptionNumber,
    int? consultationId,
    int? patientId,
    int? doctorId,
    String? dietaryAdvice,
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Prescription',
      if (id != null) 'id': id,
      'prescriptionNumber': prescriptionNumber,
      'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      if (dietaryAdvice != null) 'dietaryAdvice': dietaryAdvice,
      'status': status,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Prescription',
      if (id != null) 'id': id,
      'prescriptionNumber': prescriptionNumber,
      'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      if (dietaryAdvice != null) 'dietaryAdvice': dietaryAdvice,
      'status': status,
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

class _PrescriptionImpl extends Prescription {
  _PrescriptionImpl({
    int? id,
    required String prescriptionNumber,
    required int consultationId,
    required int patientId,
    required int doctorId,
    String? dietaryAdvice,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         prescriptionNumber: prescriptionNumber,
         consultationId: consultationId,
         patientId: patientId,
         doctorId: doctorId,
         dietaryAdvice: dietaryAdvice,
         status: status,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Prescription]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Prescription copyWith({
    Object? id = _Undefined,
    String? prescriptionNumber,
    int? consultationId,
    int? patientId,
    int? doctorId,
    Object? dietaryAdvice = _Undefined,
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return Prescription(
      id: id is int? ? id : this.id,
      prescriptionNumber: prescriptionNumber ?? this.prescriptionNumber,
      consultationId: consultationId ?? this.consultationId,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId ?? this.doctorId,
      dietaryAdvice: dietaryAdvice is String?
          ? dietaryAdvice
          : this.dietaryAdvice,
      status: status ?? this.status,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
