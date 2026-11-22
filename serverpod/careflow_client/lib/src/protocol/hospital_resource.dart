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
import 'package:serverpod_client/serverpod_client.dart' as _isc;

abstract class HospitalResource
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
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

  String resourceType;

  String resourceName;

  String identifier;

  String ward;

  String status;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [HospitalResource]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  HospitalResource copyWith({
    int? id,
    String? resourceType,
    String? resourceName,
    String? identifier,
    String? ward,
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
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

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
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
  @_isc.useResult
  @override
  HospitalResource copyWith({
    Object? id = _Undefined,
    String? resourceType,
    String? resourceName,
    String? identifier,
    String? ward,
    String? status,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return HospitalResource(
      id: id is int? ? id : this.id,
      resourceType: resourceType ?? this.resourceType,
      resourceName: resourceName ?? this.resourceName,
      identifier: identifier ?? this.identifier,
      ward: ward ?? this.ward,
      status: status ?? this.status,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
