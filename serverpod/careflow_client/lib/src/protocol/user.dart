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

abstract class User
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  User._({
    this.id,
    required this.name,
    required this.email,
    required this.phone,
    this.passwordHash,
    required this.role,
    bool? isActive,
    bool? isVerified,
    this.lastLogin,
    this.createdAt,
    this.updatedAt,
  }) : isActive = isActive ?? true,
       isVerified = isVerified ?? true;

  factory User({
    int? id,
    required String name,
    required String email,
    required String phone,
    String? passwordHash,
    required String role,
    bool? isActive,
    bool? isVerified,
    DateTime? lastLogin,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _UserImpl;

  factory User.fromJson(Map<String, dynamic> jsonSerialization) {
    return User(
      id: jsonSerialization['id'] as int?,
      name: jsonSerialization['name'] as String,
      email: jsonSerialization['email'] as String,
      phone: jsonSerialization['phone'] as String,
      passwordHash: jsonSerialization['passwordHash'] as String?,
      role: jsonSerialization['role'] as String,
      isActive: jsonSerialization['isActive'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isActive']),
      isVerified: jsonSerialization['isVerified'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isVerified']),
      lastLogin: jsonSerialization['lastLogin'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['lastLogin']),
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

  String email;

  String phone;

  String? passwordHash;

  String role;

  bool isActive;

  bool isVerified;

  DateTime? lastLogin;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [User]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  User copyWith({
    int? id,
    String? name,
    String? email,
    String? phone,
    String? passwordHash,
    String? role,
    bool? isActive,
    bool? isVerified,
    DateTime? lastLogin = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'User',
      if (id != null) 'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      if (passwordHash != null) 'passwordHash': passwordHash,
      'role': role,
      'isActive': isActive,
      'isVerified': isVerified,
      if (lastLogin != null) 'lastLogin': lastLogin?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'User',
      if (id != null) 'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      if (passwordHash != null) 'passwordHash': passwordHash,
      'role': role,
      'isActive': isActive,
      'isVerified': isVerified,
      if (lastLogin != null) 'lastLogin': lastLogin?.toJson(),
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

class _UserImpl extends User {
  _UserImpl({
    int? id,
    required String name,
    required String email,
    required String phone,
    String? passwordHash,
    required String role,
    bool? isActive,
    bool? isVerified,
    DateTime? lastLogin,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         name: name,
         email: email,
         phone: phone,
         passwordHash: passwordHash,
         role: role,
         isActive: isActive,
         isVerified: isVerified,
         lastLogin: lastLogin,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [User]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  User copyWith({
    Object? id = _Undefined,
    String? name,
    String? email,
    String? phone,
    Object? passwordHash = _Undefined,
    String? role,
    bool? isActive,
    bool? isVerified,
    DateTime? lastLogin = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return User(
      id: id is int? ? id : this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      passwordHash: passwordHash is String? ? passwordHash : this.passwordHash,
      role: role ?? this.role,
      isActive: isActive ?? this.isActive,
      isVerified: isVerified ?? this.isVerified,
      lastLogin: lastLogin is _isc.UndefinedSentinel
          ? this.lastLogin
          : lastLogin,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
