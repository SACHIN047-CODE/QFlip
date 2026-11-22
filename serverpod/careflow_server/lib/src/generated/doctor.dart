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

abstract class Doctor implements _is.TableRow<int?>, _is.ProtocolSerialization {
  Doctor._({
    this.id,
    required this.doctorId,
    required this.userId,
    required this.departmentId,
    required this.specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    this.createdAt,
    this.updatedAt,
  }) : qualification = qualification ?? 'MBBS, MD',
       roomNumber = roomNumber ?? 'Room 101',
       opdShiftStart = opdShiftStart ?? '09:00 AM',
       opdShiftEnd = opdShiftEnd ?? '02:00 PM',
       isAvailable = isAvailable ?? true,
       maxDailyPatients = maxDailyPatients ?? 50,
       consultationFee = consultationFee ?? 0.0,
       averageConsultationTimeMinutes = averageConsultationTimeMinutes ?? 10,
       bufferCapacityLimit = bufferCapacityLimit ?? 5;

  factory Doctor({
    int? id,
    required String doctorId,
    required int userId,
    required int departmentId,
    required String specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _DoctorImpl;

  factory Doctor.fromJson(Map<String, dynamic> jsonSerialization) {
    return Doctor(
      id: jsonSerialization['id'] as int?,
      doctorId: jsonSerialization['doctorId'] as String,
      userId: jsonSerialization['userId'] as int,
      departmentId: jsonSerialization['departmentId'] as int,
      specialization: jsonSerialization['specialization'] as String,
      qualification: jsonSerialization['qualification'] as String?,
      roomNumber: jsonSerialization['roomNumber'] as String?,
      opdShiftStart: jsonSerialization['opdShiftStart'] as String?,
      opdShiftEnd: jsonSerialization['opdShiftEnd'] as String?,
      isAvailable: jsonSerialization['isAvailable'] == null
          ? null
          : _is.BoolJsonExtension.fromJson(jsonSerialization['isAvailable']),
      maxDailyPatients: jsonSerialization['maxDailyPatients'] as int?,
      consultationFee: (jsonSerialization['consultationFee'] as num?)
          ?.toDouble(),
      averageConsultationTimeMinutes:
          jsonSerialization['averageConsultationTimeMinutes'] as int?,
      bufferCapacityLimit: jsonSerialization['bufferCapacityLimit'] as int?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _is.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  static final t = DoctorTable();

  static const db = DoctorRepository._();

  @override
  int? id;

  String doctorId;

  int userId;

  int departmentId;

  String specialization;

  String qualification;

  String roomNumber;

  String opdShiftStart;

  String opdShiftEnd;

  bool isAvailable;

  int maxDailyPatients;

  double consultationFee;

  int averageConsultationTimeMinutes;

  int bufferCapacityLimit;

  DateTime? createdAt;

  DateTime? updatedAt;

  @override
  _is.Table<int?> get table => t;

  /// Returns a shallow copy of this [Doctor]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  Doctor copyWith({
    int? id,
    String? doctorId,
    int? userId,
    int? departmentId,
    String? specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Doctor',
      if (id != null) 'id': id,
      'doctorId': doctorId,
      'userId': userId,
      'departmentId': departmentId,
      'specialization': specialization,
      'qualification': qualification,
      'roomNumber': roomNumber,
      'opdShiftStart': opdShiftStart,
      'opdShiftEnd': opdShiftEnd,
      'isAvailable': isAvailable,
      'maxDailyPatients': maxDailyPatients,
      'consultationFee': consultationFee,
      'averageConsultationTimeMinutes': averageConsultationTimeMinutes,
      'bufferCapacityLimit': bufferCapacityLimit,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Doctor',
      if (id != null) 'id': id,
      'doctorId': doctorId,
      'userId': userId,
      'departmentId': departmentId,
      'specialization': specialization,
      'qualification': qualification,
      'roomNumber': roomNumber,
      'opdShiftStart': opdShiftStart,
      'opdShiftEnd': opdShiftEnd,
      'isAvailable': isAvailable,
      'maxDailyPatients': maxDailyPatients,
      'consultationFee': consultationFee,
      'averageConsultationTimeMinutes': averageConsultationTimeMinutes,
      'bufferCapacityLimit': bufferCapacityLimit,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  static DoctorInclude include() {
    return DoctorInclude._();
  }

  static DoctorIncludeList includeList({
    _is.WhereExpressionBuilder<DoctorTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    DoctorInclude? include,
  }) {
    return DoctorIncludeList._(
      where: where,
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      include: include,
    );
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _DoctorImpl extends Doctor {
  _DoctorImpl({
    int? id,
    required String doctorId,
    required int userId,
    required int departmentId,
    required String specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         doctorId: doctorId,
         userId: userId,
         departmentId: departmentId,
         specialization: specialization,
         qualification: qualification,
         roomNumber: roomNumber,
         opdShiftStart: opdShiftStart,
         opdShiftEnd: opdShiftEnd,
         isAvailable: isAvailable,
         maxDailyPatients: maxDailyPatients,
         consultationFee: consultationFee,
         averageConsultationTimeMinutes: averageConsultationTimeMinutes,
         bufferCapacityLimit: bufferCapacityLimit,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Doctor]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  Doctor copyWith({
    Object? id = _Undefined,
    String? doctorId,
    int? userId,
    int? departmentId,
    String? specialization,
    String? qualification,
    String? roomNumber,
    String? opdShiftStart,
    String? opdShiftEnd,
    bool? isAvailable,
    int? maxDailyPatients,
    double? consultationFee,
    int? averageConsultationTimeMinutes,
    int? bufferCapacityLimit,
    DateTime? createdAt = const _is.$UndefinedDateTime(),
    DateTime? updatedAt = const _is.$UndefinedDateTime(),
  }) {
    return Doctor(
      id: id is int? ? id : this.id,
      doctorId: doctorId ?? this.doctorId,
      userId: userId ?? this.userId,
      departmentId: departmentId ?? this.departmentId,
      specialization: specialization ?? this.specialization,
      qualification: qualification ?? this.qualification,
      roomNumber: roomNumber ?? this.roomNumber,
      opdShiftStart: opdShiftStart ?? this.opdShiftStart,
      opdShiftEnd: opdShiftEnd ?? this.opdShiftEnd,
      isAvailable: isAvailable ?? this.isAvailable,
      maxDailyPatients: maxDailyPatients ?? this.maxDailyPatients,
      consultationFee: consultationFee ?? this.consultationFee,
      averageConsultationTimeMinutes:
          averageConsultationTimeMinutes ?? this.averageConsultationTimeMinutes,
      bufferCapacityLimit: bufferCapacityLimit ?? this.bufferCapacityLimit,
      createdAt: createdAt is _is.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _is.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}

class DoctorUpdateTable extends _is.UpdateTable<DoctorTable> {
  DoctorUpdateTable(super.table);

  _is.ColumnValue<String, String> doctorId(String value) => _is.ColumnValue(
    table.doctorId,
    value,
  );

  _is.ColumnValue<int, int> userId(int value) => _is.ColumnValue(
    table.userId,
    value,
  );

  _is.ColumnValue<int, int> departmentId(int value) => _is.ColumnValue(
    table.departmentId,
    value,
  );

  _is.ColumnValue<String, String> specialization(String value) =>
      _is.ColumnValue(
        table.specialization,
        value,
      );

  _is.ColumnValue<String, String> qualification(String value) =>
      _is.ColumnValue(
        table.qualification,
        value,
      );

  _is.ColumnValue<String, String> roomNumber(String value) => _is.ColumnValue(
    table.roomNumber,
    value,
  );

  _is.ColumnValue<String, String> opdShiftStart(String value) =>
      _is.ColumnValue(
        table.opdShiftStart,
        value,
      );

  _is.ColumnValue<String, String> opdShiftEnd(String value) => _is.ColumnValue(
    table.opdShiftEnd,
    value,
  );

  _is.ColumnValue<bool, bool> isAvailable(bool value) => _is.ColumnValue(
    table.isAvailable,
    value,
  );

  _is.ColumnValue<int, int> maxDailyPatients(int value) => _is.ColumnValue(
    table.maxDailyPatients,
    value,
  );

  _is.ColumnValue<double, double> consultationFee(double value) =>
      _is.ColumnValue(
        table.consultationFee,
        value,
      );

  _is.ColumnValue<int, int> averageConsultationTimeMinutes(int value) =>
      _is.ColumnValue(
        table.averageConsultationTimeMinutes,
        value,
      );

  _is.ColumnValue<int, int> bufferCapacityLimit(int value) => _is.ColumnValue(
    table.bufferCapacityLimit,
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

class DoctorTable extends _is.Table<int?> {
  DoctorTable({super.tableRelation}) : super(tableName: 'careflow_doctors') {
    updateTable = DoctorUpdateTable(this);
    doctorId = _is.ColumnString(
      'doctorId',
      this,
    );
    userId = _is.ColumnInt(
      'userId',
      this,
    );
    departmentId = _is.ColumnInt(
      'departmentId',
      this,
    );
    specialization = _is.ColumnString(
      'specialization',
      this,
    );
    qualification = _is.ColumnString(
      'qualification',
      this,
      hasDefault: true,
    );
    roomNumber = _is.ColumnString(
      'roomNumber',
      this,
      hasDefault: true,
    );
    opdShiftStart = _is.ColumnString(
      'opdShiftStart',
      this,
      hasDefault: true,
    );
    opdShiftEnd = _is.ColumnString(
      'opdShiftEnd',
      this,
      hasDefault: true,
    );
    isAvailable = _is.ColumnBool(
      'isAvailable',
      this,
      hasDefault: true,
    );
    maxDailyPatients = _is.ColumnInt(
      'maxDailyPatients',
      this,
      hasDefault: true,
    );
    consultationFee = _is.ColumnDouble(
      'consultationFee',
      this,
      hasDefault: true,
    );
    averageConsultationTimeMinutes = _is.ColumnInt(
      'averageConsultationTimeMinutes',
      this,
      hasDefault: true,
    );
    bufferCapacityLimit = _is.ColumnInt(
      'bufferCapacityLimit',
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

  late final DoctorUpdateTable updateTable;

  late final _is.ColumnString doctorId;

  late final _is.ColumnInt userId;

  late final _is.ColumnInt departmentId;

  late final _is.ColumnString specialization;

  late final _is.ColumnString qualification;

  late final _is.ColumnString roomNumber;

  late final _is.ColumnString opdShiftStart;

  late final _is.ColumnString opdShiftEnd;

  late final _is.ColumnBool isAvailable;

  late final _is.ColumnInt maxDailyPatients;

  late final _is.ColumnDouble consultationFee;

  late final _is.ColumnInt averageConsultationTimeMinutes;

  late final _is.ColumnInt bufferCapacityLimit;

  late final _is.ColumnDateTime createdAt;

  late final _is.ColumnDateTime updatedAt;

  @override
  List<_is.Column> get columns => [
    id,
    doctorId,
    userId,
    departmentId,
    specialization,
    qualification,
    roomNumber,
    opdShiftStart,
    opdShiftEnd,
    isAvailable,
    maxDailyPatients,
    consultationFee,
    averageConsultationTimeMinutes,
    bufferCapacityLimit,
    createdAt,
    updatedAt,
  ];
}

class DoctorInclude extends _is.IncludeObject {
  DoctorInclude._();

  @override
  Map<String, _is.Include?> get includes => {};

  @override
  _is.Table<int?> get table => Doctor.t;
}

class DoctorIncludeList extends _is.IncludeList {
  DoctorIncludeList._({
    _is.WhereExpressionBuilder<DoctorTable>? where,
    super.limit,
    super.offset,
    super.orderBy,
    super.orderByList,
    super.include,
  }) {
    super.where = where?.call(Doctor.t);
  }

  @override
  Map<String, _is.Include?> get includes => include?.includes ?? {};

  @override
  _is.Table<int?> get table => Doctor.t;
}

class DoctorRepository {
  const DoctorRepository._();

  /// Returns a list of [Doctor]s matching the given query parameters.
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
  Future<List<Doctor>> find(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<DoctorTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.find<Doctor>(
      where: where?.call(Doctor.t),
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      limit: limit,
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Emits [Doctor]s matching the given query parameters every time the
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
  /// to that set. Pass [Table] instances such as `Doctor.t`.
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
  _ida.Stream<List<Doctor>> watch(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<DoctorTable>? where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    Duration? throttle = const Duration(milliseconds: 30),
    Iterable<_is.Table>? alsoTriggerOnTables,
  }) {
    return session.db.watch<Doctor>(
      where: where?.call(Doctor.t),
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      limit: limit,
      offset: offset,
      throttle: throttle,
      alsoTriggerOnTables: alsoTriggerOnTables,
    );
  }

  /// Returns the first matching [Doctor] matching the given query parameters.
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
  Future<Doctor?> findFirstRow(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<DoctorTable>? where,
    int? offset,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findFirstRow<Doctor>(
      where: where?.call(Doctor.t),
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      offset: offset,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Finds a single [Doctor] by its [id] or null if no such row exists.
  Future<Doctor?> findById(
    _is.DatabaseSession session,
    int id, {
    _is.Transaction? transaction,
    _is.LockMode? lockMode,
    _is.LockBehavior? lockBehavior,
  }) async {
    return session.db.findById<Doctor>(
      id,
      transaction: transaction,
      lockMode: lockMode,
      lockBehavior: lockBehavior,
    );
  }

  /// Inserts all [Doctor]s in the list and returns the inserted rows.
  ///
  /// The returned [Doctor]s will have their `id` fields set.
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
  Future<List<Doctor>> insert(
    _is.DatabaseSession session,
    List<Doctor> rows, {
    _is.Transaction? transaction,
    bool ignoreConflicts = false,
    bool noReturn = false,
  }) async {
    return session.db.insert<Doctor>(
      rows,
      transaction: transaction,
      ignoreConflicts: ignoreConflicts,
      noReturn: noReturn,
    );
  }

  /// Inserts a single [Doctor] and returns the inserted row.
  ///
  /// The returned [Doctor] will have its `id` field set.
  Future<Doctor> insertRow(
    _is.DatabaseSession session,
    Doctor row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.insertRow<Doctor>(
      row,
      transaction: transaction,
    );
  }

  /// Upserts all [Doctor]s in the list and returns the resulting rows.
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
  /// The returned [Doctor]s will have their `id` fields set.
  ///
  /// This is an atomic operation, meaning that if one of the rows fails,
  /// none of the rows will be affected.
  ///
  /// If [noReturn] is set to `true`, the resulting rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Doctor>> upsert(
    _is.DatabaseSession session,
    List<Doctor> rows, {
    required _is.ColumnSelections<DoctorTable> conflictColumns,
    _is.ColumnSelections<DoctorTable>? updateColumns,
    _is.WhereExpressionBuilder<DoctorTable>? updateWhere,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.upsert<Doctor>(
      rows,
      conflictColumns: conflictColumns(Doctor.t),
      updateColumns: updateColumns?.call(Doctor.t),
      updateWhere: updateWhere?.call(Doctor.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Upserts a single [Doctor] and returns the resulting row.
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
  /// The returned [Doctor] will have its `id` field set.
  Future<Doctor?> upsertRow(
    _is.DatabaseSession session,
    Doctor row, {
    required _is.ColumnSelections<DoctorTable> conflictColumns,
    _is.ColumnSelections<DoctorTable>? updateColumns,
    _is.WhereExpressionBuilder<DoctorTable>? updateWhere,
    _is.Transaction? transaction,
  }) async {
    return session.db.upsertRow<Doctor>(
      row,
      conflictColumns: conflictColumns(Doctor.t),
      updateColumns: updateColumns?.call(Doctor.t),
      updateWhere: updateWhere?.call(Doctor.t),
      transaction: transaction,
    );
  }

  /// Updates all [Doctor]s in the list and returns the updated rows. If
  /// [columns] is provided, only those columns will be updated. Defaults to
  /// all columns.
  /// This is an atomic operation, meaning that if one of the rows fails to
  /// update, none of the rows will be updated.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Doctor>> update(
    _is.DatabaseSession session,
    List<Doctor> rows, {
    _is.ColumnSelections<DoctorTable>? columns,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.update<Doctor>(
      rows,
      columns: columns?.call(Doctor.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Updates a single [Doctor]. The row needs to have its id set.
  /// Optionally, a list of [columns] can be provided to only update those
  /// columns. Defaults to all columns.
  Future<Doctor> updateRow(
    _is.DatabaseSession session,
    Doctor row, {
    _is.ColumnSelections<DoctorTable>? columns,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateRow<Doctor>(
      row,
      columns: columns?.call(Doctor.t),
      transaction: transaction,
    );
  }

  /// Updates a single [Doctor] by its [id] with the specified [columnValues].
  /// Returns the updated row or null if no row with the given id exists.
  Future<Doctor?> updateById(
    _is.DatabaseSession session,
    int id, {
    required _is.ColumnValueListBuilder<DoctorUpdateTable> columnValues,
    _is.Transaction? transaction,
  }) async {
    return session.db.updateById<Doctor>(
      id,
      columnValues: columnValues(Doctor.t.updateTable),
      transaction: transaction,
    );
  }

  /// Updates all [Doctor]s matching the [where] expression with the specified [columnValues].
  /// Returns the list of updated rows.
  ///
  /// If [noReturn] is set to `true`, the updated rows are not read back from
  /// the database and an empty list is returned. This avoids the overhead of
  /// transferring and deserializing the rows when the result is not needed.
  Future<List<Doctor>> updateWhere(
    _is.DatabaseSession session, {
    required _is.ColumnValueListBuilder<DoctorUpdateTable> columnValues,
    required _is.WhereExpressionBuilder<DoctorTable> where,
    int? limit,
    int? offset,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.updateWhere<Doctor>(
      columnValues: columnValues(Doctor.t.updateTable),
      where: where(Doctor.t),
      limit: limit,
      offset: offset,
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes all [Doctor]s in the list and returns the deleted rows.
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
  Future<List<Doctor>> delete(
    _is.DatabaseSession session,
    List<Doctor> rows, {
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.delete<Doctor>(
      rows,
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Deletes a single [Doctor].
  Future<Doctor> deleteRow(
    _is.DatabaseSession session,
    Doctor row, {
    _is.Transaction? transaction,
  }) async {
    return session.db.deleteRow<Doctor>(
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
  Future<List<Doctor>> deleteWhere(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<DoctorTable> where,
    _is.OrderByBuilder<DoctorTable>? orderBy,
    _is.OrderByListBuilder<DoctorTable>? orderByList,
    _is.Transaction? transaction,
    bool noReturn = false,
  }) async {
    return session.db.deleteWhere<Doctor>(
      where: where(Doctor.t),
      orderBy: orderBy?.call(Doctor.t),
      orderByList: orderByList?.call(Doctor.t),
      transaction: transaction,
      noReturn: noReturn,
    );
  }

  /// Counts the number of rows matching the [where] expression. If omitted,
  /// will return the count of all rows in the table.
  Future<int> count(
    _is.DatabaseSession session, {
    _is.WhereExpressionBuilder<DoctorTable>? where,
    int? limit,
    _is.Transaction? transaction,
  }) async {
    return session.db.count<Doctor>(
      where: where?.call(Doctor.t),
      limit: limit,
      transaction: transaction,
    );
  }

  /// Acquires row-level locks on [Doctor] rows matching the [where] expression.
  Future<void> lockRows(
    _is.DatabaseSession session, {
    required _is.WhereExpressionBuilder<DoctorTable> where,
    required _is.LockMode lockMode,
    required _is.Transaction transaction,
    _is.LockBehavior lockBehavior = _is.LockBehavior.wait,
  }) async {
    return session.db.lockRows<Doctor>(
      where: where(Doctor.t),
      lockMode: lockMode,
      lockBehavior: lockBehavior,
      transaction: transaction,
    );
  }
}
