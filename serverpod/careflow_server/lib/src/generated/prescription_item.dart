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

abstract class PrescriptionItem
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  PrescriptionItem._({
    this.id,
    required this.prescriptionId,
    required this.medicineName,
    required this.dosage,
    this.quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    this.instructions,
    bool? isDispensed,
  }) : consumptionTiming = consumptionTiming ?? 'After breakfast',
       frequency = frequency ?? 'Twice daily',
       duration = duration ?? '5 days',
       isDispensed = isDispensed ?? false;

  factory PrescriptionItem({
    int? id,
    required int prescriptionId,
    required String medicineName,
    required String dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  }) = _PrescriptionItemImpl;

  factory PrescriptionItem.fromJson(Map<String, dynamic> jsonSerialization) {
    return PrescriptionItem(
      id: jsonSerialization['id'] as int?,
      prescriptionId: jsonSerialization['prescriptionId'] as int,
      medicineName: jsonSerialization['medicineName'] as String,
      dosage: jsonSerialization['dosage'] as String,
      quantity: jsonSerialization['quantity'] as int?,
      consumptionTiming: jsonSerialization['consumptionTiming'] as String?,
      frequency: jsonSerialization['frequency'] as String?,
      duration: jsonSerialization['duration'] as String?,
      instructions: jsonSerialization['instructions'] as String?,
      isDispensed: jsonSerialization['isDispensed'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['isDispensed']),
    );
  }

  static final t = PrescriptionItemTable();

  static const db = PrescriptionItemRepository._();

  @override
  int? id;

  int prescriptionId;

  String medicineName;

  String dosage;

  int? quantity;

  String consumptionTiming;

  String frequency;

  String duration;

  String? instructions;

  bool isDispensed;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [PrescriptionItem]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  PrescriptionItem copyWith({
    int? id,
    int? prescriptionId,
    String? medicineName,
    String? dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'PrescriptionItem',
      if (id != null) 'id': id,
      'prescriptionId': prescriptionId,
      'medicineName': medicineName,
      'dosage': dosage,
      if (quantity != null) 'quantity': quantity,
      'consumptionTiming': consumptionTiming,
      'frequency': frequency,
      'duration': duration,
      if (instructions != null) 'instructions': instructions,
      'isDispensed': isDispensed,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'PrescriptionItem',
      if (id != null) 'id': id,
      'prescriptionId': prescriptionId,
      'medicineName': medicineName,
      'dosage': dosage,
      if (quantity != null) 'quantity': quantity,
      'consumptionTiming': consumptionTiming,
      'frequency': frequency,
      'duration': duration,
      if (instructions != null) 'instructions': instructions,
      'isDispensed': isDispensed,
    };
  }

  static PrescriptionItemInclude include() {
    return PrescriptionItemInclude._();
  }

  static PrescriptionItemIncludeList includeList({
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    PrescriptionItemInclude? include,
  }) {
    return PrescriptionItemIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _PrescriptionItemImpl extends PrescriptionItem {
  _PrescriptionItemImpl({
    int? id,
    required int prescriptionId,
    required String medicineName,
    required String dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  }) : super._(
         id: id,
         prescriptionId: prescriptionId,
         medicineName: medicineName,
         dosage: dosage,
         quantity: quantity,
         consumptionTiming: consumptionTiming,
         frequency: frequency,
         duration: duration,
         instructions: instructions,
         isDispensed: isDispensed,
       );

  /// Returns a shallow copy of this [PrescriptionItem]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  PrescriptionItem copyWith({
    Object? id = _Undefined,
    int? prescriptionId,
    String? medicineName,
    String? dosage,
    Object? quantity = _Undefined,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    Object? instructions = _Undefined,
    bool? isDispensed,
  }) {
    return PrescriptionItem(
      id: id is int? ? id : this.id,
      prescriptionId: prescriptionId ?? this.prescriptionId,
      medicineName: medicineName ?? this.medicineName,
      dosage: dosage ?? this.dosage,
      quantity: quantity is int? ? quantity : this.quantity,
      consumptionTiming: consumptionTiming ?? this.consumptionTiming,
      frequency: frequency ?? this.frequency,
      duration: duration ?? this.duration,
      instructions: instructions is String? ? instructions : this.instructions,
      isDispensed: isDispensed ?? this.isDispensed,
    );
  }
}

