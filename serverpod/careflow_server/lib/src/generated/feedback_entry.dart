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

abstract class FeedbackEntry
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  FeedbackEntry._({
    this.id,
    this.patientId,
    this.departmentId,
    this.doctorId,
    required this.rating,
    String? category,
    this.comments,
    required this.ticketId,
    String? status,
    this.resolutionNote,
    bool? isAnonymous,
    this.createdAt,
    this.updatedAt,
  }) : category = category ?? 'overall',
       status = status ?? 'open',
       isAnonymous = isAnonymous ?? false;

  factory FeedbackEntry({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    required int rating,
    String? category,
    String? comments,
    required String ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _FeedbackEntryImpl;

  factory FeedbackEntry.fromJson(Map<String, dynamic> jsonSerialization) {
    return FeedbackEntry(
      id: jsonSerialization['id'] as int?,
      patientId: jsonSerialization['patientId'] as int?,
      departmentId: jsonSerialization['departmentId'] as int?,
      doctorId: jsonSerialization['doctorId'] as int?,
      rating: jsonSerialization['rating'] as int,
      category: jsonSerialization['category'] as String?,
      comments: jsonSerialization['comments'] as String?,
      ticketId: jsonSerialization['ticketId'] as String,
      status: jsonSerialization['status'] as String?,
      resolutionNote: jsonSerialization['resolutionNote'] as String?,
      isAnonymous: jsonSerialization['isAnonymous'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['isAnonymous']),
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = FeedbackEntryTable();

  static const db = FeedbackEntryRepository._();

  @override
  int? id;

  int? patientId;

  int? departmentId;

  int? doctorId;

  int rating;

  String category;

  String? comments;

  String ticketId;

  String status;

  String? resolutionNote;

  bool isAnonymous;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [FeedbackEntry]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  FeedbackEntry copyWith({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    int? rating,
    String? category,
    String? comments,
    String? ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'FeedbackEntry',
      if (id != null) 'id': id,
      if (patientId != null) 'patientId': patientId,
      if (departmentId != null) 'departmentId': departmentId,
      if (doctorId != null) 'doctorId': doctorId,
      'rating': rating,
      'category': category,
      if (comments != null) 'comments': comments,
      'ticketId': ticketId,
      'status': status,
      if (resolutionNote != null) 'resolutionNote': resolutionNote,
      'isAnonymous': isAnonymous,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'FeedbackEntry',
      if (id != null) 'id': id,
      if (patientId != null) 'patientId': patientId,
      if (departmentId != null) 'departmentId': departmentId,
      if (doctorId != null) 'doctorId': doctorId,
      'rating': rating,
      'category': category,
      if (comments != null) 'comments': comments,
      'ticketId': ticketId,
      'status': status,
      if (resolutionNote != null) 'resolutionNote': resolutionNote,
      'isAnonymous': isAnonymous,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static FeedbackEntryInclude include() {
    return FeedbackEntryInclude._();
  }

  static FeedbackEntryIncludeList includeList({
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    FeedbackEntryInclude? include,
  }) {
    return FeedbackEntryIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _FeedbackEntryImpl extends FeedbackEntry {
  _FeedbackEntryImpl({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    required int rating,
    String? category,
    String? comments,
    required String ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         patientId: patientId,
         departmentId: departmentId,
         doctorId: doctorId,
         rating: rating,
         category: category,
         comments: comments,
         ticketId: ticketId,
         status: status,
         resolutionNote: resolutionNote,
         isAnonymous: isAnonymous,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [FeedbackEntry]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  FeedbackEntry copyWith({
    Object? id = _Undefined,
    Object? patientId = _Undefined,
    Object? departmentId = _Undefined,
    Object? doctorId = _Undefined,
    int? rating,
    String? category,
    Object? comments = _Undefined,
    String? ticketId,
    String? status,
    Object? resolutionNote = _Undefined,
    bool? isAnonymous,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return FeedbackEntry(
      id: id is int? ? id : this.id,
      patientId: patientId is int? ? patientId : this.patientId,
      departmentId: departmentId is int? ? departmentId : this.departmentId,
      doctorId: doctorId is int? ? doctorId : this.doctorId,
      rating: rating ?? this.rating,
      category: category ?? this.category,
      comments: comments is String? ? comments : this.comments,
      ticketId: ticketId ?? this.ticketId,
      status: status ?? this.status,
      resolutionNote: resolutionNote is String?
          ? resolutionNote
          : this.resolutionNote,
      isAnonymous: isAnonymous ?? this.isAnonymous,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class FeedbackEntryUpdateTable extends _is.UpdateTable<FeedbackEntryTable> {
  FeedbackEntryUpdateTable(super.table);

  _is.ColumnValue<int, int> patientId(int? value) => _is.ColumnValue(
    table.patientId,
    value,
  );

  _is.ColumnValue<int, int> departmentId(int? value) => _is.ColumnValue(
    table.departmentId,
    value,
  );

  _is.ColumnValue<int, int> doctorId(int? value) => _is.ColumnValue(
    table.doctorId,
    value,
  );

  _is.ColumnValue<int, int> rating(int value) => _is.ColumnValue(
    table.rating,
    value,
  );

  _is.ColumnValue<String, String> category(String value) => _is.ColumnValue(
    table.category,
    value,
  );

  _is.ColumnValue<String, String> comments(String? value) => _is.ColumnValue(
    table.comments,
    value,
  );

  _is.ColumnValue<String, String> ticketId(String value) => _is.ColumnValue(
    table.ticketId,
    value,
  );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
    value,
  );

  _is.ColumnValue<String, String> resolutionNote(String? value) =>
      _is.ColumnValue(
        table.resolutionNote,
        value,
      );

  _is.ColumnValue<bool, bool> isAnonymous(bool value) => _is.ColumnValue(
    table.isAnonymous,
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

class FeedbackEntryTable extends _is.Table<int?> {
  FeedbackEntryTable({super.tableRelation})
    : super(tableName: 'careflow_feedback') {
    updateTable = FeedbackEntryUpdateTable(this);
    patientId = _is.ColumnInt(
      'patientId',
      this,
    );
    departmentId = _is.ColumnInt(
      'departmentId',
      this,
    );
    doctorId = _is.ColumnInt(
      'doctorId',
      this,
    );
    rating = _is.ColumnInt(
      'rating',
      this,
    );
    category = _is.ColumnString(
      'category',
      this,
      hasDefault: true,
    );
    comments = _is.ColumnString(
      'comments',
      this,
    );
    ticketId = _is.ColumnString(
      'ticketId',
      this,
    );
    status = _is.ColumnString(
      'status',
      this,
      hasDefault: true,
    );
    resolutionNote = _is.ColumnString(
      'resolutionNote',
      this,
    );
    isAnonymous = _is.ColumnBool(
      'isAnonymous',
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

  late final FeedbackEntryUpdateTable updateTable;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt departmentId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnInt rating;

  late final _is.ColumnString category;

  late final _is.ColumnString comments;

  late final _is.ColumnString ticketId;

  late final _is.ColumnString status;

  late final _is.ColumnString resolutionNote;

  late final _is.ColumnBool isAnonymous;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    patientId,
    departmentId,
    doctorId,
    rating,
    category,
    comments,
    ticketId,
    status,
    resolutionNote,
    isAnonymous,
    createdAt,
    updatedAt,
  ];
}

class FeedbackEntryInclude extends _is.IncludeObject {
  FeedbackEntryInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => FeedbackEntry.t;
}

class FeedbackEntryIncludeList extends _is.IncludeList {
  FeedbackEntryIncludeList._({
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(FeedbackEntry.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => FeedbackEntry.t;
}

class FeedbackEntryRepository {
  const FeedbackEntryRepository._();

  /// Returns a list of [FeedbackEntry]s matching the given query parameters.
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
  Future<List<FeedbackEntry>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<FeedbackEntry>(
      where: where?.call(FeedbackEntry.t),
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [FeedbackEntry]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `FeedbackEntry.t`.
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
  _ida.Stream<List<FeedbackEntry>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<FeedbackEntry>(
      where: where?.call(FeedbackEntry.t),
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [FeedbackEntry] matching the given query parameters.
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
  Future<FeedbackEntry?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    int? offset,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<FeedbackEntry>(
      where: where?.call(FeedbackEntry.t),
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [FeedbackEntry] by its [id] or null if no such row exists.
  Future<FeedbackEntry?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<FeedbackEntry>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [FeedbackEntry]s in the list and returns the inserted rows.
  ///
  /// The returned [FeedbackEntry]s will have their `id` fields set.
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
  Future<List<FeedbackEntry>> insert(
    _is.DatabaseSession session,
    List<FeedbackEntry> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<FeedbackEntry>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [FeedbackEntry] and returns the inserted row.
  ///
  /// The returned [FeedbackEntry] will have its `id` field set.
  Future<FeedbackEntry> insertRow(
    _is.DatabaseSession session,
    FeedbackEntry row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<FeedbackEntry>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [FeedbackEntry]s in the list and returns the resulting rows.
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
  /// The returned [FeedbackEntry]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<FeedbackEntry>> upsert(
    _is.DatabaseSession session,
    List<FeedbackEntry> rows, {
    required _is.ColumnSelections<FeedbackEntryTable> conflictColumns,
    _is.ColumnSelections<FeedbackEntryTable>? updateColumns,
    _is.WhereExpressionBuilder<FeedbackEntryTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<FeedbackEntry>(
      rows,
      conflictColumns: conflictColumns(FeedbackEntry.t),
      updateColumns: updateColumns?.call(FeedbackEntry.t),
      updateWhere: updateWhere?.call(FeedbackEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [FeedbackEntry] and returns the resulting row.
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
  /// The returned [FeedbackEntry] will have its `id` field set.
  Future<FeedbackEntry?> upsertRow(
    _is.DatabaseSession session,
    FeedbackEntry row, {
    required _is.ColumnSelections<FeedbackEntryTable> conflictColumns,
    _is.ColumnSelections<FeedbackEntryTable>? updateColumns,
    _is.WhereExpressionBuilder<FeedbackEntryTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<FeedbackEntry>(
      row,
      conflictColumns: conflictColumns(FeedbackEntry.t),
      updateColumns: updateColumns?.call(FeedbackEntry.t),
      updateWhere: updateWhere?.call(FeedbackEntry.t),
      transaction: transaction,
    );
  }

  /// Updates all [FeedbackEntry]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<FeedbackEntry>> update(
    _is.DatabaseSession session,
    List<FeedbackEntry> rows, {
    _is.ColumnSelections<FeedbackEntryTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<FeedbackEntry>(
      rows,
      columns: columns?.call(FeedbackEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [FeedbackEntry]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<FeedbackEntry> updateRow(
    _is.DatabaseSession session,
    FeedbackEntry row, {
    _is.ColumnSelections<FeedbackEntryTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<FeedbackEntry>(
      row,
      columns: columns?.call(FeedbackEntry.t),
      transaction: transaction,
    );
  }

  /// Updates a single [FeedbackEntry] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<FeedbackEntry?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<FeedbackEntryUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<FeedbackEntry>(
      id,
      columnValues: columnValues(FeedbackEntry.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [FeedbackEntry]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<FeedbackEntry>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<FeedbackEntryUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<FeedbackEntryTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<FeedbackEntry>(
      columnValues: columnValues(FeedbackEntry.t.updateTable),
      where: where(FeedbackEntry.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [FeedbackEntry]s in the list and returns the deleted rows.
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
  Future<List<FeedbackEntry>> delete(
    _is.DatabaseSession session,
    List<FeedbackEntry> rows, {
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<FeedbackEntry>(
      rows,
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [FeedbackEntry].
  Future<FeedbackEntry> deleteRow(
    _is.DatabaseSession session,
    FeedbackEntry row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<FeedbackEntry>(
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
  Future<List<FeedbackEntry>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<FeedbackEntryTable> where,
    _is.OrderByBuilder<FeedbackEntryTable>? orderBy,
    _is.OrderByListBuilder<FeedbackEntryTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<FeedbackEntry>(
      where: where(FeedbackEntry.t),
      orderBy: orderBy?.call(FeedbackEntry.t),
      orderByList: orderByList?.call(FeedbackEntry.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<FeedbackEntryTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<FeedbackEntry>(
      where: where?.call(FeedbackEntry.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [FeedbackEntry] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<FeedbackEntryTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<FeedbackEntry>(
      where: where(FeedbackEntry.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
