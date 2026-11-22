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

abstract class Patient
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
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
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['registrationDate'],
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

  /// Returns a shallow copy of this [Patient]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
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
    DateTime? registrationDate = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
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

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
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
  @_isc.useResult
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
    DateTime? registrationDate = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
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
      registrationDate: registrationDate is _isc.UndefinedSentinel
          ? this.registrationDate
          : registrationDate,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