class PrescriptionItemUpdateTable
    extends _is.UpdateTable<PrescriptionItemTable> {
  PrescriptionItemUpdateTable(super.table);

  _is.ColumnValue<int, int> prescriptionId(int value) => _is.ColumnValue(
    table.prescriptionId,
    value,
  );

  _is.ColumnValue<String, String> medicineName(String value) => _is.ColumnValue(
    table.medicineName,
    value,
  );

  _is.ColumnValue<String, String> dosage(String value) => _is.ColumnValue(
    table.dosage,
    value,
  );

  _is.ColumnValue<int, int> quantity(int? value) => _is.ColumnValue(
    table.quantity,
    value,
  );

  _is.ColumnValue<String, String> consumptionTiming(String value) =>
      _is.ColumnValue(
        table.consumptionTiming,
        value,
      );

  _is.ColumnValue<String, String> frequency(String value) => _is.ColumnValue(
    table.frequency,
    value,
  );

  _is.ColumnValue<String, String> duration(String value) => _is.ColumnValue(
    table.duration,
    value,
  );

  _is.ColumnValue<String, String> instructions(String? value) =>
      _is.ColumnValue(
        table.instructions,
        value,
      );

  _is.ColumnValue<bool, bool> isDispensed(bool value) => _is.ColumnValue(
    table.isDispensed,
    value,
  );
}

class PrescriptionItemTable extends _is.Table<int?> {
  PrescriptionItemTable({super.tableRelation})
    : super(tableName: 'careflow_prescription_items') {
    updateTable = PrescriptionItemUpdateTable(this);
    prescriptionId = _is.ColumnInt(
      'prescriptionId',
      this,
    );
    medicineName = _is.ColumnString(
      'medicineName',
      this,
    );
    dosage = _is.ColumnString(
      'dosage',
      this,
    );
    quantity = _is.ColumnInt(
      'quantity',
      this,
    );
    consumptionTiming = _is.ColumnString(
      'consumptionTiming',
      this,
      hasDefault: true,
    );
    frequency = _is.ColumnString(
      'frequency',
      this,
      hasDefault: true,
    );
    duration = _is.ColumnString(
      'duration',
      this,
      hasDefault: true,
    );
    instructions = _is.ColumnString(
      'instructions',
      this,
    );
    isDispensed = _is.ColumnBool(
      'isDispensed',
      this,
      hasDefault: true,
    );
  }

  late final PrescriptionItemUpdateTable updateTable;

  late final _is.ColumnInt prescriptionId;

  late final _is.ColumnString medicineName;

  late final _is.ColumnString dosage;

  late final _is.ColumnInt quantity;

  late final _is.ColumnString consumptionTiming;

  late final _is.ColumnString frequency;

  late final _is.ColumnString duration;

  late final _is.ColumnString instructions;

  late final _is.ColumnBool isDispensed;

  @override
  List<_is.Column> get columns => [
    id,
    prescriptionId,
    medicineName,
    dosage,
    quantity,
    consumptionTiming,
    frequency,
    duration,
    instructions,
    isDispensed,
  ];
}

class PrescriptionItemInclude extends _is.IncludeObject {
  PrescriptionItemInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => PrescriptionItem.t;
}

