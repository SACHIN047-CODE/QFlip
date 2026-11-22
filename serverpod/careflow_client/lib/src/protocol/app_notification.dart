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

abstract class AppNotification
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  AppNotification._({
    this.id,
    required this.recipientUserId,
    required this.title,
    required this.message,
    String? type,
    bool? isRead,
    this.tokenNumber,
    this.department,
    this.urgency,
    this.createdAt,
  }) : type = type ?? 'queue_update',
       isRead = isRead ?? false;

  factory AppNotification({
    int? id,
    required int recipientUserId,
    required String title,
    required String message,
    String? type,
    bool? isRead,
    String? tokenNumber,
    String? department,
    String? urgency,
    DateTime? createdAt,
  }) = _AppNotificationImpl;

  factory AppNotification.fromJson(Map<String, dynamic> jsonSerialization) {
    return AppNotification(
      id: jsonSerialization['id'] as int?,
      recipientUserId: jsonSerialization['recipientUserId'] as int,
      title: jsonSerialization['title'] as String,
      message: jsonSerialization['message'] as String,
      type: jsonSerialization['type'] as String?,
      isRead: jsonSerialization['isRead'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isRead']),
      tokenNumber: jsonSerialization['tokenNumber'] as String?,
      department: jsonSerialization['department'] as String?,
      urgency: jsonSerialization['urgency'] as String?,
      createdAt: jsonSerialization['createdAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(jsonSerialization['createdAt']),
    );
  }

  /// The database id, set if the object has been inserted into the
  /// database or if it has been fetched from the database. Otherwise,
  /// the id will be null.
  int? id;

  int recipientUserId;

  String title;

  String message;

  String type;

  bool isRead;

  String? tokenNumber;

  String? department;

  String? urgency;

  DateTime? createdAt;

  /// Returns a shallow copy of this [AppNotification]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  AppNotification copyWith({
    int? id,
    int? recipientUserId,
    String? title,
    String? message,
    String? type,
    bool? isRead,
    String? tokenNumber,
    String? department,
    String? urgency,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'AppNotification',
      if (id != null) 'id': id,
      'recipientUserId': recipientUserId,
      'title': title,
      'message': message,
      'type': type,
      'isRead': isRead,
      if (tokenNumber != null) 'tokenNumber': tokenNumber,
      if (department != null) 'department': department,
      if (urgency != null) 'urgency': urgency,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'AppNotification',
      if (id != null) 'id': id,
      'recipientUserId': recipientUserId,
      'title': title,
      'message': message,
      'type': type,
      'isRead': isRead,
      if (tokenNumber != null) 'tokenNumber': tokenNumber,
      if (department != null) 'department': department,
      if (urgency != null) 'urgency': urgency,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _AppNotificationImpl extends AppNotification {
  _AppNotificationImpl({
    int? id,
    required int recipientUserId,
    required String title,
    required String message,
    String? type,
    bool? isRead,
    String? tokenNumber,
    String? department,
    String? urgency,
    DateTime? createdAt,
  }) : super._(
         id: id,
         recipientUserId: recipientUserId,
         title: title,
         message: message,
         type: type,
         isRead: isRead,
         tokenNumber: tokenNumber,
         department: department,
         urgency: urgency,
         createdAt: createdAt,
       );

  /// Returns a shallow copy of this [AppNotification]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  AppNotification copyWith({
    Object? id = _Undefined,
    int? recipientUserId,
    String? title,
    String? message,
    String? type,
    bool? isRead,
    Object? tokenNumber = _Undefined,
    Object? department = _Undefined,
    Object? urgency = _Undefined,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
  }) {
    return AppNotification(
      id: id is int? ? id : this.id,
      recipientUserId: recipientUserId ?? this.recipientUserId,
      title: title ?? this.title,
      message: message ?? this.message,
      type: type ?? this.type,
      isRead: isRead ?? this.isRead,
      tokenNumber: tokenNumber is String? ? tokenNumber : this.tokenNumber,
      department: department is String? ? department : this.department,
      urgency: urgency is String? ? urgency : this.urgency,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
    );
  }
}
