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

abstract class PharmacyOrder
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  PharmacyOrder._({
    this.id,
    required this.orderNumber,
    required this.prescriptionId,
    required this.patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    this.dispensedAt,
    this.createdAt,
    this.updatedAt,
  }) : totalAmount = totalAmount ?? 0.0,
       paymentStatus = paymentStatus ?? 'exempt_gov',
       status = status ?? 'received';

  factory PharmacyOrder({
    int? id,
    required String orderNumber,
    required int prescriptionId,
    required int patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _PharmacyOrderImpl;

  factory PharmacyOrder.fromJson(Map<String, dynamic> jsonSerialization) {
    return PharmacyOrder(
      id: jsonSerialization['id'] as int?,
      orderNumber: jsonSerialization['orderNumber'] as String,
      prescriptionId: jsonSerialization['prescriptionId'] as int,
      patientId: jsonSerialization['patientId'] as int,
      totalAmount: (jsonSerialization['totalAmount'] as num?)?.toDouble(),
      paymentStatus: jsonSerialization['paymentStatus'] as String?,
      status: jsonSerialization['status'] as String?,
      dispensedAt: jsonSerialization['dispensedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['dispensedAt'],
            ),
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = PharmacyOrderTable();

  static const db = PharmacyOrderRepository._();

  @override
  int? id;

  String orderNumber;

  int prescriptionId;

  int patientId;

  double totalAmount;

  String paymentStatus;

  String status;

  DateTime? dispensedAt;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [PharmacyOrder]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  PharmacyOrder copyWith({
    int? id,
    String? orderNumber,
    int? prescriptionId,
    int? patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'PharmacyOrder',
      if (id != null) 'id': id,
      'orderNumber': orderNumber,
      'prescriptionId': prescriptionId,
      'patientId': patientId,
      'totalAmount': totalAmount,
      'paymentStatus': paymentStatus,
      'status': status,
      if (dispensedAt != null) 'dispensedAt': dispensedAt?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'PharmacyOrder',
      if (id != null) 'id': id,
      'orderNumber': orderNumber,
      'prescriptionId': prescriptionId,
      'patientId': patientId,
      'totalAmount': totalAmount,
      'paymentStatus': paymentStatus,
      'status': status,
      if (dispensedAt != null) 'dispensedAt': dispensedAt?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static PharmacyOrderInclude include() {
    return PharmacyOrderInclude._();
  }

  static PharmacyOrderIncludeList includeList({
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    PharmacyOrderInclude? include,
  }) {
    return PharmacyOrderIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _PharmacyOrderImpl extends PharmacyOrder {
  _PharmacyOrderImpl({
    int? id,
    required String orderNumber,
    required int prescriptionId,
    required int patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         orderNumber: orderNumber,
         prescriptionId: prescriptionId,
         patientId: patientId,
         totalAmount: totalAmount,
         paymentStatus: paymentStatus,
         status: status,
         dispensedAt: dispensedAt,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [PharmacyOrder]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  PharmacyOrder copyWith({
    Object? id = _Undefined,
    String? orderNumber,
    int? prescriptionId,
    int? patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return PharmacyOrder(
      id: id is int? ? id : this.id,
      orderNumber: orderNumber ?? this.orderNumber,
      prescriptionId: prescriptionId ?? this.prescriptionId,
      patientId: patientId ?? this.patientId,
      totalAmount: totalAmount ?? this.totalAmount,
      paymentStatus: paymentStatus ?? this.paymentStatus,
      status: status ?? this.status,
      dispensedAt: dispensedAt is _is.UndefinedSentinel
          ? this.dispensedAt
          : dispensedAt,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class PharmacyOrderUpdateTable extends _is.UpdateTable<PharmacyOrderTable> {
  PharmacyOrderUpdateTable(super.table);

  _is.ColumnValue<String, String> orderNumber(String value) => _is.ColumnValue(
    table.orderNumber,
    value,
  );

  _is.ColumnValue<int, int> prescriptionId(int value) => _is.ColumnValue(
    table.prescriptionId,
    value,
  );

  _is.ColumnValue<int, int> patientId(int value) => _is.ColumnValue(
    table.patientId,
    value,
  );

  _is.ColumnValue<double, double> totalAmount(double value) => _is.ColumnValue(
    table.totalAmount,
    value,
  );

  _is.ColumnValue<String, String> paymentStatus(String value) =>
      _is.ColumnValue(
        table.paymentStatus,
        value,
      );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
    value,
  );

  _is.ColumnValue<DateTime, DateTime> dispensedAt(DateTime? value) =>
      _is.ColumnValue(
        table.dispensedAt,
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

class PharmacyOrderTable extends _is.Table<int?> {
  PharmacyOrderTable({super.tableRelation})
    : super(tableName: 'careflow_pharmacy_orders') {
    updateTable = PharmacyOrderUpdateTable(this);
    orderNumber = _is.ColumnString(
      'orderNumber',
      this,
    );
    prescriptionId = _is.ColumnInt(
      'prescriptionId',
      this,
    );
    patientId = _is.ColumnInt(
      'patientId',
      this,
    );
    totalAmount = _is.ColumnDouble(
      'totalAmount',
      this,
      hasDefault: true,
    );
    paymentStatus = _is.ColumnString(
      'paymentStatus',
      this,
      hasDefault: true,
    );
    status = _is.ColumnString(
      'status',
      this,
      hasDefault: true,
    );
    dispensedAt = _is.ColumnDateTime(
      'dispensedAt',
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

  late final PharmacyOrderUpdateTable updateTable;

  late final _is.ColumnString orderNumber;

  late final _is.ColumnInt prescriptionId;

  late final _is.ColumnInt patientId;

  late final _is.ColumnDouble totalAmount;

  late final _is.ColumnString paymentStatus;

  late final _is.ColumnString status;

  late final _is.ColumnDateTime dispensedAt;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    orderNumber,
    prescriptionId,
    patientId,
    totalAmount,
    paymentStatus,
    status,
    dispensedAt,
    createdAt,
    updatedAt,
  ];
}

class PharmacyOrderInclude extends _is.IncludeObject {
  PharmacyOrderInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => PharmacyOrder.t;
}

class PharmacyOrderIncludeList extends _is.IncludeList {
  PharmacyOrderIncludeList._({
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(PharmacyOrder.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => PharmacyOrder.t;
}

class PharmacyOrderRepository {
  const PharmacyOrderRepository._();

  /// Returns a list of [PharmacyOrder]s matching the given query parameters.
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
  Future<List<PharmacyOrder>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<PharmacyOrder>(
      where: where?.call(PharmacyOrder.t),
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [PharmacyOrder]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `PharmacyOrder.t`.
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
  _ida.Stream<List<PharmacyOrder>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<PharmacyOrder>(
      where: where?.call(PharmacyOrder.t),
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [PharmacyOrder] matching the given query parameters.
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
  Future<PharmacyOrder?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    int? offset,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<PharmacyOrder>(
      where: where?.call(PharmacyOrder.t),
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [PharmacyOrder] by its [id] or null if no such row exists.
  Future<PharmacyOrder?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<PharmacyOrder>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [PharmacyOrder]s in the list and returns the inserted rows.
  ///
  /// The returned [PharmacyOrder]s will have their `id` fields set.
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
  Future<List<PharmacyOrder>> insert(
    _is.DatabaseSession session,
    List<PharmacyOrder> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<PharmacyOrder>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [PharmacyOrder] and returns the inserted row.
  ///
  /// The returned [PharmacyOrder] will have its `id` field set.
  Future<PharmacyOrder> insertRow(
    _is.DatabaseSession session,
    PharmacyOrder row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<PharmacyOrder>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [PharmacyOrder]s in the list and returns the resulting rows.
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
  /// The returned [PharmacyOrder]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PharmacyOrder>> upsert(
    _is.DatabaseSession session,
    List<PharmacyOrder> rows, {
    required _is.ColumnSelections<PharmacyOrderTable> conflictColumns,
    _is.ColumnSelections<PharmacyOrderTable>? updateColumns,
    _is.WhereExpressionBuilder<PharmacyOrderTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<PharmacyOrder>(
      rows,
      conflictColumns: conflictColumns(PharmacyOrder.t),
      updateColumns: updateColumns?.call(PharmacyOrder.t),
      updateWhere: updateWhere?.call(PharmacyOrder.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [PharmacyOrder] and returns the resulting row.
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
  /// The returned [PharmacyOrder] will have its `id` field set.
  Future<PharmacyOrder?> upsertRow(
    _is.DatabaseSession session,
    PharmacyOrder row, {
    required _is.ColumnSelections<PharmacyOrderTable> conflictColumns,
    _is.ColumnSelections<PharmacyOrderTable>? updateColumns,
    _is.WhereExpressionBuilder<PharmacyOrderTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<PharmacyOrder>(
      row,
      conflictColumns: conflictColumns(PharmacyOrder.t),
      updateColumns: updateColumns?.call(PharmacyOrder.t),
      updateWhere: updateWhere?.call(PharmacyOrder.t),
      transaction: transaction,
    );
  }

  /// Updates all [PharmacyOrder]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PharmacyOrder>> update(
    _is.DatabaseSession session,
    List<PharmacyOrder> rows, {
    _is.ColumnSelections<PharmacyOrderTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<PharmacyOrder>(
      rows,
      columns: columns?.call(PharmacyOrder.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [PharmacyOrder]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<PharmacyOrder> updateRow(
    _is.DatabaseSession session,
    PharmacyOrder row, {
    _is.ColumnSelections<PharmacyOrderTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<PharmacyOrder>(
      row,
      columns: columns?.call(PharmacyOrder.t),
      transaction: transaction,
    );
  }

  /// Updates a single [PharmacyOrder] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<PharmacyOrder?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<PharmacyOrderUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<PharmacyOrder>(
      id,
      columnValues: columnValues(PharmacyOrder.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [PharmacyOrder]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PharmacyOrder>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<PharmacyOrderUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<PharmacyOrderTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<PharmacyOrder>(
      columnValues: columnValues(PharmacyOrder.t.updateTable),
      where: where(PharmacyOrder.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [PharmacyOrder]s in the list and returns the deleted rows.
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
  Future<List<PharmacyOrder>> delete(
    _is.DatabaseSession session,
    List<PharmacyOrder> rows, {
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<PharmacyOrder>(
      rows,
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [PharmacyOrder].
  Future<PharmacyOrder> deleteRow(
    _is.DatabaseSession session,
    PharmacyOrder row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<PharmacyOrder>(
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
  Future<List<PharmacyOrder>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PharmacyOrderTable> where,
    _is.OrderByBuilder<PharmacyOrderTable>? orderBy,
    _is.OrderByListBuilder<PharmacyOrderTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<PharmacyOrder>(
      where: where(PharmacyOrder.t),
      orderBy: orderBy?.call(PharmacyOrder.t),
      orderByList: orderByList?.call(PharmacyOrder.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PharmacyOrderTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<PharmacyOrder>(
      where: where?.call(PharmacyOrder.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [PharmacyOrder] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PharmacyOrderTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<PharmacyOrder>(
      where: where(PharmacyOrder.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
