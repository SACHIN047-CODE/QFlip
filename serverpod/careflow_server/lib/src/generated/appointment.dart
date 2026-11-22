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

abstract class Appointment
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  Appointment._({
    this.id,
    required this.appointmentNumber,
    required this.patientId,
    this.doctorId,
    required this.departmentId,
    required this.appointmentDate,
    required this.timeSlot,
    String? status,
    this.reason,
    this.symptoms,
    this.notes,
    this.createdAt,
    this.updatedAt,
  }) : status = status ?? 'scheduled';

  factory Appointment({
    int? id,
    required String appointmentNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    required DateTime appointmentDate,
    required String timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _AppointmentImpl;

  factory Appointment.fromJson(Map<String, dynamic> jsonSerialization) {
    return Appointment(
      id: jsonSerialization['id'] as int?,
      appointmentNumber: jsonSerialization['appointmentNumber'] as String,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int?,
      departmentId: jsonSerialization['departmentId'] as int,
      appointmentDate: _is.DateTimeJsonExtension.fromJson(
        jsonSerialization['appointmentDate'],
      ),
      timeSlot: jsonSerialization['timeSlot'] as String,
      status: jsonSerialization['status'] as String?,
      reason: jsonSerialization['reason'] as String?,
      symptoms: jsonSerialization['symptoms'] as String?,
      notes: jsonSerialization['notes'] as String?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = AppointmentTable();

  static const db = AppointmentRepository._();

  @override
  int? id;

  String appointmentNumber;

  int patientId;

  int? doctorId;

  int departmentId;

  DateTime appointmentDate;

  String timeSlot;

  String status;

  String? reason;

  String? symptoms;

  String? notes;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [Appointment]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  Appointment copyWith({
    int? id,
    String? appointmentNumber,
    int? patientId,
    int? doctorId,
    int? departmentId,
    DateTime? appointmentDate,
    String? timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Appointment',
      if (id != null) 'id': id,
      'appointmentNumber': appointmentNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'appointmentDate': appointmentDate.toJson(),
      'timeSlot': timeSlot,
      'status': status,
      if (reason != null) 'reason': reason,
      if (symptoms != null) 'symptoms': symptoms,
      if (notes != null) 'notes': notes,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Appointment',
      if (id != null) 'id': id,
      'appointmentNumber': appointmentNumber,
      'patientId': patientId,
      if (doctorId != null) 'doctorId': doctorId,
      'departmentId': departmentId,
      'appointmentDate': appointmentDate.toJson(),
      'timeSlot': timeSlot,
      'status': status,
      if (reason != null) 'reason': reason,
      if (symptoms != null) 'symptoms': symptoms,
      if (notes != null) 'notes': notes,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static AppointmentInclude include() {
    return AppointmentInclude._();
  }

  static AppointmentIncludeList includeList({
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    AppointmentInclude? include,
  }) {
    return AppointmentIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _AppointmentImpl extends Appointment {
  _AppointmentImpl({
    int? id,
    required String appointmentNumber,
    required int patientId,
    int? doctorId,
    required int departmentId,
    required DateTime appointmentDate,
    required String timeSlot,
    String? status,
    String? reason,
    String? symptoms,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         appointmentNumber: appointmentNumber,
         patientId: patientId,
         doctorId: doctorId,
         departmentId: departmentId,
         appointmentDate: appointmentDate,
         timeSlot: timeSlot,
         status: status,
         reason: reason,
         symptoms: symptoms,
         notes: notes,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Appointment]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  Appointment copyWith({
    Object? id = _Undefined,
    String? appointmentNumber,
    int? patientId,
    Object? doctorId = _Undefined,
    int? departmentId,
    DateTime? appointmentDate,
    String? timeSlot,
    String? status,
    Object? reason = _Undefined,
    Object? symptoms = _Undefined,
    Object? notes = _Undefined,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return Appointment(
      id: id is int? ? id : this.id,
      appointmentNumber: appointmentNumber ?? this.appointmentNumber,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId is int? ? doctorId : this.doctorId,
      departmentId: departmentId ?? this.departmentId,
      appointmentDate: appointmentDate ?? this.appointmentDate,
      timeSlot: timeSlot ?? this.timeSlot,
      status: status ?? this.status,
      reason: reason is String? ? reason : this.reason,
      symptoms: symptoms is String? ? symptoms : this.symptoms,
      notes: notes is String? ? notes : this.notes,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class AppointmentUpdateTable extends _is.UpdateTable<AppointmentTable> {
  AppointmentUpdateTable(super.table);

  _is.ColumnValue<String, String> appointmentNumber(String value) =>
      _is.ColumnValue(
        table.appointmentNumber,
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

  _is.ColumnValue<DateTime, DateTime> appointmentDate(DateTime value) =>
      _is.ColumnValue(
        table.appointmentDate,
        value,
      );

  _is.ColumnValue<String, String> timeSlot(String value) => _is.ColumnValue(
    table.timeSlot,
    value,
  );

  _is.ColumnValue<String, String> status(String value) => _is.ColumnValue(
    table.status,
    value,
  );

  _is.ColumnValue<String, String> reason(String? value) => _is.ColumnValue(
    table.reason,
    value,
  );

  _is.ColumnValue<String, String> symptoms(String? value) => _is.ColumnValue(
    table.symptoms,
    value,
  );

  _is.ColumnValue<String, String> notes(String? value) => _is.ColumnValue(
    table.notes,
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

class AppointmentTable extends _is.Table<int?> {
  AppointmentTable({super.tableRelation})
    : super(tableName: 'careflow_appointments') {
    updateTable = AppointmentUpdateTable(this);
    appointmentNumber = _is.ColumnString(
      'appointmentNumber',
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
    appointmentDate = _is.ColumnDateTime(
      'appointmentDate',
      this,
    );
    timeSlot = _is.ColumnString(
      'timeSlot',
      this,
    );
    status = _is.ColumnString(
      'status',
      this,
      hasDefault: true,
    );
    reason = _is.ColumnString(
      'reason',
      this,
    );
    symptoms = _is.ColumnString(
      'symptoms',
      this,
    );
    notes = _is.ColumnString(
      'notes',
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

  late final AppointmentUpdateTable updateTable;

  late final _is.ColumnString appointmentNumber;

  late final _is.ColumnInt patientId;

  late final _is.ColumnInt doctorId;

  late final _is.ColumnInt departmentId;

  late final _is.ColumnDateTime appointmentDate;

  late final _is.ColumnString timeSlot;

  late final _is.ColumnString status;

  late final _is.ColumnString reason;

  late final _is.ColumnString symptoms;

  late final _is.ColumnString notes;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    appointmentNumber,
    patientId,
    doctorId,
    departmentId,
    appointmentDate,
    timeSlot,
    status,
    reason,
    symptoms,
    notes,
    createdAt,
    updatedAt,
  ];
}

class AppointmentInclude extends _is.IncludeObject {
  AppointmentInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => Appointment.t;
}

class AppointmentIncludeList extends _is.IncludeList {
  AppointmentIncludeList._({
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(Appointment.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => Appointment.t;
}

class AppointmentRepository {
  const AppointmentRepository._();

  /// Returns a list of [Appointment]s matching the given query parameters.
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
  Future<List<Appointment>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<Appointment>(
      where: where?.call(Appointment.t),
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [Appointment]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `Appointment.t`.
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
  _ida.Stream<List<Appointment>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<Appointment>(
      where: where?.call(Appointment.t),
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [Appointment] matching the given query parameters.
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
  Future<Appointment?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    int? offset,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<Appointment>(
      where: where?.call(Appointment.t),
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [Appointment] by its [id] or null if no such row exists.
  Future<Appointment?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<Appointment>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [Appointment]s in the list and returns the inserted rows.
  ///
  /// The returned [Appointment]s will have their `id` fields set.
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
  Future<List<Appointment>> insert(
    _is.DatabaseSession session,
    List<Appointment> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<Appointment>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [Appointment] and returns the inserted row.
  ///
  /// The returned [Appointment] will have its `id` field set.
  Future<Appointment> insertRow(
    _is.DatabaseSession session,
    Appointment row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<Appointment>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [Appointment]s in the list and returns the resulting rows.
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
  /// The returned [Appointment]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Appointment>> upsert(
    _is.DatabaseSession session,
    List<Appointment> rows, {
    required _is.ColumnSelections<AppointmentTable> conflictColumns,
    _is.ColumnSelections<AppointmentTable>? updateColumns,
    _is.WhereExpressionBuilder<AppointmentTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<Appointment>(
      rows,
      conflictColumns: conflictColumns(Appointment.t),
      updateColumns: updateColumns?.call(Appointment.t),
      updateWhere: updateWhere?.call(Appointment.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [Appointment] and returns the resulting row.
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
  /// The returned [Appointment] will have its `id` field set.
  Future<Appointment?> upsertRow(
    _is.DatabaseSession session,
    Appointment row, {
    required _is.ColumnSelections<AppointmentTable> conflictColumns,
    _is.ColumnSelections<AppointmentTable>? updateColumns,
    _is.WhereExpressionBuilder<AppointmentTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<Appointment>(
      row,
      conflictColumns: conflictColumns(Appointment.t),
      updateColumns: updateColumns?.call(Appointment.t),
      updateWhere: updateWhere?.call(Appointment.t),
      transaction: transaction,
    );
  }

  /// Updates all [Appointment]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Appointment>> update(
    _is.DatabaseSession session,
    List<Appointment> rows, {
    _is.ColumnSelections<AppointmentTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<Appointment>(
      rows,
      columns: columns?.call(Appointment.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [Appointment]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<Appointment> updateRow(
    _is.DatabaseSession session,
    Appointment row, {
    _is.ColumnSelections<AppointmentTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<Appointment>(
      row,
      columns: columns?.call(Appointment.t),
      transaction: transaction,
    );
  }

  /// Updates a single [Appointment] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<Appointment?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<AppointmentUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<Appointment>(
      id,
      columnValues: columnValues(Appointment.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [Appointment]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Appointment>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<AppointmentUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<AppointmentTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<Appointment>(
      columnValues: columnValues(Appointment.t.updateTable),
      where: where(Appointment.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [Appointment]s in the list and returns the deleted rows.
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
  Future<List<Appointment>> delete(
    _is.DatabaseSession session,
    List<Appointment> rows, {
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<Appointment>(
      rows,
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [Appointment].
  Future<Appointment> deleteRow(
    _is.DatabaseSession session,
    Appointment row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<Appointment>(
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
  Future<List<Appointment>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<AppointmentTable> where,
    _is.OrderByBuilder<AppointmentTable>? orderBy,
    _is.OrderByListBuilder<AppointmentTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<Appointment>(
      where: where(Appointment.t),
      orderBy: orderBy?.call(Appointment.t),
      orderByList: orderByList?.call(Appointment.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<AppointmentTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<Appointment>(
      where: where?.call(Appointment.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [Appointment] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<AppointmentTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<Appointment>(
      where: where(Appointment.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
