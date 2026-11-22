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
import 'package:careflow_client/src/protocol/protocol.dart' as _iby8pxvp;
import 'package:serverpod_client/serverpod_client.dart' as _isc;

abstract class Department
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  Department._({
    this.id,
    required this.name,
    required this.code,
    this.description,
    String? floor,
    this.roomNumbers,
    int? averageWaitTimeMinutes,
    int? maxDailyCapacity,
    bool? isActive,
    this.createdAt,
    this.updatedAt,
  }) : floor = floor ?? 'Ground Floor',
       averageWaitTimeMinutes = averageWaitTimeMinutes ?? 20,
       maxDailyCapacity = maxDailyCapacity ?? 250,
       isActive = isActive ?? true;

  factory Department({
    int? id,
    required String name,
    required String code,
    String? description,
    String? floor,
    List<String>? roomNumbers,
    int? averageWaitTimeMinutes,
    int? maxDailyCapacity,
    bool? isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _DepartmentImpl;

  factory Department.fromJson(Map<String, dynamic> jsonSerialization) {
    return Department(
      id: jsonSerialization['id'] as int?,
      name: jsonSerialization['name'] as String,
      code: jsonSerialization['code'] as String,
      description: jsonSerialization['description'] as String?,
      floor: jsonSerialization['floor'] as String?,
      roomNumbers: jsonSerialization['roomNumbers'] == null
          ? null
          : _iby8pxvp.Protocol().deserialize<List<String>>(
              jsonSerialization['roomNumbers'],
            ),
      averageWaitTimeMinutes:
          jsonSerialization['averageWaitTimeMinutes'] as int?,
      maxDailyCapacity: jsonSerialization['maxDailyCapacity'] as int?,
      isActive: jsonSerialization['isActive'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isActive']),
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
      updatedAt: jsonSerialization['updatedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['updatedAt']),
    );
  }

  /// The database id, set if the object has been inserted into the
  /// database or if it has been fetched from the database. Otherwise,
  /// the id will be null.
  int? id;

  String name;

  String code;

  String? description;

  String floor;

  List<String>? roomNumbers;

  int averageWaitTimeMinutes;

  int maxDailyCapacity;

  bool isActive;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [Department]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  Department copyWith({
    int? id,
    String? name,
    String? code,
    String? description,
    String? floor,
    List<String>? roomNumbers = const _isc.$UndefinedList<String>(),
    int? averageWaitTimeMinutes,
    int? maxDailyCapacity,
    bool? isActive,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'Department',
      if (id != null) 'id': id,
      'name': name,
      'code': code,
      if (description != null) 'description': description,
      'floor': floor,
      if (roomNumbers != null) 'roomNumbers': roomNumbers?.toJson(),
      'averageWaitTimeMinutes': averageWaitTimeMinutes,
      'maxDailyCapacity': maxDailyCapacity,
      'isActive': isActive,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'Department',
      if (id != null) 'id': id,
      'name': name,
      'code': code,
      if (description != null) 'description': description,
      'floor': floor,
      if (roomNumbers != null) 'roomNumbers': roomNumbers?.toJson(),
      'averageWaitTimeMinutes': averageWaitTimeMinutes,
      'maxDailyCapacity': maxDailyCapacity,
      'isActive': isActive,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _DepartmentImpl extends Department {
  _DepartmentImpl({
    int? id,
    required String name,
    required String code,
    String? description,
    String? floor,
    List<String>? roomNumbers,
    int? averageWaitTimeMinutes,
    int? maxDailyCapacity,
    bool? isActive,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         name: name,
         code: code,
         description: description,
         floor: floor,
         roomNumbers: roomNumbers,
         averageWaitTimeMinutes: averageWaitTimeMinutes,
         maxDailyCapacity: maxDailyCapacity,
         isActive: isActive,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [Department]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  Department copyWith({
    Object? id = _Undefined,
    String? name,
    String? code,
    Object? description = _Undefined,
    String? floor,
    List<String>? roomNumbers = const _isc.$UndefinedList<String>(),
    int? averageWaitTimeMinutes,
    int? maxDailyCapacity,
    bool? isActive,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return Department(
      id: id is int? ? id : this.id,
      name: name ?? this.name,
      code: code ?? this.code,
      description: description is String? ? description : this.description,
      floor: floor ?? this.floor,
      roomNumbers: roomNumbers is _isc.UndefinedSentinel
          ? this.roomNumbers?.map((e0) => e0).toList()
          : roomNumbers,
      averageWaitTimeMinutes:
          averageWaitTimeMinutes ?? this.averageWaitTimeMinutes,
      maxDailyCapacity: maxDailyCapacity ?? this.maxDailyCapacity,
      isActive: isActive ?? this.isActive,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
