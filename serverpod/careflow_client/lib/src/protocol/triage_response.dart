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

abstract class TriageResponse
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  TriageResponse._({
    required this.department,
    required this.departmentCode,
    required this.urgency,
    required this.triageColor,
    required this.confidence,
    required this.summary,
    required this.disclaimer,
  });

  factory TriageResponse({
    required String department,
    required String departmentCode,
    required String urgency,
    required String triageColor,
    required double confidence,
    required String summary,
    required String disclaimer,
  }) = _TriageResponseImpl;

  factory TriageResponse.fromJson(Map<String, dynamic> jsonSerialization) {
    return TriageResponse(
      department: jsonSerialization['department'] as String,
      departmentCode: jsonSerialization['departmentCode'] as String,
      urgency: jsonSerialization['urgency'] as String,
      triageColor: jsonSerialization['triageColor'] as String,
      confidence: (jsonSerialization['confidence'] as num).toDouble(),
      summary: jsonSerialization['summary'] as String,
      disclaimer: jsonSerialization['disclaimer'] as String,
    );
  }

  String department;

  String departmentCode;

  String urgency;

  String triageColor;

  double confidence;

  String summary;

  String disclaimer;

  /// Returns a shallow copy of this [TriageResponse]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  TriageResponse copyWith({
    String? department,
    String? departmentCode,
    String? urgency,
    String? triageColor,
    double? confidence,
    String? summary,
    String? disclaimer,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'TriageResponse',
      'department': department,
      'departmentCode': departmentCode,
      'urgency': urgency,
      'triageColor': triageColor,
      'confidence': confidence,
      'summary': summary,
      'disclaimer': disclaimer,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'TriageResponse',
      'department': department,
      'departmentCode': departmentCode,
      'urgency': urgency,
      'triageColor': triageColor,
      'confidence': confidence,
      'summary': summary,
      'disclaimer': disclaimer,
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _TriageResponseImpl extends TriageResponse {
  _TriageResponseImpl({
    required String department,
    required String departmentCode,
    required String urgency,
    required String triageColor,
    required double confidence,
    required String summary,
    required String disclaimer,
  }) : super._(
         department: department,
         departmentCode: departmentCode,
         urgency: urgency,
         triageColor: triageColor,
         confidence: confidence,
         summary: summary,
         disclaimer: disclaimer,
       );

  /// Returns a shallow copy of this [TriageResponse]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  TriageResponse copyWith({
    String? department,
    String? departmentCode,
    String? urgency,
    String? triageColor,
    double? confidence,
    String? summary,
    String? disclaimer,
  }) {
    return TriageResponse(
      department: department ?? this.department,
      departmentCode: departmentCode ?? this.departmentCode,
      urgency: urgency ?? this.urgency,
      triageColor: triageColor ?? this.triageColor,
      confidence: confidence ?? this.confidence,
      summary: summary ?? this.summary,
      disclaimer: disclaimer ?? this.disclaimer,
    );
  }
}
