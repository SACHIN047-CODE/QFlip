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

abstract class Consultation
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Consultation._({
    this.id,
    required this.consultationId,
    required this.patientId,
    required this.doctorId,
    required this.departmentId,
    this.queueId,
    required this.chiefComplaints,
    this.clinicalObservations,
    required this.diagnosis,
    this.bp,
    this.pulse,
    this.temperature,
    this.spO2,
    this.weight,
    this.clinicalNotes,
    this.followUpDate,
    String? status,
    this.createdAt,
    this.updatedAt,
  }) : status = status ?? 'completed';

  factory Consultation({
    int? id,
    required String consultationId,
    required int patientId,
    required int doctorId,
    required int departmentId,
    int? queueId,
    required String chiefComplaints,
    String? clinicalObservations,
    required String diagnosis,
    String? bp,
    String? pulse,
    String? temperature,
    String? spO2,
    String? weight,
    String? clinicalNotes,
    DateTime? followUpDate,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _ConsultationImpl;

  factory Consultation.fromJson(Map<String, dynamic> jsonSerialization) {
    return Consultation(
      id: jsonSerialization['id'] as int?,
      consultationId: jsonSerialization['consultationId'] as String,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int,
      departmentId: jsonSerialization['departmentId'] as int,
      queueId: jsonSerialization['queueId'] as int?,
      chiefComplaints: jsonSerialization['chiefComplaints'] as String,
      clinicalObservations:
          jsonSerialization['clinicalObservations'] as String?,
      diagnosis: jsonSerialization['diagnosis'] as String,
      bp: jsonSerialization['bp'] as String?,
      pulse: jsonSerialization['pulse'] as String?,
      temperature: jsonSerialization['temperature'] as String?,
      spO2: jsonSerialization['spO2'] as String?,
      weight: jsonSerialization['weight'] as String?,
      clinicalNotes: jsonSerialization['clinicalNotes'] as String?,
      followUpDate: jsonSerialization['followUpDate'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['followUpDate'],
            ),
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

  String consultationId;

  int patientId;

  int doctorId;

  int departmentId;

  int? queueId;

  String chiefComplaints;

  String? clinicalObservations;

  String diagnosis;

  String? bp;

  String? pulse;

  String? temperature;

  String? spO2;

  String? weight;

  String? clinicalNotes;

  DateTime? followUpDate;

  String status;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [Consultation]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Consultation copyWith({
    int? id,
    String? consultationId,
    int? patientId,
    int? doctorId,
    int? departmentId,
    int? queueId,
    String? chiefComplaints,
    String? clinicalObservations,
    String? diagnosis,
    String? bp,
    String? pulse,
    String? temperature,
    String? spO2,
    String? weight,
    String? clinicalNotes,
    DateTime? followUpDate = const _isc.$UndefinedDateTime(),
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Consultation',
      if (id != null) 'id': id,
      'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'departmentId': departmentId,
      if (queueId != null) 'queueId': queueId,
      'chiefComplaints': chiefComplaints,
      if (clinicalObservations != null)
        'clinicalObservations': clinicalObservations,
      'diagnosis': diagnosis,
      if (bp != null) 'bp': bp,
      if (pulse != null) 'pulse': pulse,
      if (temperature != null) 'temperature': temperature,
      if (spO2 != null) 'spO2': spO2,
      if (weight != null) 'weight': weight,
      if (clinicalNotes != null) 'clinicalNotes': clinicalNotes,
      if (followUpDate != null) 'followUpDate': followUpDate?.toJson(),
      'status': status,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Consultation',
      if (id != null) 'id': id,
      'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'departmentId': departmentId,
      if (queueId != null) 'queueId': queueId,
      'chiefComplaints': chiefComplaints,
      if (clinicalObservations != null)
        'clinicalObservations': clinicalObservations,
      'diagnosis': diagnosis,
      if (bp != null) 'bp': bp,
      if (pulse != null) 'pulse': pulse,
      if (temperature != null) 'temperature': temperature,
      if (spO2 != null) 'spO2': spO2,
      if (weight != null) 'weight': weight,
      if (clinicalNotes != null) 'clinicalNotes': clinicalNotes,
      if (followUpDate != null) 'followUpDate': followUpDate?.toJson(),
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

class _ConsultationImpl extends Consultation {
  _ConsultationImpl({
    int? id,
    required String consultationId,
    required int patientId,
    required int doctorId,
    required int departmentId,
    int? queueId,
    required String chiefComplaints,
    String? clinicalObservations,
    required String diagnosis,
    String? bp,
    String? pulse,
    String? temperature,
    String? spO2,
    String? weight,
    String? clinicalNotes,
    DateTime? followUpDate,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         consultationId: consultationId,
         patientId: patientId,
         doctorId: doctorId,
         departmentId: departmentId,
         queueId: queueId,
         chiefComplaints: chiefComplaints,
         clinicalObservations: clinicalObservations,
         diagnosis: diagnosis,
         bp: bp,
         pulse: pulse,
         temperature: temperature,
         spO2: spO2,
         weight: weight,
         clinicalNotes: clinicalNotes,
         followUpDate: followUpDate,
         status: status,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Consultation]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Consultation copyWith({
    Object? id = _Undefined,
    String? consultationId,
    int? patientId,
    int? doctorId,
    int? departmentId,
    Object? queueId = _Undefined,
    String? chiefComplaints,
    Object? clinicalObservations = _Undefined,
    String? diagnosis,
    Object? bp = _Undefined,
    Object? pulse = _Undefined,
    Object? temperature = _Undefined,
    Object? spO2 = _Undefined,
    Object? weight = _Undefined,
    Object? clinicalNotes = _Undefined,
    DateTime? followUpDate = const _isc.$UndefinedDateTime(),
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return Consultation(
      id: id is int? ? id : this.id,
      consultationId: consultationId ?? this.consultationId,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId ?? this.doctorId,
      departmentId: departmentId ?? this.departmentId,
      queueId: queueId is int? ? queueId : this.queueId,
      chiefComplaints: chiefComplaints ?? this.chiefComplaints,
      clinicalObservations: clinicalObservations is String?
          ? clinicalObservations
          : this.clinicalObservations,
      diagnosis: diagnosis ?? this.diagnosis,
      bp: bp is String? ? bp : this.bp,
      pulse: pulse is String? ? pulse : this.pulse,
      temperature: temperature is String? ? temperature : this.temperature,
      spO2: spO2 is String? ? spO2 : this.spO2,
      weight: weight is String? ? weight : this.weight,
      clinicalNotes: clinicalNotes is String?
          ? clinicalNotes
          : this.clinicalNotes,
      followUpDate: followUpDate is _isc.UndefinedSentinel
          ? this.followUpDate
          : followUpDate,
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
