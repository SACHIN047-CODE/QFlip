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

abstract class PharmacyOrder
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
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
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['dispensedAt'],
            ),
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

  String orderNumber;

  int prescriptionId;

  int patientId;

  double totalAmount;

  String paymentStatus;

  String status;

  DateTime? dispensedAt;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [PharmacyOrder]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  PharmacyOrder copyWith({
    int? id,
    String? orderNumber,
    int? prescriptionId,
    int? patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
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

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
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
  @_isc.useResult
  @override
  PharmacyOrder copyWith({
    Object? id = _Undefined,
    String? orderNumber,
    int? prescriptionId,
    int? patientId,
    double? totalAmount,
    String? paymentStatus,
    String? status,
    DateTime? dispensedAt = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return PharmacyOrder(
      id: id is int? ? id : this.id,
      orderNumber: orderNumber ?? this.orderNumber,
      prescriptionId: prescriptionId ?? this.prescriptionId,
      patientId: patientId ?? this.patientId,
      totalAmount: totalAmount ?? this.totalAmount,
      paymentStatus: paymentStatus ?? this.paymentStatus,
      status: status ?? this.status,
      dispensedAt: dispensedAt is _isc.UndefinedSentinel
          ? this.dispensedAt
          : dispensedAt,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
