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

abstract class CrowdForecast
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  CrowdForecast._({
    required this.hour,
    required this.historicalAverage,
    required this.predictedVolume,
    required this.riskLevel,
  });

  factory CrowdForecast({
    required String hour,
    required int historicalAverage,
    required int predictedVolume,
    required String riskLevel,
  }) = _CrowdForecastImpl;

  factory CrowdForecast.fromJson(Map<String, dynamic> jsonSerialization) {
    return CrowdForecast(
      hour: jsonSerialization['hour'] as String,
      historicalAverage: jsonSerialization['historicalAverage'] as int,
      predictedVolume: jsonSerialization['predictedVolume'] as int,
      riskLevel: jsonSerialization['riskLevel'] as String,
    );
  }

  String hour;

  int historicalAverage;

  int predictedVolume;

  String riskLevel;

  /// Returns a shallow copy of this [CrowdForecast]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  CrowdForecast copyWith({
    String? hour,
    int? historicalAverage,
    int? predictedVolume,
    String? riskLevel,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'CrowdForecast',
      'hour': hour,
      'historicalAverage': historicalAverage,
      'predictedVolume': predictedVolume,
      'riskLevel': riskLevel,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'CrowdForecast',
      'hour': hour,
      'historicalAverage': historicalAverage,
      'predictedVolume': predictedVolume,
      'riskLevel': riskLevel,
    };
  }

  @override
  String toString() {
    return _isc.SerializationManager.encode(this);
  }
}

class _CrowdForecastImpl extends CrowdForecast {
  _CrowdForecastImpl({
    required String hour,
    required int historicalAverage,
    required int predictedVolume,
    required String riskLevel,
  }) : super._(
         hour: hour,
         historicalAverage: historicalAverage,
         predictedVolume: predictedVolume,
         riskLevel: riskLevel,
       );

  /// Returns a shallow copy of this [CrowdForecast]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  CrowdForecast copyWith({
    String? hour,
    int? historicalAverage,
    int? predictedVolume,
    String? riskLevel,
  }) {
    return CrowdForecast(
      hour: hour ?? this.hour,
      historicalAverage: historicalAverage ?? this.historicalAverage,
      predictedVolume: predictedVolume ?? this.predictedVolume,
      riskLevel: riskLevel ?? this.riskLevel,
    );
  }
}
