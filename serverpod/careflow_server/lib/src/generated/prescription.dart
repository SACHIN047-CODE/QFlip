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

abstract class Prescription
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
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
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = PrescriptionTable();

  static const db = PrescriptionRepository._();

  @override
  int? id;

  String prescriptionNumber;

  int consultationId;

  int patientId;

  int doctorId;

  String? dietaryAdvice;

  String status;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [Prescription]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  Prescription copyWith({
    int? id,
    String? prescriptionNumber,
    int? consultationId,
    int? patientId,
    int? doctorId,
    String? dietaryAdvice,
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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

  static PrescriptionInclude include() {
    return PrescriptionInclude._();
  }

  static PrescriptionIncludeList includeList({
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    PrescriptionInclude? include,
  }) {
    return PrescriptionIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
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
  @_is.useResult
  @override
  Prescription copyWith({
    Object? id = _Undefined,
    String? prescriptionNumber,
    int? consultationId,
    int? patientId,
    int? doctorId,
    Object? dietaryAdvice = _Undefined,
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
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
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class PrescriptionUpdateTable extends _is.UpdateTable<PrescriptionTable> {
  PrescriptionUpdateTable(super.table);

  _is.ColumnValue<String, String> prescriptionNumber(String value) =>
      _is.ColumnValue(
        table.prescriptionNumber,
        value,
      );

  _is.ColumnValue<int, int> consultationId(int value) => _is.ColumnValue(
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

  _is.ColumnValue<String, String> dietaryAdvice(String? value) =>
      _is.ColumnValue(
        table.dietaryAdvice,
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

class PrescriptionTable extends _is.Table<int?> {
  PrescriptionTable({super.tableRelation})
    : super(tableName: 'careflow_prescriptions') {
    updateTable = PrescriptionUpdateTable(this);
    prescriptionNumber = _is.ColumnString(
      'prescriptionNumber',
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
    dietaryAdvice = _is.ColumnString(
      'dietaryAdvice',
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

  late final PrescriptionUpdateTable updateTable;

  late final _is.ColumnString prescriptionNumber;

  late final _is.ColumnInt consultationId;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnString dietaryAdvice;

  late final _is.ColumnString status;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    prescriptionNumber,
    consultationId,
    patientId,
    doctorId,
    dietaryAdvice,
    status,
    createdAt,
    updatedAt,
  ];
}

class PrescriptionInclude extends _is.IncludeObject {
  PrescriptionInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => Prescription.t;
}

class PrescriptionIncludeList extends _is.IncludeList {
  PrescriptionIncludeList._({
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(Prescription.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => Prescription.t;
}

class PrescriptionRepository {
  const PrescriptionRepository._();

  /// Returns a list of [Prescription]s matching the given query parameters.
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
  Future<List<Prescription>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<Prescription>(
      where: where?.call(Prescription.t),
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [Prescription]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `Prescription.t`.
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
  _ida.Stream<List<Prescription>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<Prescription>(
      where: where?.call(Prescription.t),
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [Prescription] matching the given query parameters.
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
  Future<Prescription?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    int? offset,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<Prescription>(
      where: where?.call(Prescription.t),
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [Prescription] by its [id] or null if no such row exists.
  Future<Prescription?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<Prescription>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [Prescription]s in the list and returns the inserted rows.
  ///
  /// The returned [Prescription]s will have their `id` fields set.
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
  Future<List<Prescription>> insert(
    _is.DatabaseSession session,
    List<Prescription> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<Prescription>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [Prescription] and returns the inserted row.
  ///
  /// The returned [Prescription] will have its `id` field set.
  Future<Prescription> insertRow(
    _is.DatabaseSession session,
    Prescription row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<Prescription>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [Prescription]s in the list and returns the resulting rows.
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
  /// The returned [Prescription]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Prescription>> upsert(
    _is.DatabaseSession session,
    List<Prescription> rows, {
    required _is.ColumnSelections<PrescriptionTable> conflictColumns,
    _is.ColumnSelections<PrescriptionTable>? updateColumns,
    _is.WhereExpressionBuilder<PrescriptionTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<Prescription>(
      rows,
      conflictColumns: conflictColumns(Prescription.t),
      updateColumns: updateColumns?.call(Prescription.t),
      updateWhere: updateWhere?.call(Prescription.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [Prescription] and returns the resulting row.
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
  /// The returned [Prescription] will have its `id` field set.
  Future<Prescription?> upsertRow(
    _is.DatabaseSession session,
    Prescription row, {
    required _is.ColumnSelections<PrescriptionTable> conflictColumns,
    _is.ColumnSelections<PrescriptionTable>? updateColumns,
    _is.WhereExpressionBuilder<PrescriptionTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<Prescription>(
      row,
      conflictColumns: conflictColumns(Prescription.t),
      updateColumns: updateColumns?.call(Prescription.t),
      updateWhere: updateWhere?.call(Prescription.t),
      transaction: transaction,
    );
  }

  /// Updates all [Prescription]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Prescription>> update(
    _is.DatabaseSession session,
    List<Prescription> rows, {
    _is.ColumnSelections<PrescriptionTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<Prescription>(
      rows,
      columns: columns?.call(Prescription.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [Prescription]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<Prescription> updateRow(
    _is.DatabaseSession session,
    Prescription row, {
    _is.ColumnSelections<PrescriptionTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<Prescription>(
      row,
      columns: columns?.call(Prescription.t),
      transaction: transaction,
    );
  }

  /// Updates a single [Prescription] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<Prescription?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<PrescriptionUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<Prescription>(
      id,
      columnValues: columnValues(Prescription.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [Prescription]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Prescription>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<PrescriptionUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<PrescriptionTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<Prescription>(
      columnValues: columnValues(Prescription.t.updateTable),
      where: where(Prescription.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [Prescription]s in the list and returns the deleted rows.
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
  Future<List<Prescription>> delete(
    _is.DatabaseSession session,
    List<Prescription> rows, {
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<Prescription>(
      rows,
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [Prescription].
  Future<Prescription> deleteRow(
    _is.DatabaseSession session,
    Prescription row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<Prescription>(
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
  Future<List<Prescription>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PrescriptionTable> where,
    _is.OrderByBuilder<PrescriptionTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<Prescription>(
      where: where(Prescription.t),
      orderBy: orderBy?.call(Prescription.t),
      orderByList: orderByList?.call(Prescription.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<Prescription>(
      where: where?.call(Prescription.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [Prescription] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PrescriptionTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<Prescription>(
      where: where(Prescription.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
