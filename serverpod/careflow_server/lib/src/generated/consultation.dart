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

abstract class Consultation
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
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
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['followUpDate'],
            ),
      status: jsonSerialization['status'] as String?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = ConsultationTable();

  static const db = ConsultationRepository._();

  @override
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

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [Consultation]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
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
    DateTime? followUpDate = const _is.$UndefinedDateTime(),
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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

  static ConsultationInclude include() {
    return ConsultationInclude._();
  }

  static ConsultationIncludeList includeList({
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    ConsultationInclude? include,
  }) {
    return ConsultationIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
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
  @_is.useResult
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
    DateTime? followUpDate = const _is.$UndefinedDateTime(),
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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
      followUpDate: followUpDate is _is.UndefinedSentinel
          ? this.followUpDate
          : followUpDate,
      status: status ?? this.status,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class ConsultationUpdateTable extends _is.UpdateTable<ConsultationTable> {
  ConsultationUpdateTable(super.table);

  _is.ColumnValue<String, String> consultationId(String value) =>
      _is.ColumnValue(
        table.consultationId,
        value,
      );

  _is.ColumnValue<int, int> patientId(int value) => _is.ColumnValue(
    table.patientId,
    value,
  );

  _is.ColumnValue<int, int> doctorId(int value) => _is.ColumnValue(
    table.doctorId,
    value,
  );

  _is.ColumnValue<int, int> departmentId(int value) => _is.ColumnValue(
    table.departmentId,
    value,
  );

  _is.ColumnValue<int, int> queueId(int? value) => _is.ColumnValue(
    table.queueId,
    value,
  );

  _is.ColumnValue<String, String> chiefComplaints(String value) =>
      _is.ColumnValue(
        table.chiefComplaints,
        value,
      );

  _is.ColumnValue<String, String> clinicalObservations(String? value) =>
      _is.ColumnValue(
        table.clinicalObservations,
        value,
      );

  _is.ColumnValue<String, String> diagnosis(String value) => _is.ColumnValue(
    table.diagnosis,
    value,
  );

  _is.ColumnValue<String, String> bp(String? value) => _is.ColumnValue(
    table.bp,
    value,
  );

  _is.ColumnValue<String, String> pulse(String? value) => _is.ColumnValue(
    table.pulse,
    value,
  );

  _is.ColumnValue<String, String> temperature(String? value) => _is.ColumnValue(
    table.temperature,
    value,
  );

  _is.ColumnValue<String, String> spO2(String? value) => _is.ColumnValue(
    table.spO2,
    value,
  );

  _is.ColumnValue<String, String> weight(String? value) => _is.ColumnValue(
    table.weight,
    value,
  );

  _is.ColumnValue<String, String> clinicalNotes(String? value) =>
      _is.ColumnValue(
        table.clinicalNotes,
        value,
      );

  _is.ColumnValue<DateTime, DateTime> followUpDate(DateTime? value) =>
      _is.ColumnValue(
        table.followUpDate,
        value,
      );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
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

class ConsultationTable extends _is.Table<int?> {
  ConsultationTable({super.tableRelation})
    : super(tableName: 'careflow_consultations') {
    updateTable = ConsultationUpdateTable(this);
    consultationId = _is.ColumnString(
      'consultationId',
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
    queueId = _is.ColumnInt(
      'queueId',
      this,
    );
    chiefComplaints = _is.ColumnString(
      'chiefComplaints',
      this,
    );
    clinicalObservations = _is.ColumnString(
      'clinicalObservations',
      this,
    );
    diagnosis = _is.ColumnString(
      'diagnosis',
      this,
    );
    bp = _is.ColumnString(
      'bp',
      this,
    );
    pulse = _is.ColumnString(
      'pulse',
      this,
    );
    temperature = _is.ColumnString(
      'temperature',
      this,
    );
    spO2 = _is.ColumnString(
      'spO2',
      this,
    );
    weight = _is.ColumnString(
      'weight',
      this,
    );
    clinicalNotes = _is.ColumnString(
      'clinicalNotes',
      this,
    );
    followUpDate = _is.ColumnDateTime(
      'followUpDate',
      this,
    );
    status = _is.ColumnString(
      'status',
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

  late final ConsultationUpdateTable updateTable;

  late final _is.ColumnString consultationId;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnInt departmentId;

  late final _is.ColumnInt queueId;

  late final _is.ColumnString chiefComplaints;

  late final _is.ColumnString clinicalObservations;

  late final _is.ColumnString diagnosis;

  late final _is.ColumnString bp;

  late final _is.ColumnString pulse;

  late final _is.ColumnString temperature;

  late final _is.ColumnString spO2;

  late final _is.ColumnString weight;

  late final _is.ColumnString clinicalNotes;

  late final _is.ColumnDateTime followUpDate;

  late final _is.ColumnString status;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    consultationId,
    patientId,
    doctorId,
    departmentId,
    queueId,
    chiefComplaints,
    clinicalObservations,
    diagnosis,
    bp,
    pulse,
    temperature,
    spO2,
    weight,
    clinicalNotes,
    followUpDate,
    status,
    createdAt,
    updatedAt,
  ];
}

class ConsultationInclude extends _is.IncludeObject {
  ConsultationInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => Consultation.t;
}

class ConsultationIncludeList extends _is.IncludeList {
  ConsultationIncludeList._({
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(Consultation.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => Consultation.t;
}

class ConsultationRepository {
  const ConsultationRepository._();

  /// Returns a list of [Consultation]s matching the given query parameters.
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
  Future<List<Consultation>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<Consultation>(
      where: where?.call(Consultation.t),
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [Consultation]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `Consultation.t`.
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
  _ida.Stream<List<Consultation>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<Consultation>(
      where: where?.call(Consultation.t),
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [Consultation] matching the given query parameters.
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
  Future<Consultation?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    int? offset,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<Consultation>(
      where: where?.call(Consultation.t),
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [Consultation] by its [id] or null if no such row exists.
  Future<Consultation?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<Consultation>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [Consultation]s in the list and returns the inserted rows.
  ///
  /// The returned [Consultation]s will have their `id` fields set.
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
  Future<List<Consultation>> insert(
    _is.DatabaseSession session,
    List<Consultation> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<Consultation>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [Consultation] and returns the inserted row.
  ///
  /// The returned [Consultation] will have its `id` field set.
  Future<Consultation> insertRow(
    _is.DatabaseSession session,
    Consultation row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<Consultation>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [Consultation]s in the list and returns the resulting rows.
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
  /// The returned [Consultation]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Consultation>> upsert(
    _is.DatabaseSession session,
    List<Consultation> rows, {
    required _is.ColumnSelections<ConsultationTable> conflictColumns,
    _is.ColumnSelections<ConsultationTable>? updateColumns,
    _is.WhereExpressionBuilder<ConsultationTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<Consultation>(
      rows,
      conflictColumns: conflictColumns(Consultation.t),
      updateColumns: updateColumns?.call(Consultation.t),
      updateWhere: updateWhere?.call(Consultation.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [Consultation] and returns the resulting row.
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
  /// The returned [Consultation] will have its `id` field set.
  Future<Consultation?> upsertRow(
    _is.DatabaseSession session,
    Consultation row, {
    required _is.ColumnSelections<ConsultationTable> conflictColumns,
    _is.ColumnSelections<ConsultationTable>? updateColumns,
    _is.WhereExpressionBuilder<ConsultationTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<Consultation>(
      row,
      conflictColumns: conflictColumns(Consultation.t),
      updateColumns: updateColumns?.call(Consultation.t),
      updateWhere: updateWhere?.call(Consultation.t),
      transaction: transaction,
    );
  }

  /// Updates all [Consultation]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Consultation>> update(
    _is.DatabaseSession session,
    List<Consultation> rows, {
    _is.ColumnSelections<ConsultationTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<Consultation>(
      rows,
      columns: columns?.call(Consultation.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [Consultation]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<Consultation> updateRow(
    _is.DatabaseSession session,
    Consultation row, {
    _is.ColumnSelections<ConsultationTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<Consultation>(
      row,
      columns: columns?.call(Consultation.t),
      transaction: transaction,
    );
  }

  /// Updates a single [Consultation] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<Consultation?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<ConsultationUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<Consultation>(
      id,
      columnValues: columnValues(Consultation.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [Consultation]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Consultation>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<ConsultationUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<ConsultationTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<Consultation>(
      columnValues: columnValues(Consultation.t.updateTable),
      where: where(Consultation.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [Consultation]s in the list and returns the deleted rows.
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
  Future<List<Consultation>> delete(
    _is.DatabaseSession session,
    List<Consultation> rows, {
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<Consultation>(
      rows,
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [Consultation].
  Future<Consultation> deleteRow(
    _is.DatabaseSession session,
    Consultation row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<Consultation>(
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
  Future<List<Consultation>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<ConsultationTable> where,
    _is.OrderByBuilder<ConsultationTable>? orderBy,
    _is.OrderByListBuilder<ConsultationTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<Consultation>(
      where: where(Consultation.t),
      orderBy: orderBy?.call(Consultation.t),
      orderByList: orderByList?.call(Consultation.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<ConsultationTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<Consultation>(
      where: where?.call(Consultation.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [Consultation] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<ConsultationTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<Consultation>(
      where: where(Consultation.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
