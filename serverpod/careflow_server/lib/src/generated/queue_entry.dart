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
import 'dart:async' as _ida;
import 'package:serverpod/serverpod.dart' as _is;

abstract class QueueEntry
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
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
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['checkInTime'],
            ),
      callTime: jsonSerialization['callTime'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['callTime']),
      consultationStartTime: jsonSerialization['consultationStartTime'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['consultationStartTime'],
            ),
      completionTime: jsonSerialization['completionTime'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['completionTime'],
            ),
      delayReason: jsonSerialization['delayReason'] as String?,
      isBuffer: jsonSerialization['isBuffer'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['isBuffer']),
      entryType: jsonSerialization['entryType'] as String?,
      skippedAt: jsonSerialization['skippedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['skippedAt']),
      rejoinedAt: jsonSerialization['rejoinedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['rejoinedAt']),
      reentryPenaltyApplied: jsonSerialization['reentryPenaltyApplied'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(
              jsonSerialization['reentryPenaltyApplied'],
            ),
      reentryPenaltyPositions:
          jsonSerialization['reentryPenaltyPositions'] as int?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = QueueEntryTable();

  static const db = QueueEntryRepository._();

  @override
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

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [QueueEntry]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
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
    DateTime? checkInTime = const _is.$UndefinedDateTime(),
    DateTime? callTime = const _is.$UndefinedDateTime(),
    DateTime? consultationStartTime = const _is.$UndefinedDateTime(),
    DateTime? completionTime = const _is.$UndefinedDateTime(),
    String? delayReason,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt = const _is.$UndefinedDateTime(),
    DateTime? rejoinedAt = const _is.$UndefinedDateTime(),
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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

  static QueueEntryInclude include() {
    return QueueEntryInclude._();
  }

  static QueueEntryIncludeList includeList({
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    QueueEntryInclude? include,
  }) {
    return QueueEntryIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
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
  @_is.useResult
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
    DateTime? checkInTime = const _is.$UndefinedDateTime(),
    DateTime? callTime = const _is.$UndefinedDateTime(),
    DateTime? consultationStartTime = const _is.$UndefinedDateTime(),
    DateTime? completionTime = const _is.$UndefinedDateTime(),
    Object? delayReason = _Undefined,
    bool? isBuffer,
    String? entryType,
    DateTime? skippedAt = const _is.$UndefinedDateTime(),
    DateTime? rejoinedAt = const _is.$UndefinedDateTime(),
    bool? reentryPenaltyApplied,
    int? reentryPenaltyPositions,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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
      checkInTime: checkInTime is _is.UndefinedSentinel
          ? this.checkInTime
          : checkInTime,
      callTime: callTime is _is.UndefinedSentinel ? this.callTime : callTime,
      consultationStartTime: consultationStartTime is _is.UndefinedSentinel
          ? this.consultationStartTime
          : consultationStartTime,
      completionTime: completionTime is _is.UndefinedSentinel
          ? this.completionTime
          : completionTime,
      delayReason: delayReason is String? ? delayReason : this.delayReason,
      isBuffer: isBuffer ?? this.isBuffer,
      entryType: entryType ?? this.entryType,
      skippedAt: skippedAt is _is.UndefinedSentinel
          ? this.skippedAt
          : skippedAt,
      rejoinedAt: rejoinedAt is _is.UndefinedSentinel
          ? this.rejoinedAt
          : rejoinedAt,
      reentryPenaltyApplied:
          reentryPenaltyApplied ?? this.reentryPenaltyApplied,
      reentryPenaltyPositions:
          reentryPenaltyPositions ?? this.reentryPenaltyPositions,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class QueueEntryUpdateTable extends _is.UpdateTable<QueueEntryTable> {
  QueueEntryUpdateTable(super.table);

  _is.ColumnValue<String, String> tokenNumber(String value) => _is.ColumnValue(
    table.tokenNumber,
    value,
  );

  _is.ColumnValue<int, int> sequenceNumber(int value) => _is.ColumnValue(
    table.sequenceNumber,
    value,
  );

  _is.ColumnValue<int, int> patientId(int value) => _is.ColumnValue(
    table.patientId,
    value,
  );

  _is.ColumnValue<int, int> doctorId(int? value) => _is.ColumnValue(
    table.doctorId,
    value,
  );

  _is.ColumnValue<int, int> departmentId(int value) => _is.ColumnValue(
    table.departmentId,
    value,
  );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
    value,
  );

  _is.ColumnValue<String, String> triageLevel(String value) => _is.ColumnValue(
    table.triageLevel,
    value,
  );

  _is.ColumnValue<int, int> priorityScore(int value) => _is.ColumnValue(
    table.priorityScore,
    value,
  );

  _is.ColumnValue<String, String> symptoms(String? value) => _is.ColumnValue(
    table.symptoms,
    value,
  );

  _is.ColumnValue<int, int> estimatedWaitTimeMinutes(int value) =>
      _is.ColumnValue(
        table.estimatedWaitTimeMinutes,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> checkInTime(DateTime? value) =>
      _is.ColumnValue(
        table.checkInTime,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> callTime(DateTime? value) =>
      _is.ColumnValue(
        table.callTime,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> consultationStartTime(DateTime? value) =>
      _is.ColumnValue(
        table.consultationStartTime,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> completionTime(DateTime? value) =>
      _is.ColumnValue(
        table.completionTime,
        value,
      );

  _is.ColumnValue<String, String> delayReason(String? value) => _is.ColumnValue(
    table.delayReason,
    value,
  );

  _is.ColumnValue<bool, bool> isBuffer(bool value) => _is.ColumnValue(
    table.isBuffer,
    value,
  );

  _is.ColumnValue<String, String> entryType(String value) => _is.ColumnValue(
    table.entryType,
    value,
  );

  _is.ColumnValue<DateTime, DateTime> skippedAt(DateTime? value) =>
      _is.ColumnValue(
        table.skippedAt,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> rejoinedAt(DateTime? value) =>
      _is.ColumnValue(
        table.rejoinedAt,
        value,
      );

  _is.ColumnValue<bool, bool> reentryPenaltyApplied(bool value) =>
      _is.ColumnValue(
        table.reentryPenaltyApplied,
        value,
      );

  _is.ColumnValue<int, int> reentryPenaltyPositions(int value) =>
      _is.ColumnValue(
        table.reentryPenaltyPositions,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> createdAt(DateTime? value) =>
      _is.ColumnValue(
        table.createdAt,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> updatedAt(DateTime? value) =>
      _is.ColumnValue(
        table.updatedAt,
        value,
      );
}

class QueueEntryTable extends _is.Table<int?> {
  QueueEntryTable({super.tableRelation}) : super(tableName: 'careflow_queue') {
    updateTable = QueueEntryUpdateTable(this);
    tokenNumber = _is.ColumnString(
      'tokenNumber',
      this,
    );
    sequenceNumber = _is.ColumnInt(
      'sequenceNumber',
      this,
    );
    patientId = _is.ColumnInt(
      'patientId',
      this,
    );
    doctorId = _is.ColumnInt(
      'doctorId',
      this,
    );
    departmentId = _is.ColumnInt(
      'departmentId',
      this,
    );
    status = _is.ColumnString(
      'status',
      this,
      hasDefault: true,
    );
    triageLevel = _is.ColumnString(
      'triageLevel',
      this,
      hasDefault: true,
    );
    priorityScore = _is.ColumnInt(
      'priorityScore',
      this,
      hasDefault: true,
    );
    symptoms = _is.ColumnString(
      'symptoms',
      this,
    );
    estimatedWaitTimeMinutes = _is.ColumnInt(
      'estimatedWaitTimeMinutes',
      this,
      hasDefault: true,
    );
    checkInTime = _is.ColumnDateTime(
      'checkInTime',
      this,
    );
    callTime = _is.ColumnDateTime(
      'callTime',
      this,
    );
    consultationStartTime = _is.ColumnDateTime(
      'consultationStartTime',
      this,
    );
    completionTime = _is.ColumnDateTime(
      'completionTime',
      this,
    );
    delayReason = _is.ColumnString(
      'delayReason',
      this,
    );
    isBuffer = _is.ColumnBool(
      'isBuffer',
      this,
      hasDefault: true,
    );
    entryType = _is.ColumnString(
      'entryType',
      this,
      hasDefault: true,
    );
    skippedAt = _is.ColumnDateTime(
      'skippedAt',
      this,
    );
    rejoinedAt = _is.ColumnDateTime(
      'rejoinedAt',
      this,
    );
    reentryPenaltyApplied = _is.ColumnBool(
      'reentryPenaltyApplied',
      this,
      hasDefault: true,
    );
    reentryPenaltyPositions = _is.ColumnInt(
      'reentryPenaltyPositions',
      this,
      hasDefault: true,
    );
    createdAt = _is.ColumnDateTime(
      'createdAt',
      this,
    );
    updatedAt = _is.ColumnDateTime(
      'updatedAt',
      this,
    );
  }

  late final QueueEntryUpdateTable updateTable;

  late final _is.ColumnString tokenNumber;

  late final _is.ColumnInt sequenceNumber;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnInt departmentId;

  late final _is.ColumnString status;

  late final _is.ColumnString triageLevel;

  late final _is.ColumnInt priorityScore;

  late final _is.ColumnString symptoms;

  late final _is.ColumnInt estimatedWaitTimeMinutes;

  late final _is.ColumnDateTime checkInTime;

  late final _is.ColumnDateTime callTime;

  late final _is.ColumnDateTime consultationStartTime;

  late final _is.ColumnDateTime completionTime;

  late final _is.ColumnString delayReason;

  late final _is.ColumnBool isBuffer;

  late final _is.ColumnString entryType;

  late final _is.ColumnDateTime skippedAt;

  late final _is.ColumnDateTime rejoinedAt;

  late final _is.ColumnBool reentryPenaltyApplied;

  late final _is.ColumnInt reentryPenaltyPositions;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    tokenNumber,
    sequenceNumber,
    patientId,
    doctorId,
    departmentId,
    status,
    triageLevel,
    priorityScore,
    symptoms,
    estimatedWaitTimeMinutes,
    checkInTime,
    callTime,
    consultationStartTime,
    completionTime,
    delayReason,
    isBuffer,
    entryType,
    skippedAt,
    rejoinedAt,
    reentryPenaltyApplied,
    reentryPenaltyPositions,
    createdAt,
    updatedAt,
  ];
}

class QueueEntryInclude extends _is.IncludeObject {
  QueueEntryInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => QueueEntry.t;
}

class QueueEntryIncludeList extends _is.IncludeList {
  QueueEntryIncludeList._({
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(QueueEntry.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => QueueEntry.t;
}

class QueueEntryRepository {
  const QueueEntryRepository._();

  /// Returns a list of [QueueEntry]s matching the given query parameters.
  ///
  /// Use [where] to specify which items to include in the return value.
  /// If none is specified, all items will be returned.
  ///
  /// To specify the order of the items use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// The maximum number of items can be set by [limit]. If no limit is set,
  /// all items matching the query will be returned.
  ///
  /// [offset] defines how many items to skip, after which [limit] (or all)
  /// items are read from the database.
  ///
  /// ```dart
  /// var persons = await Persons.db.find(
  ///   session,
  ///   where: (t) => t.lastName.equals('Jones'),
  ///   orderBy: (t) => t.firstName,
  ///   limit: 100,
  /// );
  /// ```
  Future<List<QueueEntry>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<QueueEntry>(
      where: where?.call(QueueEntry.t),
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [QueueEntry]s matching the given query parameters every time the
  /// source tables are modified.
  ///
  /// Use [where] to specify which items to include in the return value.
  /// If none is specified, all items will be returned.
  ///
  /// To specify the order of the items use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// The maximum number of items can be set by [limit]. If no limit is set,
  /// all items matching the query will be returned.
  ///
  /// [offset] defines how many items to skip, after which [limit] (or all)
  /// items are read from the database.
  ///
  /// Use [throttle] to specify the minimum interval between queries. It can
  /// also be set to `null`, in which case the stream will only be throttled
  /// when its subscription is paused.
  ///
  /// Source tables are collected from the queried table, [where], [orderBy],
  /// [orderByList], and the [include] graph. [alsoTriggerOnTables] is added
  /// to that set. Pass [Table] instances such as `QueueEntry.t`.
  ///
  /// Raw [Expression] SQL is not inspected. Tables referenced only in raw
  /// SQL must be passed via [alsoTriggerOnTables].
  ///
  /// The stream always reads committed state and never joins an ambient
  /// [Transaction]. Emissions for a write fire after that write commits.
  ///
  /// Currently only supported on SQLite. Calling this method on PostgreSQL
  /// throws an [UnsupportedError].
  ///
  /// ```dart
  /// var subscription = Persons.db.watch(
  ///   session,
  ///   where: (t) => t.lastName.equals('Jones'),
  ///   orderBy: (t) => t.firstName,
  ///   limit: 100,
  /// ).listen((persons) {
  ///   // Handle the latest matching rows.
  /// });
  /// ```
  _ida.Stream<List<QueueEntry>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<QueueEntry>(
      where: where?.call(QueueEntry.t),
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [QueueEntry] matching the given query parameters.
  ///
  /// Use [where] to specify which items to include in the return value.
  /// If none is specified, all items will be returned.
  ///
  /// To specify the order use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// [offset] defines how many items to skip, after which the next one will be picked.
  ///
  /// ```dart
  /// var youngestPerson = await Persons.db.findFirstRow(
  ///   session,
  ///   where: (t) => t.lastName.equals('Jones'),
  ///   orderBy: (t) => t.age,
  /// );
  /// ```
  Future<QueueEntry?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    int? offset,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<QueueEntry>(
      where: where?.call(QueueEntry.t),
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [QueueEntry] by its [id] or null if no such row exists.
  Future<QueueEntry?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<QueueEntry>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [QueueEntry]s in the list and returns the inserted rows.
  ///
  /// The returned [QueueEntry]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// insert, none of the rows will be inserted.
  ///
  /// If [ignoreConflicts] is set to `true`, rows that conflict with existing
  /// rows are silently skipped, and only the successfully inserted rows are
  /// returned.
  ///
  /// If [noReturn] is set to `true`, the inserted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> insert(
    _is.DatabaseSession session,
    List<QueueEntry> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<QueueEntry>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [QueueEntry] and returns the inserted row.
  ///
  /// The returned [QueueEntry] will have its `id` field set.
  Future<QueueEntry> insertRow(
    _is.DatabaseSession session,
    QueueEntry row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<QueueEntry>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [QueueEntry]s in the list and returns the resulting rows.
  ///
  /// If a row conflicts on the given [conflictColumns], the existing row is
  /// updated with the new values. Otherwise, a new row is inserted.
  ///
  /// If [updateColumns] is provided, only those columns will be updated on
  /// conflict. If null, all non-conflict, non-id columns are updated.
  ///
  /// If [updateWhere] is provided, the update only applies to rows matching the
  /// given expression. Conflicting rows that don't match are skipped and not
  /// returned, so the resulting list may be shorter than [rows].
  ///
  /// The returned [QueueEntry]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> upsert(
    _is.DatabaseSession session,
    List<QueueEntry> rows, {
    required _is.ColumnSelections<QueueEntryTable> conflictColumns,
    _is.ColumnSelections<QueueEntryTable>? updateColumns,
    _is.WhereExpressionBuilder<QueueEntryTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<QueueEntry>(
      rows,
      conflictColumns: conflictColumns(QueueEntry.t),
      updateColumns: updateColumns?.call(QueueEntry.t),
      updateWhere: updateWhere?.call(QueueEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [QueueEntry] and returns the resulting row.
  ///
  /// If the row conflicts on the given [conflictColumns], the existing row is
  /// updated. Otherwise, a new row is inserted.
  ///
  /// If [updateColumns] is provided, only those columns will be updated on
  /// conflict. If null, all non-conflict, non-id columns are updated.
  ///
  /// If [updateWhere] is provided, the update only applies when the existing
  /// row matches the expression. Returns `null` if no row was affected — for
  /// example when [updateWhere] does not match the conflicting row.
  ///
  /// The returned [QueueEntry] will have its `id` field set.
  Future<QueueEntry?> upsertRow(
    _is.DatabaseSession session,
    QueueEntry row, {
    required _is.ColumnSelections<QueueEntryTable> conflictColumns,
    _is.ColumnSelections<QueueEntryTable>? updateColumns,
    _is.WhereExpressionBuilder<QueueEntryTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<QueueEntry>(
      row,
      conflictColumns: conflictColumns(QueueEntry.t),
      updateColumns: updateColumns?.call(QueueEntry.t),
      updateWhere: updateWhere?.call(QueueEntry.t),
      transaction: transaction,
    );
  }

  /// Updates all [QueueEntry]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> update(
    _is.DatabaseSession session,
    List<QueueEntry> rows, {
    _is.ColumnSelections<QueueEntryTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<QueueEntry>(
      rows,
      columns: columns?.call(QueueEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [QueueEntry]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<QueueEntry> updateRow(
    _is.DatabaseSession session,
    QueueEntry row, {
    _is.ColumnSelections<QueueEntryTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<QueueEntry>(
      row,
      columns: columns?.call(QueueEntry.t),
      transaction: transaction,
    );
  }

  /// Updates a single [QueueEntry] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<QueueEntry?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<QueueEntryUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<QueueEntry>(
      id,
      columnValues: columnValues(QueueEntry.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [QueueEntry]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<QueueEntryUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<QueueEntryTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<QueueEntry>(
      columnValues: columnValues(QueueEntry.t.updateTable),
      where: where(QueueEntry.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [QueueEntry]s in the list and returns the deleted rows.
  ///
  /// To specify the order of the returned rows use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// This is an atomic operation, meaning that if one of the rows fail to
  /// be deleted, none of the rows will be deleted.
  ///
  /// If [noReturn] is set to `true`, the deleted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> delete(
    _is.DatabaseSession session,
    List<QueueEntry> rows, {
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<QueueEntry>(
      rows,
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [QueueEntry].
  Future<QueueEntry> deleteRow(
    _is.DatabaseSession session,
    QueueEntry row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<QueueEntry>(
      row,
      transaction: transaction,
    );
  }

  /// Deletes all rows matching the [where] expression.
  ///
  /// To specify the order of the returned rows use [orderBy] or [orderByList]
  /// when sorting by multiple columns.
  ///
  /// If [noReturn] is set to `true`, the deleted rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<QueueEntry>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<QueueEntryTable> where,
    _is.OrderByBuilder<QueueEntryTable>? orderBy,
    _is.OrderByListBuilder<QueueEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<QueueEntry>(
      where: where(QueueEntry.t),
      orderBy: orderBy?.call(QueueEntry.t),
      orderByList: orderByList?.call(QueueEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<QueueEntryTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<QueueEntry>(
      where: where?.call(QueueEntry.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [QueueEntry] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<QueueEntryTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<QueueEntry>(
      where: where(QueueEntry.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