class PrescriptionItemIncludeList extends _is.IncludeList {
  PrescriptionItemIncludeList._({
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(PrescriptionItem.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => PrescriptionItem.t;
}

class PrescriptionItemRepository {
  const PrescriptionItemRepository._();

  /// Returns a list of [PrescriptionItem]s matching the given query parameters.
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
  Future<List<PrescriptionItem>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<PrescriptionItem>(
      where: where?.call(PrescriptionItem.t),
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [PrescriptionItem]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `PrescriptionItem.t`.
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
  _ida.Stream<List<PrescriptionItem>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<PrescriptionItem>(
      where: where?.call(PrescriptionItem.t),
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [PrescriptionItem] matching the given query parameters.
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
  Future<PrescriptionItem?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    int? offset,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<PrescriptionItem>(
      where: where?.call(PrescriptionItem.t),
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [PrescriptionItem] by its [id] or null if no such row exists.
  Future<PrescriptionItem?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<PrescriptionItem>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [PrescriptionItem]s in the list and returns the inserted rows.
  ///
  /// The returned [PrescriptionItem]s will have their `id` fields set.
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
  Future<List<PrescriptionItem>> insert(
    _is.DatabaseSession session,
    List<PrescriptionItem> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<PrescriptionItem>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [PrescriptionItem] and returns the inserted row.
  ///
  /// The returned [PrescriptionItem] will have its `id` field set.
  Future<PrescriptionItem> insertRow(
    _is.DatabaseSession session,
    PrescriptionItem row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<PrescriptionItem>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [PrescriptionItem]s in the list and returns the resulting rows.
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
  /// The returned [PrescriptionItem]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PrescriptionItem>> upsert(
    _is.DatabaseSession session,
    List<PrescriptionItem> rows, {
    required _is.ColumnSelections<PrescriptionItemTable> conflictColumns,
    _is.ColumnSelections<PrescriptionItemTable>? updateColumns,
    _is.WhereExpressionBuilder<PrescriptionItemTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<PrescriptionItem>(
      rows,
      conflictColumns: conflictColumns(PrescriptionItem.t),
      updateColumns: updateColumns?.call(PrescriptionItem.t),
      updateWhere: updateWhere?.call(PrescriptionItem.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [PrescriptionItem] and returns the resulting row.
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
  /// The returned [PrescriptionItem] will have its `id` field set.
  Future<PrescriptionItem?> upsertRow(
    _is.DatabaseSession session,
    PrescriptionItem row, {
    required _is.ColumnSelections<PrescriptionItemTable> conflictColumns,
    _is.ColumnSelections<PrescriptionItemTable>? updateColumns,
    _is.WhereExpressionBuilder<PrescriptionItemTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<PrescriptionItem>(
      row,
      conflictColumns: conflictColumns(PrescriptionItem.t),
      updateColumns: updateColumns?.call(PrescriptionItem.t),
      updateWhere: updateWhere?.call(PrescriptionItem.t),
      transaction: transaction,
    );
  }

  /// Updates all [PrescriptionItem]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PrescriptionItem>> update(
    _is.DatabaseSession session,
    List<PrescriptionItem> rows, {
    _is.ColumnSelections<PrescriptionItemTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<PrescriptionItem>(
      rows,
      columns: columns?.call(PrescriptionItem.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [PrescriptionItem]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<PrescriptionItem> updateRow(
    _is.DatabaseSession session,
    PrescriptionItem row, {
    _is.ColumnSelections<PrescriptionItemTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<PrescriptionItem>(
      row,
      columns: columns?.call(PrescriptionItem.t),
      transaction: transaction,
    );
  }

  /// Updates a single [PrescriptionItem] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<PrescriptionItem?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<PrescriptionItemUpdateTable>
    columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<PrescriptionItem>(
      id,
      columnValues: columnValues(PrescriptionItem.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [PrescriptionItem]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<PrescriptionItem>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<PrescriptionItemUpdateTable>
    columnValues,
    required _is.WhereExpressionBuilder<PrescriptionItemTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<PrescriptionItem>(
      columnValues: columnValues(PrescriptionItem.t.updateTable),
      where: where(PrescriptionItem.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [PrescriptionItem]s in the list and returns the deleted rows.
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
  Future<List<PrescriptionItem>> delete(
    _is.DatabaseSession session,
    List<PrescriptionItem> rows, {
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<PrescriptionItem>(
      rows,
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [PrescriptionItem].
  Future<PrescriptionItem> deleteRow(
    _is.DatabaseSession session,
    PrescriptionItem row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<PrescriptionItem>(
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
  Future<List<PrescriptionItem>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PrescriptionItemTable> where,
    _is.OrderByBuilder<PrescriptionItemTable>? orderBy,
    _is.OrderByListBuilder<PrescriptionItemTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<PrescriptionItem>(
      where: where(PrescriptionItem.t),
      orderBy: orderBy?.call(PrescriptionItem.t),
      orderByList: orderByList?.call(PrescriptionItem.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PrescriptionItemTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<PrescriptionItem>(
      where: where?.call(PrescriptionItem.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [PrescriptionItem] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PrescriptionItemTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<PrescriptionItem>(
      where: where(PrescriptionItem.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
