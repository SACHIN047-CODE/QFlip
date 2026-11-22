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

abstract class LabTest
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  LabTest._({
    this.id,
    required this.testRequestId,
    this.consultationId,
    required this.patientId,
    required this.doctorId,
    String? testCategory,
    required this.testName,
    String? priority,
    String? status,
    this.sampleCollectedAt,
    this.resultSummary,
    this.reportUrl,
    this.completedAt,
    this.createdAt,
    this.updatedAt,
  }) : testCategory = testCategory ?? 'Hematology',
       priority = priority ?? 'routine',
       status = status ?? 'requested';

  factory LabTest({
    int? id,
    required String testRequestId,
    int? consultationId,
    required int patientId,
    required int doctorId,
    String? testCategory,
    required String testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt,
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _LabTestImpl;

  factory LabTest.fromJson(Map<String, dynamic> jsonSerialization) {
    return LabTest(
      id: jsonSerialization['id'] as int?,
      testRequestId: jsonSerialization['testRequestId'] as String,
      consultationId: jsonSerialization['consultationId'] as int?,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int,
      testCategory: jsonSerialization['testCategory'] as String?,
      testName: jsonSerialization['testName'] as String,
      priority: jsonSerialization['priority'] as String?,
      status: jsonSerialization['status'] as String?,
      sampleCollectedAt: jsonSerialization['sampleCollectedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['sampleCollectedAt'],
            ),
      resultSummary: jsonSerialization['resultSummary'] as String?,
      reportUrl: jsonSerialization['reportUrl'] as String?,
      completedAt: jsonSerialization['completedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['completedAt'],
            ),
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = LabTestTable();

  static const db = LabTestRepository._();

  @override
  int? id;

  String testRequestId;

  int? consultationId;

  int patientId;

  int doctorId;

  String testCategory;

  String testName;

  String priority;

  String status;

  DateTime? sampleCollectedAt;

  String? resultSummary;

  String? reportUrl;

  DateTime? completedAt;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [LabTest]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  LabTest copyWith({
    int? id,
    String? testRequestId,
    int? consultationId,
    int? patientId,
    int? doctorId,
    String? testCategory,
    String? testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt = const _is.$UndefinedDateTime(),
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LabTest',
      if (id != null) 'id': id,
      'testRequestId': testRequestId,
      if (consultationId != null) 'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'testCategory': testCategory,
      'testName': testName,
      'priority': priority,
      'status': status,
      if (sampleCollectedAt != null)
        'sampleCollectedAt': sampleCollectedAt?.toJson(),
      if (resultSummary != null) 'resultSummary': resultSummary,
      if (reportUrl != null) 'reportUrl': reportUrl,
      if (completedAt != null) 'completedAt': completedAt?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LabTest',
      if (id != null) 'id': id,
      'testRequestId': testRequestId,
      if (consultationId != null) 'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'testCategory': testCategory,
      'testName': testName,
      'priority': priority,
      'status': status,
      if (sampleCollectedAt != null)
        'sampleCollectedAt': sampleCollectedAt?.toJson(),
      if (resultSummary != null) 'resultSummary': resultSummary,
      if (reportUrl != null) 'reportUrl': reportUrl,
      if (completedAt != null) 'completedAt': completedAt?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static LabTestInclude include() {
    return LabTestInclude._();
  }

  static LabTestIncludeList includeList({
    _is.WhereExpressionBuilder<LabTestTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    LabTestInclude? include,
  }) {
    return LabTestIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _LabTestImpl extends LabTest {
  _LabTestImpl({
    int? id,
    required String testRequestId,
    int? consultationId,
    required int patientId,
    required int doctorId,
    String? testCategory,
    required String testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt,
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         testRequestId: testRequestId,
         consultationId: consultationId,
         patientId: patientId,
         doctorId: doctorId,
         testCategory: testCategory,
         testName: testName,
         priority: priority,
         status: status,
         sampleCollectedAt: sampleCollectedAt,
         resultSummary: resultSummary,
         reportUrl: reportUrl,
         completedAt: completedAt,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [LabTest]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  LabTest copyWith({
    Object? id = _Undefined,
    String? testRequestId,
    Object? consultationId = _Undefined,
    int? patientId,
    int? doctorId,
    String? testCategory,
    String? testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt = const _is.$UndefinedDateTime(),
    Object? resultSummary = _Undefined,
    Object? reportUrl = _Undefined,
    DateTime? completedAt = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return LabTest(
      id: id is int? ? id : this.id,
      testRequestId: testRequestId ?? this.testRequestId,
      consultationId: consultationId is int?
          ? consultationId
          : this.consultationId,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId ?? this.doctorId,
      testCategory: testCategory ?? this.testCategory,
      testName: testName ?? this.testName,
      priority: priority ?? this.priority,
      status: status ?? this.status,
      sampleCollectedAt: sampleCollectedAt is _is.UndefinedSentinel
          ? this.sampleCollectedAt
          : sampleCollectedAt,
      resultSummary: resultSummary is String?
          ? resultSummary
          : this.resultSummary,
      reportUrl: reportUrl is String? ? reportUrl : this.reportUrl,
      completedAt: completedAt is _is.UndefinedSentinel
          ? this.completedAt
          : completedAt,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class LabTestUpdateTable extends _is.UpdateTable<LabTestTable> {
  LabTestUpdateTable(super.table);

  _is.ColumnValue<String, String> testRequestId(String value) =>
      _is.ColumnValue(
        table.testRequestId,
        value,
      );

  _is.ColumnValue<int, int> consultationId(int? value) => _is.ColumnValue(
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

  _is.ColumnValue<String, String> testCategory(String value) => _is.ColumnValue(
    table.testCategory,
    value,
  );

  _is.ColumnValue<String, String> testName(String value) => _is.ColumnValue(
    table.testName,
    value,
  );

  _is.ColumnValue<String, String> priority(String value) => _is.ColumnValue(
    table.priority,
    value,
  );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
    value,
  );

  _is.ColumnValue<DateTime, DateTime> sampleCollectedAt(DateTime? value) =>
      _is.ColumnValue(
        table.sampleCollectedAt,
        value,
      );

  _is.ColumnValue<String, String> resultSummary(String? value) =>
      _is.ColumnValue(
        table.resultSummary,
        value,
      );

  _is.ColumnValue<String, String> reportUrl(String? value) => _is.ColumnValue(
    table.reportUrl,
    value,
  );

  _is.ColumnValue<DateTime, DateTime> completedAt(DateTime? value) =>
      _is.ColumnValue(
        table.completedAt,
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

class LabTestTable extends _is.Table<int?> {
  LabTestTable({super.tableRelation}) : super(tableName: 'careflow_lab_tests') {
    updateTable = LabTestUpdateTable(this);
    testRequestId = _is.ColumnString(
      'testRequestId',
      this,
    );
    consultationId = _is.ColumnInt(
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
    testCategory = _is.ColumnString(
      'testCategory',
      this,
      hasDefault: true,
    );
    testName = _is.ColumnString(
      'testName',
      this,
    );
    priority = _is.ColumnString(
      'priority',
      this,
      hasDefault: true,
    );
    status = _is.ColumnString(
      'status',
      this,
      hasDefault: true,
    );
    sampleCollectedAt = _is.ColumnDateTime(
      'sampleCollectedAt',
      this,
    );
    resultSummary = _is.ColumnString(
      'resultSummary',
      this,
    );
    reportUrl = _is.ColumnString(
      'reportUrl',
      this,
    );
    completedAt = _is.ColumnDateTime(
      'completedAt',
      this,
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

  late final LabTestUpdateTable updateTable;

  late final _is.ColumnString testRequestId;

  late final _is.ColumnInt consultationId;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnString testCategory;

  late final _is.ColumnString testName;

  late final _is.ColumnString priority;

  late final _is.ColumnString status;

  late final _is.ColumnDateTime sampleCollectedAt;

  late final _is.ColumnString resultSummary;

  late final _is.ColumnString reportUrl;

  late final _is.ColumnDateTime completedAt;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    testRequestId,
    consultationId,
    patientId,
    doctorId,
    testCategory,
    testName,
    priority,
    status,
    sampleCollectedAt,
    resultSummary,
    reportUrl,
    completedAt,
    createdAt,
    updatedAt,
  ];
}

class LabTestInclude extends _is.IncludeObject {
  LabTestInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => LabTest.t;
}

class LabTestIncludeList extends _is.IncludeList {
  LabTestIncludeList._({
    _is.WhereExpressionBuilder<LabTestTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(LabTest.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => LabTest.t;
}

class LabTestRepository {
  const LabTestRepository._();

  /// Returns a list of [LabTest]s matching the given query parameters.
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
  Future<List<LabTest>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<LabTestTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<LabTest>(
      where: where?.call(LabTest.t),
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [LabTest]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `LabTest.t`.
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
  _ida.Stream<List<LabTest>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<LabTestTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<LabTest>(
      where: where?.call(LabTest.t),
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [LabTest] matching the given query parameters.
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
  Future<LabTest?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<LabTestTable>? where,
    int? offset,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<LabTest>(
      where: where?.call(LabTest.t),
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [LabTest] by its [id] or null if no such row exists.
  Future<LabTest?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<LabTest>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [LabTest]s in the list and returns the inserted rows.
  ///
  /// The returned [LabTest]s will have their `id` fields set.
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
  Future<List<LabTest>> insert(
    _is.DatabaseSession session,
    List<LabTest> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<LabTest>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [LabTest] and returns the inserted row.
  ///
  /// The returned [LabTest] will have its `id` field set.
  Future<LabTest> insertRow(
    _is.DatabaseSession session,
    LabTest row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<LabTest>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [LabTest]s in the list and returns the resulting rows.
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
  /// The returned [LabTest]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LabTest>> upsert(
    _is.DatabaseSession session,
    List<LabTest> rows, {
    required _is.ColumnSelections<LabTestTable> conflictColumns,
    _is.ColumnSelections<LabTestTable>? updateColumns,
    _is.WhereExpressionBuilder<LabTestTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<LabTest>(
      rows,
      conflictColumns: conflictColumns(LabTest.t),
      updateColumns: updateColumns?.call(LabTest.t),
      updateWhere: updateWhere?.call(LabTest.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [LabTest] and returns the resulting row.
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
  /// The returned [LabTest] will have its `id` field set.
  Future<LabTest?> upsertRow(
    _is.DatabaseSession session,
    LabTest row, {
    required _is.ColumnSelections<LabTestTable> conflictColumns,
    _is.ColumnSelections<LabTestTable>? updateColumns,
    _is.WhereExpressionBuilder<LabTestTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<LabTest>(
      row,
      conflictColumns: conflictColumns(LabTest.t),
      updateColumns: updateColumns?.call(LabTest.t),
      updateWhere: updateWhere?.call(LabTest.t),
      transaction: transaction,
    );
  }

  /// Updates all [LabTest]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LabTest>> update(
    _is.DatabaseSession session,
    List<LabTest> rows, {
    _is.ColumnSelections<LabTestTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<LabTest>(
      rows,
      columns: columns?.call(LabTest.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [LabTest]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<LabTest> updateRow(
    _is.DatabaseSession session,
    LabTest row, {
    _is.ColumnSelections<LabTestTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<LabTest>(
      row,
      columns: columns?.call(LabTest.t),
      transaction: transaction,
    );
  }

  /// Updates a single [LabTest] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<LabTest?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<LabTestUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<LabTest>(
      id,
      columnValues: columnValues(LabTest.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [LabTest]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<LabTest>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<LabTestUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<LabTestTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<LabTest>(
      columnValues: columnValues(LabTest.t.updateTable),
      where: where(LabTest.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [LabTest]s in the list and returns the deleted rows.
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
  Future<List<LabTest>> delete(
    _is.DatabaseSession session,
    List<LabTest> rows, {
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<LabTest>(
      rows,
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [LabTest].
  Future<LabTest> deleteRow(
    _is.DatabaseSession session,
    LabTest row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<LabTest>(
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
  Future<List<LabTest>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<LabTestTable> where,
    _is.OrderByBuilder<LabTestTable>? orderBy,
    _is.OrderByListBuilder<LabTestTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<LabTest>(
      where: where(LabTest.t),
      orderBy: orderBy?.call(LabTest.t),
      orderByList: orderByList?.call(LabTest.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<LabTestTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<LabTest>(
      where: where?.call(LabTest.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [LabTest] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<LabTestTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<LabTest>(
      where: where(LabTest.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
