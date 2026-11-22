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

abstract class HospitalResource
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  HospitalResource._({
    this.id,
    required this.resourceType,
    required this.resourceName,
    required this.identifier,
    String? ward,
    String? status,
    this.createdAt,
    this.updatedAt,
  }) : ward = ward ?? 'General Ward A',
       status = status ?? 'available';

  factory HospitalResource({
    int? id,
    required String resourceType,
    required String resourceName,
    required String identifier,
    String? ward,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _HospitalResourceImpl;

  factory HospitalResource.fromJson(Map<String, dynamic> jsonSerialization) {
    return HospitalResource(
      id: jsonSerialization['id'] as int?,
      resourceType: jsonSerialization['resourceType'] as String,
      resourceName: jsonSerialization['resourceName'] as String,
      identifier: jsonSerialization['identifier'] as String,
      ward: jsonSerialization['ward'] as String?,
      status: jsonSerialization['status'] as String?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = HospitalResourceTable();

  static const db = HospitalResourceRepository._();

  @override
  int? id;

  String resourceType;

  String resourceName;

  String identifier;

  String ward;

  String status;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [HospitalResource]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  HospitalResource copyWith({
    int? id,
    String? resourceType,
    String? resourceName,
    String? identifier,
    String? ward,
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'HospitalResource',
      if (id != null) 'id': id,
      'resourceType': resourceType,
      'resourceName': resourceName,
      'identifier': identifier,
      'ward': ward,
      'status': status,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'HospitalResource',
      if (id != null) 'id': id,
      'resourceType': resourceType,
      'resourceName': resourceName,
      'identifier': identifier,
      'ward': ward,
      'status': status,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static HospitalResourceInclude include() {
    return HospitalResourceInclude._();
  }

  static HospitalResourceIncludeList includeList({
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    HospitalResourceInclude? include,
  }) {
    return HospitalResourceIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _HospitalResourceImpl extends HospitalResource {
  _HospitalResourceImpl({
    int? id,
    required String resourceType,
    required String resourceName,
    required String identifier,
    String? ward,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         resourceType: resourceType,
         resourceName: resourceName,
         identifier: identifier,
         ward: ward,
         status: status,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [HospitalResource]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  HospitalResource copyWith({
    Object? id = _Undefined,
    String? resourceType,
    String? resourceName,
    String? identifier,
    String? ward,
    String? status,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return HospitalResource(
      id: id is int? ? id : this.id,
      resourceType: resourceType ?? this.resourceType,
      resourceName: resourceName ?? this.resourceName,
      identifier: identifier ?? this.identifier,
      ward: ward ?? this.ward,
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

class HospitalResourceUpdateTable
    extends _is.UpdateTable<HospitalResourceTable> {
  HospitalResourceUpdateTable(super.table);

  _is.ColumnValue<String, String> resourceType(String value) => _is.ColumnValue(
    table.resourceType,
    value,
  );

  _is.ColumnValue<String, String> resourceName(String value) => _is.ColumnValue(
    table.resourceName,
    value,
  );

  _is.ColumnValue<String, String> identifier(String value) => _is.ColumnValue(
    table.identifier,
    value,
  );

  _is.ColumnValue<String, String> ward(String value) => _is.ColumnValue(
    table.ward,
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

class HospitalResourceTable extends _is.Table<int?> {
  HospitalResourceTable({super.tableRelation})
    : super(tableName: 'careflow_hospital_resources') {
    updateTable = HospitalResourceUpdateTable(this);
    resourceType = _is.ColumnString(
      'resourceType',
      this,
    );
    resourceName = _is.ColumnString(
      'resourceName',
      this,
    );
    identifier = _is.ColumnString(
      'identifier',
      this,
    );
    ward = _is.ColumnString(
      'ward',
      this,
      hasDefault: true,
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

  late final HospitalResourceUpdateTable updateTable;

  late final _is.ColumnString resourceType;

  late final _is.ColumnString resourceName;

  late final _is.ColumnString identifier;

  late final _is.ColumnString ward;

  late final _is.ColumnString status;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    resourceType,
    resourceName,
    identifier,
    ward,
    status,
    createdAt,
    updatedAt,
  ];
}

class HospitalResourceInclude extends _is.IncludeObject {
  HospitalResourceInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => HospitalResource.t;
}

class HospitalResourceIncludeList extends _is.IncludeList {
  HospitalResourceIncludeList._({
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(HospitalResource.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => HospitalResource.t;
}

class HospitalResourceRepository {
  const HospitalResourceRepository._();

  /// Returns a list of [HospitalResource]s matching the given query parameters.
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
  Future<List<HospitalResource>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<HospitalResource>(
      where: where?.call(HospitalResource.t),
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [HospitalResource]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `HospitalResource.t`.
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
  _ida.Stream<List<HospitalResource>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<HospitalResource>(
      where: where?.call(HospitalResource.t),
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [HospitalResource] matching the given query parameters.
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
  Future<HospitalResource?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    int? offset,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<HospitalResource>(
      where: where?.call(HospitalResource.t),
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [HospitalResource] by its [id] or null if no such row exists.
  Future<HospitalResource?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<HospitalResource>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [HospitalResource]s in the list and returns the inserted rows.
  ///
  /// The returned [HospitalResource]s will have their `id` fields set.
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
  Future<List<HospitalResource>> insert(
    _is.DatabaseSession session,
    List<HospitalResource> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<HospitalResource>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [HospitalResource] and returns the inserted row.
  ///
  /// The returned [HospitalResource] will have its `id` field set.
  Future<HospitalResource> insertRow(
    _is.DatabaseSession session,
    HospitalResource row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<HospitalResource>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [HospitalResource]s in the list and returns the resulting rows.
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
  /// The returned [HospitalResource]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<HospitalResource>> upsert(
    _is.DatabaseSession session,
    List<HospitalResource> rows, {
    required _is.ColumnSelections<HospitalResourceTable> conflictColumns,
    _is.ColumnSelections<HospitalResourceTable>? updateColumns,
    _is.WhereExpressionBuilder<HospitalResourceTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<HospitalResource>(
      rows,
      conflictColumns: conflictColumns(HospitalResource.t),
      updateColumns: updateColumns?.call(HospitalResource.t),
      updateWhere: updateWhere?.call(HospitalResource.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [HospitalResource] and returns the resulting row.
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
  /// The returned [HospitalResource] will have its `id` field set.
  Future<HospitalResource?> upsertRow(
    _is.DatabaseSession session,
    HospitalResource row, {
    required _is.ColumnSelections<HospitalResourceTable> conflictColumns,
    _is.ColumnSelections<HospitalResourceTable>? updateColumns,
    _is.WhereExpressionBuilder<HospitalResourceTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<HospitalResource>(
      row,
      conflictColumns: conflictColumns(HospitalResource.t),
      updateColumns: updateColumns?.call(HospitalResource.t),
      updateWhere: updateWhere?.call(HospitalResource.t),
      transaction: transaction,
    );
  }

  /// Updates all [HospitalResource]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<HospitalResource>> update(
    _is.DatabaseSession session,
    List<HospitalResource> rows, {
    _is.ColumnSelections<HospitalResourceTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<HospitalResource>(
      rows,
      columns: columns?.call(HospitalResource.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [HospitalResource]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<HospitalResource> updateRow(
    _is.DatabaseSession session,
    HospitalResource row, {
    _is.ColumnSelections<HospitalResourceTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<HospitalResource>(
      row,
      columns: columns?.call(HospitalResource.t),
      transaction: transaction,
    );
  }

  /// Updates a single [HospitalResource] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<HospitalResource?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<HospitalResourceUpdateTable>
    columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<HospitalResource>(
      id,
      columnValues: columnValues(HospitalResource.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [HospitalResource]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<HospitalResource>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<HospitalResourceUpdateTable>
    columnValues,
    required _is.WhereExpressionBuilder<HospitalResourceTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<HospitalResource>(
      columnValues: columnValues(HospitalResource.t.updateTable),
      where: where(HospitalResource.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [HospitalResource]s in the list and returns the deleted rows.
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
  Future<List<HospitalResource>> delete(
    _is.DatabaseSession session,
    List<HospitalResource> rows, {
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<HospitalResource>(
      rows,
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [HospitalResource].
  Future<HospitalResource> deleteRow(
    _is.DatabaseSession session,
    HospitalResource row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<HospitalResource>(
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
  Future<List<HospitalResource>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<HospitalResourceTable> where,
    _is.OrderByBuilder<HospitalResourceTable>? orderBy,
    _is.OrderByListBuilder<HospitalResourceTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<HospitalResource>(
      where: where(HospitalResource.t),
      orderBy: orderBy?.call(HospitalResource.t),
      orderByList: orderByList?.call(HospitalResource.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<HospitalResourceTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<HospitalResource>(
      where: where?.call(HospitalResource.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [HospitalResource] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<HospitalResourceTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<HospitalResource>(
      where: where(HospitalResource.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
