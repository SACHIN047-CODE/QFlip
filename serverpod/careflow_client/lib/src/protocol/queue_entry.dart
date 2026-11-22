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

abstract class QueueEntry
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  QueueEntry._({
    this.id,
    required this.tokenNumber,
    required this.sequenceNumber,
    required this.patientId,
    this.doctorId,
    required this.departmentId,
    String? status,
    String? triageLevel,
    int? priorityScore,
    this.symptoms,
    int? estimatedWaitTimeMinutes,
    this.checkInTime,
    this.callTime,
    this.consultationStartTime,
    this.completionTime,
    this.delayReason,
    bool? isBuffer,
    String? entryType,
    this.skippedAt,
    this.rejoinedAt,
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    this.createdAt,
    this.updatedAt,
  }) : status = status ?? 'waiting',
       triageLevel = triageLevel ?? 'green',
       priorityScore = priorityScore ?? 10,
       estimatedWaitTimeMinutes = estimatedWaitTimeMinutes ?? 15,
       isBuffer = isBuffer ?? false,
       entryType = entryType ?? 'standard',
       reentryPenaltyApplied = reentryPenaltyApplied ?? false,
       reentryPenaltyPositions = reentryPenaltyPositions ?? 3;

  factory QueueEntry({
    int? id,
    required String tokenNumber,
    required int sequenceNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    String? status,
    String? triageLevel,
    int? priorityScore,
    String? symptoms,
    int? estimatedWaitTimeMinutes,
    DateTime? checkInTime,
    DateTime? callTime,
    DateTime? consultationStartTime,
    DateTime? completionTime,
    String? delayReason,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt,
    DateTime? rejoinedAt,
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _QueueEntryImpl;

  factory QueueEntry.fromJson(Map<String, dynamic> jsonSerialization) {
    return QueueEntry(
      id: jsonSerialization['id'] as int?,
      tokenNumber: jsonSerialization['tokenNumber'] as String,
      sequenceNumber: jsonSerialization['sequenceNumber'] as int,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int?,
      departmentId: jsonSerialization['departmentId'] as int,
      status: jsonSerialization['status'] as String?,
      triageLevel: jsonSerialization['triageLevel'] as String?,
      priorityScore: jsonSerialization['priorityScore'] as int?,
      symptoms: jsonSerialization['symptoms'] as String?,
      estimatedWaitTimeMinutes:
          jsonSerialization['estimatedWaitTimeMinutes'] as int?,
      checkInTime: jsonSerialization['checkInTime'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['checkInTime'],
            ),
      callTime: jsonSerialization['callTime'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['callTime']),
      consultationStartTime: jsonSerialization['consultationStartTime'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['consultationStartTime'],
            ),
      completionTime: jsonSerialization['completionTime'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['completionTime'],
            ),
      delayReason: jsonSerialization['delayReason'] as String?,
      isBuffer: jsonSerialization['isBuffer'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isBuffer']),
      entryType: jsonSerialization['entryType'] as String?,
      skippedAt: jsonSerialization['skippedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['skippedAt']),
      rejoinedAt: jsonSerialization['rejoinedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['rejoinedAt'],
            ),
      reentryPenaltyApplied: jsonSerialization['reentryPenaltyApplied'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(
              jsonSerialization['reentryPenaltyApplied'],
            ),
      reentryPenaltyPositions:
          jsonSerialization['reentryPenaltyPositions'] as int?,
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

  String tokenNumber;

  int sequenceNumber;

  int patientId;

  int? doctorId;

  int departmentId;

  String status;

  String triageLevel;

  int priorityScore;

  String? symptoms;

  int estimatedWaitTimeMinutes;

  DateTime? checkInTime;

  DateTime? callTime;

  DateTime? consultationStartTime;

  DateTime? completionTime;

  String? delayReason;

  bool isBuffer;

  String entryType;

  DateTime? skippedAt;

  DateTime? rejoinedAt;

  bool reentryPenaltyApplied;

  int reentryPenaltyPositions;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [QueueEntry]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  QueueEntry copyWith({
    int? id,
    String? tokenNumber,
    int? sequenceNumber,
    int? patientId,
    int? doctorId,
    int? departmentId,
    String? status,
    String? triageLevel,
    int? priorityScore,
    String? symptoms,
    int? estimatedWaitTimeMinutes,
    DateTime? checkInTime = const _isc.$UndefinedDateTime(),
    DateTime? callTime = const _isc.$UndefinedDateTime(),
    DateTime? consultationStartTime = const _isc.$UndefinedDateTime(),
    DateTime? completionTime = const _isc.$UndefinedDateTime(),
    String? delayReason,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt = const _isc.$UndefinedDateTime(),
    DateTime? rejoinedAt = const _isc.$UndefinedDateTime(),
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'QueueEntry',
      if (id != null) 'id': id,
      'tokenNumber': tokenNumber,
      'sequenceNumber': sequenceNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'status': status,
      'triageLevel': triageLevel,
      'priorityScore': priorityScore,
      if (symptoms != null) 'symptoms': symptoms,
      'estimatedWaitTimeMinutes': estimatedWaitTimeMinutes,
      if (checkInTime != null) 'checkInTime': checkInTime?.toJson(),
      if (callTime != null) 'callTime': callTime?.toJson(),
      if (consultationStartTime != null)
        'consultationStartTime': consultationStartTime?.toJson(),
      if (completionTime != null) 'completionTime': completionTime?.toJson(),
      if (delayReason != null) 'delayReason': delayReason,
      'isBuffer': isBuffer,
      'entryType': entryType,
      if (skippedAt != null) 'skippedAt': skippedAt?.toJson(),
      if (rejoinedAt != null) 'rejoinedAt': rejoinedAt?.toJson(),
      'reentryPenaltyApplied': reentryPenaltyApplied,
      'reentryPenaltyPositions': reentryPenaltyPositions,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'QueueEntry',
      if (id != null) 'id': id,
      'tokenNumber': tokenNumber,
      'sequenceNumber': sequenceNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'status': status,
      'triageLevel': triageLevel,
      'priorityScore': priorityScore,
      if (symptoms != null) 'symptoms': symptoms,
      'estimatedWaitTimeMinutes': estimatedWaitTimeMinutes,
      if (checkInTime != null) 'checkInTime': checkInTime?.toJson(),
      if (callTime != null) 'callTime': callTime?.toJson(),
      if (consultationStartTime != null)
        'consultationStartTime': consultationStartTime?.toJson(),
      if (completionTime != null) 'completionTime': completionTime?.toJson(),
      if (delayReason != null) 'delayReason': delayReason,
      'isBuffer': isBuffer,
      'entryType': entryType,
      if (skippedAt != null) 'skippedAt': skippedAt?.toJson(),
      if (rejoinedAt != null) 'rejoinedAt': rejoinedAt?.toJson(),
      'reentryPenaltyApplied': reentryPenaltyApplied,
      'reentryPenaltyPositions': reentryPenaltyPositions,
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

class _QueueEntryImpl extends QueueEntry {
  _QueueEntryImpl({
    int? id,
    required String tokenNumber,
    required int sequenceNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    String? status,
    String? triageLevel,
    int? priorityScore,
    String? symptoms,
    int? estimatedWaitTimeMinutes,
    DateTime? checkInTime,
    DateTime? callTime,
    DateTime? consultationStartTime,
    DateTime? completionTime,
    String? delayReason,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt,
    DateTime? rejoinedAt,
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         tokenNumber: tokenNumber,
         sequenceNumber: sequenceNumber,
         patientId: patientId,
         doctorId: doctorId,
         departmentId: departmentId,
         status: status,
         triageLevel: triageLevel,
         priorityScore: priorityScore,
         symptoms: symptoms,
         estimatedWaitTimeMinutes: estimatedWaitTimeMinutes,
         checkInTime: checkInTime,
         callTime: callTime,
         consultationStartTime: consultationStartTime,
         completionTime: completionTime,
         delayReason: delayReason,
         isBuffer: isBuffer,
         entryType: entryType,
         skippedAt: skippedAt,
         rejoinedAt: rejoinedAt,
         reentryPenaltyApplied: reentryPenaltyApplied,
         reentryPenaltyPositions: reentryPenaltyPositions,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [QueueEntry]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  QueueEntry copyWith({
    Object? id = _Undefined,
    String? tokenNumber,
    int? sequenceNumber,
    int? patientId,
    Object? doctorId = _Undefined,
    int? departmentId,
    String? status,
    String? triageLevel,
    int? priorityScore,
    Object? symptoms = _Undefined,
    int? estimatedWaitTimeMinutes,
    DateTime? checkInTime = const _isc.$UndefinedDateTime(),
    DateTime? callTime = const _isc.$UndefinedDateTime(),
    DateTime? consultationStartTime = const _isc.$UndefinedDateTime(),
    DateTime? completionTime = const _isc.$UndefinedDateTime(),
    Object? delayReason = _Undefined,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt = const _isc.$UndefinedDateTime(),
    DateTime? rejoinedAt = const _isc.$UndefinedDateTime(),
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return QueueEntry(
      id: id is int? ? id : this.id,
      tokenNumber: tokenNumber ?? this.tokenNumber,
      sequenceNumber: sequenceNumber ?? this.sequenceNumber,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId is int? ? doctorId : this.doctorId,
      departmentId: departmentId ?? this.departmentId,
      status: status ?? this.status,
      triageLevel: triageLevel ?? this.triageLevel,
      priorityScore: priorityScore ?? this.priorityScore,
      symptoms: symptoms is String? ? symptoms : this.symptoms,
      estimatedWaitTimeMinutes:
          estimatedWaitTimeMinutes ?? this.estimatedWaitTimeMinutes,
      checkInTime: checkInTime is _isc.UndefinedSentinel
          ? this.checkInTime
          : checkInTime,
      callTime: callTime is _isc.UndefinedSentinel ? this.callTime : callTime,
      consultationStartTime: consultationStartTime is _isc.UndefinedSentinel
          ? this.consultationStartTime
          : consultationStartTime,
      completionTime: completionTime is _isc.UndefinedSentinel
          ? this.completionTime
          : completionTime,
      delayReason: delayReason is String? ? delayReason : this.delayReason,
      isBuffer: isBuffer ?? this.isBuffer,
      entryType: entryType ?? this.entryType,
      skippedAt: skippedAt is _isc.UndefinedSentinel
          ? this.skippedAt
          : skippedAt,
      rejoinedAt: rejoinedAt is _isc.UndefinedSentinel
          ? this.rejoinedAt
          : rejoinedAt,
      reentryPenaltyApplied:
          reentryPenaltyApplied ?? this.reentryPenaltyApplied,
      reentryPenaltyPositions:
          reentryPenaltyPositions ?? this.reentryPenaltyPositions,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
