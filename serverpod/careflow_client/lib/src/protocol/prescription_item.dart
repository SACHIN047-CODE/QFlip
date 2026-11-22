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

abstract class PrescriptionItem
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  PrescriptionItem._({
    this.id,
    required this.prescriptionId,
    required this.medicineName,
    required this.dosage,
    this.quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    this.instructions,
    bool? isDispensed,
  }) : consumptionTiming = consumptionTiming ?? 'After breakfast',
       frequency = frequency ?? 'Twice daily',
       duration = duration ?? '5 days',
       isDispensed = isDispensed ?? false;

  factory PrescriptionItem({
    int? id,
    required int prescriptionId,
    required String medicineName,
    required String dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  }) = _PrescriptionItemImpl;

  factory PrescriptionItem.fromJson(Map<String, dynamic> jsonSerialization) {
    return PrescriptionItem(
      id: jsonSerialization['id'] as int?,
      prescriptionId: jsonSerialization['prescriptionId'] as int,
      medicineName: jsonSerialization['medicineName'] as String,
      dosage: jsonSerialization['dosage'] as String,
      quantity: jsonSerialization['quantity'] as int?,
      consumptionTiming: jsonSerialization['consumptionTiming'] as String?,
      frequency: jsonSerialization['frequency'] as String?,
      duration: jsonSerialization['duration'] as String?,
      instructions: jsonSerialization['instructions'] as String?,
      isDispensed: jsonSerialization['isDispensed'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isDispensed']),
    );
  }

  /// The database id, set if the object has been inserted into the
  /// database or if it has been fetched from the database. Otherwise,
  /// the id will be null.
  int? id;

  int prescriptionId;

  String medicineName;

  String dosage;

  int? quantity;

  String consumptionTiming;

  String frequency;

  String duration;

  String? instructions;

  bool isDispensed;

  /// Returns a shallow copy of this [PrescriptionItem]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  PrescriptionItem copyWith({
    int? id,
    int? prescriptionId,
    String? medicineName,
    String? dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'PrescriptionItem',
      if (id != null) 'id': id,
      'prescriptionId': prescriptionId,
      'medicineName': medicineName,
      'dosage': dosage,
      if (quantity != null) 'quantity': quantity,
      'consumptionTiming': consumptionTiming,
      'frequency': frequency,
      'duration': duration,
      if (instructions != null) 'instructions': instructions,
      'isDispensed': isDispensed,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'PrescriptionItem',
      if (id != null) 'id': id,
      'prescriptionId': prescriptionId,
      'medicineName': medicineName,
      'dosage': dosage,
      if (quantity != null) 'quantity': quantity,
      'consumptionTiming': consumptionTiming,
      'frequency': frequency,
      'duration': duration,
      if (instructions != null) 'instructions': instructions,
      'isDispensed': isDispensed,
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _Undefined {}

class _PrescriptionItemImpl extends PrescriptionItem {
  _PrescriptionItemImpl({
    int? id,
    required int prescriptionId,
    required String medicineName,
    required String dosage,
    int? quantity,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    String? instructions,
    bool? isDispensed,
  }) : super._(
         id: id,
         prescriptionId: prescriptionId,
         medicineName: medicineName,
         dosage: dosage,
         quantity: quantity,
         consumptionTiming: consumptionTiming,
         frequency: frequency,
         duration: duration,
         instructions: instructions,
         isDispensed: isDispensed,
       );

  /// Returns a shallow copy of this [PrescriptionItem]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  PrescriptionItem copyWith({
    Object? id = _Undefined,
    int? prescriptionId,
    String? medicineName,
    String? dosage,
    Object? quantity = _Undefined,
    String? consumptionTiming,
    String? frequency,
    String? duration,
    Object? instructions = _Undefined,
    bool? isDispensed,
  }) {
    return PrescriptionItem(
      id: id is int? ? id : this.id,
      prescriptionId: prescriptionId ?? this.prescriptionId,
      medicineName: medicineName ?? this.medicineName,
      dosage: dosage ?? this.dosage,
      quantity: quantity is int? ? quantity : this.quantity,
      consumptionTiming: consumptionTiming ?? this.consumptionTiming,
      frequency: frequency ?? this.frequency,
      duration: duration ?? this.duration,
      instructions: instructions is String? ? instructions : this.instructions,
      isDispensed: isDispensed ?? this.isDispensed,
    );
  }
}
