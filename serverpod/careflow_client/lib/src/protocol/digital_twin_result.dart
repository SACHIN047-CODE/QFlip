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

abstract class DigitalTwinResult
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  DigitalTwinResult._({
    required this.avgWaitTimeBefore,
    required this.avgWaitTimeAfter,
    required this.peakQueueDepthBefore,
    required this.peakQueueDepthAfter,
    required this.bottleneckDepartment,
    required this.burnoutRiskLevel,
    required this.recommendedInterventions,
  });

  factory DigitalTwinResult({
    required int avgWaitTimeBefore,
    required int avgWaitTimeAfter,
    required int peakQueueDepthBefore,
    required int peakQueueDepthAfter,
    required String bottleneckDepartment,
    required String burnoutRiskLevel,
    required List<String> recommendedInterventions,
  }) = _DigitalTwinResultImpl;

  factory DigitalTwinResult.fromJson(Map<String, dynamic> jsonSerialization) {
    return DigitalTwinResult(
      avgWaitTimeBefore: jsonSerialization['avgWaitTimeBefore'] as int,
      avgWaitTimeAfter: jsonSerialization['avgWaitTimeAfter'] as int,
      peakQueueDepthBefore: jsonSerialization['peakQueueDepthBefore'] as int,
      peakQueueDepthAfter: jsonSerialization['peakQueueDepthAfter'] as int,
      bottleneckDepartment: jsonSerialization['bottleneckDepartment'] as String,
      burnoutRiskLevel: jsonSerialization['burnoutRiskLevel'] as String,
      recommendedInterventions: _iby8pxvp.Protocol().deserialize<List<String>>(
        jsonSerialization['recommendedInterventions'],
      ),
    );
  }

  int avgWaitTimeBefore;

  int avgWaitTimeAfter;

  int peakQueueDepthBefore;

  int peakQueueDepthAfter;

  String bottleneckDepartment;

  String burnoutRiskLevel;

  List<String> recommendedInterventions;

  /// Returns a shallow copy of this [DigitalTwinResult]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  DigitalTwinResult copyWith({
    int? avgWaitTimeBefore,
    int? avgWaitTimeAfter,
    int? peakQueueDepthBefore,
    int? peakQueueDepthAfter,
    String? bottleneckDepartment,
    String? burnoutRiskLevel,
    List<String>? recommendedInterventions,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'DigitalTwinResult',
      'avgWaitTimeBefore': avgWaitTimeBefore,
      'avgWaitTimeAfter': avgWaitTimeAfter,
      'peakQueueDepthBefore': peakQueueDepthBefore,
      'peakQueueDepthAfter': peakQueueDepthAfter,
      'bottleneckDepartment': bottleneckDepartment,
      'burnoutRiskLevel': burnoutRiskLevel,
      'recommendedInterventions': recommendedInterventions.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'DigitalTwinResult',
      'avgWaitTimeBefore': avgWaitTimeBefore,
      'avgWaitTimeAfter': avgWaitTimeAfter,
      'peakQueueDepthBefore': peakQueueDepthBefore,
      'peakQueueDepthAfter': peakQueueDepthAfter,
      'bottleneckDepartment': bottleneckDepartment,
      'burnoutRiskLevel': burnoutRiskLevel,
      'recommendedInterventions': recommendedInterventions.toJson(),
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _DigitalTwinResultImpl extends DigitalTwinResult {
  _DigitalTwinResultImpl({
    required int avgWaitTimeBefore,
    required int avgWaitTimeAfter,
    required int peakQueueDepthBefore,
    required int peakQueueDepthAfter,
    required String bottleneckDepartment,
    required String burnoutRiskLevel,
    required List<String> recommendedInterventions,
  }) : super._(
         avgWaitTimeBefore: avgWaitTimeBefore,
         avgWaitTimeAfter: avgWaitTimeAfter,
         peakQueueDepthBefore: peakQueueDepthBefore,
         peakQueueDepthAfter: peakQueueDepthAfter,
         bottleneckDepartment: bottleneckDepartment,
         burnoutRiskLevel: burnoutRiskLevel,
         recommendedInterventions: recommendedInterventions,
       );

  /// Returns a shallow copy of this [DigitalTwinResult]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  DigitalTwinResult copyWith({
    int? avgWaitTimeBefore,
    int? avgWaitTimeAfter,
    int? peakQueueDepthBefore,
    int? peakQueueDepthAfter,
    String? bottleneckDepartment,
    String? burnoutRiskLevel,
    List<String>? recommendedInterventions,
  }) {
    return DigitalTwinResult(
      avgWaitTimeBefore: avgWaitTimeBefore ?? this.avgWaitTimeBefore,
      avgWaitTimeAfter: avgWaitTimeAfter ?? this.avgWaitTimeAfter,
      peakQueueDepthBefore: peakQueueDepthBefore ?? this.peakQueueDepthBefore,
      peakQueueDepthAfter: peakQueueDepthAfter ?? this.peakQueueDepthAfter,
      bottleneckDepartment: bottleneckDepartment ?? this.bottleneckDepartment,
      burnoutRiskLevel: burnoutRiskLevel ?? this.burnoutRiskLevel,
      recommendedInterventions:
          recommendedInterventions ??
          this.recommendedInterventions.map((e0) => e0).toList(),
    );
  }
}
