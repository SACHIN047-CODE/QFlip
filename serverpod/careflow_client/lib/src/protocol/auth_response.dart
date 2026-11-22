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

abstract class AuthResponse
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  AuthResponse._({
    required this.success,
    this.token,
    this.userId,
    this.name,
    this.email,
    this.role,
    this.phone,
    this.message,
  });

  factory AuthResponse({
    required bool success,
    String? token,
    int? userId,
    String? name,
    String? email,
    String? role,
    String? phone,
    String? message,
  }) = _AuthResponseImpl;

  factory AuthResponse.fromJson(Map<String, dynamic> jsonSerialization) {
    return AuthResponse(
      success: _isc.BoolJsonExtension.fromJson(jsonSerialization['success']),
      token: jsonSerialization['token'] as String?,
      userId: jsonSerialization['userId'] as int?,
      name: jsonSerialization['name'] as String?,
      email: jsonSerialization['email'] as String?,
      role: jsonSerialization['role'] as String?,
      phone: jsonSerialization['phone'] as String?,
      message: jsonSerialization['message'] as String?,
    );
  }

  bool success;

  String? token;

  int? userId;

  String? name;

  String? email;

  String? role;

  String? phone;

  String? message;

  /// Returns a shallow copy of this [AuthResponse]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  AuthResponse copyWith({
    bool? success,
    String? token,
    int? userId,
    String? name,
    String? email,
    String? role,
    String? phone,
    String? message,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'AuthResponse',
      'success': success,
      if (token != null) 'token': token,
      if (userId != null) 'userId': userId,
      if (name != null) 'name': name,
      if (email != null) 'email': email,
      if (role != null) 'role': role,
      if (phone != null) 'phone': phone,
      if (message != null) 'message': message,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'AuthResponse',
      'success': success,
      if (token != null) 'token': token,
      if (userId != null) 'userId': userId,
      if (name != null) 'name': name,
      if (email != null) 'email': email,
      if (role != null) 'role': role,
      if (phone != null) 'phone': phone,
      if (message != null) 'message': message,
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _AuthResponseImpl extends AuthResponse {
  _AuthResponseImpl({
    required bool success,
    String? token,
    int? userId,
    String? name,
    String? email,
    String? role,
    String? phone,
    String? message,
  }) : super._(
         success: success,
         token: token,
         userId: userId,
         name: name,
         email: email,
         role: role,
         phone: phone,
         message: message,
       );

  /// Returns a shallow copy of this [AuthResponse]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  AuthResponse copyWith({
    bool? success,
    Object? token = _Undefined,
    Object? userId = _Undefined,
    Object? name = _Undefined,
    Object? email = _Undefined,
    Object? role = _Undefined,
    Object? phone = _Undefined,
    Object? message = _Undefined,
  }) {
    return AuthResponse(
      success: success ?? this.success,
      token: token is String? ? token : this.token,
      userId: userId is int? ? userId : this.userId,
      name: name is String? ? name : this.name,
      email: email is String? ? email : this.email,
      role: role is String? ? role : this.role,
      phone: phone is String? ? phone : this.phone,
      message: message is String? ? message : this.message,
    );
  }
}
