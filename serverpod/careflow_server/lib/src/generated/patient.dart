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

abstract class Patient
    implements _is.TableRow<int?>, _is.ProtocolSerialization {
  Patient._({
    this.id,
    required this.patientId,
    required this.userId,
    this.age,
    String? gender,
    String? bloodGroup,
    this.abhaId,
    this.emergencyContactName,
    this.emergencyContactPhone,
    this.address,
    this.registrationDate,
    this.createdAt,
    this.updatedAt,
  }) : gender = gender ?? 'Male',
       bloodGroup = bloodGroup ?? 'Unknown';

  factory Patient({
    int? id,
    required String patientId,
    required int userId,
    int? age,
    String? gender,
    String? bloodGroup,
    String? abhaId,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? address,
    DateTime? registrationDate,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _PatientImpl;

  factory Patient.fromJson(Map<String, dynamic> jsonSerialization) {
    return Patient(
      id: jsonSerialization['id'] as int?,
      patientId: jsonSerialization['patientId'] as String,
      userId: jsonSerialization['userId'] as int,
      age: jsonSerialization['age'] as int?,
      gender: jsonSerialization['gender'] as String?,
      bloodGroup: jsonSerialization['bloodGroup'] as String?,
      abhaId: jsonSerialization['abhaId'] as String?,
      emergencyContactName:
          jsonSerialization['emergencyContactName'] as String?,
      emergencyContactPhone:
          jsonSerialization['emergencyContactPhone'] as String?,
      address: jsonSerialization['address'] as String?,
      registrationDate: jsonSerialization['registrationDate'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(
              jsonSerialization['registrationDate'],
            ),
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = PatientTable();

  static const db = PatientRepository._();

  @override
  int? id;

  String patientId;

  int userId;

  int? age;

  String gender;

  String bloodGroup;

  String? abhaId;

  String? emergencyContactName;

  String? emergencyContactPhone;

  String? address;

  DateTime? registrationDate;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [Patient]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  Patient copyWith({
    int? id,
    String? patientId,
    int? userId,
    int? age,
    String? gender,
    String? bloodGroup,
    String? abhaId,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? address,
    DateTime? registrationDate = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Patient',
      if (id != null) 'id': id,
      'patientId': patientId,
      'userId': userId,
      if (age != null) 'age': age,
      'gender': gender,
      'bloodGroup': bloodGroup,
      if (abhaId != null) 'abhaId': abhaId,
      if (emergencyContactName != null)
        'emergencyContactName': emergencyContactName,
      if (emergencyContactPhone != null)
        'emergencyContactPhone': emergencyContactPhone,
      if (address != null) 'address': address,
      if (registrationDate != null)
        'registrationDate': registrationDate?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Patient',
      if (id != null) 'id': id,
      'patientId': patientId,
      'userId': userId,
      if (age != null) 'age': age,
      'gender': gender,
      'bloodGroup': bloodGroup,
      if (abhaId != null) 'abhaId': abhaId,
      if (emergencyContactName != null)
        'emergencyContactName': emergencyContactName,
      if (emergencyContactPhone != null)
        'emergencyContactPhone': emergencyContactPhone,
      if (address != null) 'address': address,
      if (registrationDate != null)
        'registrationDate': registrationDate?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static PatientInclude include() {
    return PatientInclude._();
  }

  static PatientIncludeList includeList({
    _is.WhereExpressionBuilder<PatientTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    PatientInclude? include,
  }) {
    return PatientIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _PatientImpl extends Patient {
  _PatientImpl({
    int? id,
    required String patientId,
    required int userId,
    int? age,
    String? gender,
    String? bloodGroup,
    String? abhaId,
    String? emergencyContactName,
    String? emergencyContactPhone,
    String? address,
    DateTime? registrationDate,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         patientId: patientId,
         userId: userId,
         age: age,
         gender: gender,
         bloodGroup: bloodGroup,
         abhaId: abhaId,
         emergencyContactName: emergencyContactName,
         emergencyContactPhone: emergencyContactPhone,
         address: address,
         registrationDate: registrationDate,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Patient]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  Patient copyWith({
    Object? id = _Undefined,
    String? patientId,
    int? userId,
    Object? age = _Undefined,
    String? gender,
    String? bloodGroup,
    Object? abhaId = _Undefined,
    Object? emergencyContactName = _Undefined,
    Object? emergencyContactPhone = _Undefined,
    Object? address = _Undefined,
    DateTime? registrationDate = const _is.$UndefinedDateTime(),
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return Patient(
      id: id is int? ? id : this.id,
      patientId: patientId ?? this.patientId,
      userId: userId ?? this.userId,
      age: age is int? ? age : this.age,
      gender: gender ?? this.gender,
      bloodGroup: bloodGroup ?? this.bloodGroup,
      abhaId: abhaId is String? ? abhaId : this.abhaId,
      emergencyContactName: emergencyContactName is String?
          ? emergencyContactName
          : this.emergencyContactName,
      emergencyContactPhone: emergencyContactPhone is String?
          ? emergencyContactPhone
          : this.emergencyContactPhone,
      address: address is String? ? address : this.address,
      registrationDate: registrationDate is _is.UndefinedSentinel
          ? this.registrationDate
          : registrationDate,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class PatientUpdateTable extends _is.UpdateTable<PatientTable> {
  PatientUpdateTable(super.table);

  _is.ColumnValue<String, String> patientId(String value) => _is.ColumnValue(
    table.patientId,
    value,
  );

  _is.ColumnValue<int, int> userId(int value) => _is.ColumnValue(
    table.userId,
    value,
  );

  _is.ColumnValue<int, int> age(int? value) => _is.ColumnValue(
    table.age,
    value,
  );

  _is.ColumnValue<String, String> gender(String value) => _is.ColumnValue(
    table.gender,
    value,
  );

  _is.ColumnValue<String, String> bloodGroup(String value) => _is.ColumnValue(
    table.bloodGroup,
    value,
  );

  _is.ColumnValue<String, String> abhaId(String? value) => _is.ColumnValue(
    table.abhaId,
    value,
  );

  _is.ColumnValue<String, String> emergencyContactName(String? value) =>
      _is.ColumnValue(
        table.emergencyContactName,
        value,
      );

  _is.ColumnValue<String, String> emergencyContactPhone(String? value) =>
      _is.ColumnValue(
        table.emergencyContactPhone,
        value,
      );

  _is.ColumnValue<String, String> address(String? value) => _is.ColumnValue(
    table.address,
    value,
  );

  _is.ColumnValue<DateTime, DateTime> registrationDate(DateTime? value) =>
      _is.ColumnValue(
        table.registrationDate,
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

class PatientTable extends _is.Table<int?> {
  PatientTable({super.tableRelation}) : super(tableName: 'careflow_patients') {
    updateTable = PatientUpdateTable(this);
    patientId = _is.ColumnString(
      'patientId',
      this,
    );
    userId = _is.ColumnInt(
      'userId',
      this,
    );
    age = _is.ColumnInt(
      'age',
      this,
    );
    gender = _is.ColumnString(
      'gender',
      this,
      hasDefault: true,
    );
    bloodGroup = _is.ColumnString(
      'bloodGroup',
      this,
      hasDefault: true,
    );
    abhaId = _is.ColumnString(
      'abhaId',
      this,
    );
    emergencyContactName = _is.ColumnString(
      'emergencyContactName',
      this,
    );
    emergencyContactPhone = _is.ColumnString(
      'emergencyContactPhone',
      this,
    );
    address = _is.ColumnString(
      'address',
      this,
    );
    registrationDate = _is.ColumnDateTime(
      'registrationDate',
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

  late final PatientUpdateTable updateTable;

  late final _is.ColumnString patientId;

  late final _is.ColumnInt userId;

  late final _is.ColumnInt age;

  late final _is.ColumnString gender;

  late final _is.ColumnString bloodGroup;

  late final _is.ColumnString abhaId;

  late final _is.ColumnString emergencyContactName;

  late final _is.ColumnString emergencyContactPhone;

  late final _is.ColumnString address;

  late final _is.ColumnDateTime registrationDate;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    patientId,
    userId,
    age,
    gender,
    bloodGroup,
    abhaId,
    emergencyContactName,
    emergencyContactPhone,
    address,
    registrationDate,
    createdAt,
    updatedAt,
  ];
}

class PatientInclude extends _is.IncludeObject {
  PatientInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => Patient.t;
}

class PatientIncludeList extends _is.IncludeList {
  PatientIncludeList._({
    _is.WhereExpressionBuilder<PatientTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(Patient.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => Patient.t;
}

class PatientRepository {
  const PatientRepository._();

  /// Returns a list of [Patient]s matching the given query parameters.
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
  Future<List<Patient>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PatientTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<Patient>(
      where: where?.call(Patient.t),
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [Patient]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `Patient.t`.
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
  _ida.Stream<List<Patient>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PatientTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<Patient>(
      where: where?.call(Patient.t),
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [Patient] matching the given query parameters.
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
  Future<Patient?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PatientTable>? where,
    int? offset,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<Patient>(
      where: where?.call(Patient.t),
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [Patient] by its [id] or null if no such row exists.
  Future<Patient?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<Patient>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [Patient]s in the list and returns the inserted rows.
  ///
  /// The returned [Patient]s will have their `id` fields set.
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
  Future<List<Patient>> insert(
    _is.DatabaseSession session,
    List<Patient> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<Patient>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [Patient] and returns the inserted row.
  ///
  /// The returned [Patient] will have its `id` field set.
  Future<Patient> insertRow(
    _is.DatabaseSession session,
    Patient row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<Patient>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [Patient]s in the list and returns the resulting rows.
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
  /// The returned [Patient]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Patient>> upsert(
    _is.DatabaseSession session,
    List<Patient> rows, {
    required _is.ColumnSelections<PatientTable> conflictColumns,
    _is.ColumnSelections<PatientTable>? updateColumns,
    _is.WhereExpressionBuilder<PatientTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<Patient>(
      rows,
      conflictColumns: conflictColumns(Patient.t),
      updateColumns: updateColumns?.call(Patient.t),
      updateWhere: updateWhere?.call(Patient.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [Patient] and returns the resulting row.
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
  /// The returned [Patient] will have its `id` field set.
  Future<Patient?> upsertRow(
    _is.DatabaseSession session,
    Patient row, {
    required _is.ColumnSelections<PatientTable> conflictColumns,
    _is.ColumnSelections<PatientTable>? updateColumns,
    _is.WhereExpressionBuilder<PatientTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<Patient>(
      row,
      conflictColumns: conflictColumns(Patient.t),
      updateColumns: updateColumns?.call(Patient.t),
      updateWhere: updateWhere?.call(Patient.t),
      transaction: transaction,
    );
  }

  /// Updates all [Patient]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Patient>> update(
    _is.DatabaseSession session,
    List<Patient> rows, {
    _is.ColumnSelections<PatientTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<Patient>(
      rows,
      columns: columns?.call(Patient.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [Patient]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<Patient> updateRow(
    _is.DatabaseSession session,
    Patient row, {
    _is.ColumnSelections<PatientTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<Patient>(
      row,
      columns: columns?.call(Patient.t),
      transaction: transaction,
    );
  }

  /// Updates a single [Patient] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<Patient?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<PatientUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<Patient>(
      id,
      columnValues: columnValues(Patient.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [Patient]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Patient>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<PatientUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<PatientTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<Patient>(
      columnValues: columnValues(Patient.t.updateTable),
      where: where(Patient.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [Patient]s in the list and returns the deleted rows.
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
  Future<List<Patient>> delete(
    _is.DatabaseSession session,
    List<Patient> rows, {
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<Patient>(
      rows,
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [Patient].
  Future<Patient> deleteRow(
    _is.DatabaseSession session,
    Patient row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<Patient>(
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
  Future<List<Patient>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PatientTable> where,
    _is.OrderByBuilder<PatientTable>? orderBy,
    _is.OrderByListBuilder<PatientTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<Patient>(
      where: where(Patient.t),
      orderBy: orderBy?.call(Patient.t),
      orderByList: orderByList?.call(Patient.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<PatientTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<Patient>(
      where: where?.call(Patient.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [Patient] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<PatientTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<Patient>(
      where: where(Patient.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
