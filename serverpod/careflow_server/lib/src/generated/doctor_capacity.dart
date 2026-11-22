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
import 'package:serverpod/serverpod.dart' as _is;

abstract class DoctorCapacity
    implements _is.SerializableModel, _is.ProtocolSerialization {
  DoctorCapacity._({
    required this.canAccept,
    required this.isBuffer,
    required this.reason,
    required this.remainingOpdMinutes,
    required this.activeWorkload,
    required this.avgConsultationDurationMinutes,
    required this.estimatedCompletionMinutes,
    required this.remainingStandardCapacity,
    required this.currentBufferPatients,
    required this.remainingBufferCapacity,
    required this.bufferLimit,
    required this.isAvailable,
    required this.isClosed,
  });

  factory DoctorCapacity({
    required bool canAccept,
    required bool isBuffer,
    required String reason,
    required int remainingOpdMinutes,
    required int activeWorkload,
    required double avgConsultationDurationMinutes,
    required int estimatedCompletionMinutes,
    required int remainingStandardCapacity,
    required int currentBufferPatients,
    required int remainingBufferCapacity,
    required int bufferLimit,
    required bool isAvailable,
    required bool isClosed,
  }) = _DoctorCapacityImpl;

  factory DoctorCapacity.fromJson(Map<String, dynamic> jsonSerialization) {
    return DoctorCapacity(
      canAccept: _is.BoolJsonExtension.fromJson(jsonSerialization['canAccept']),
      isBuffer: _is.BoolJsonExtension.fromJson(jsonSerialization['isBuffer']),
      reason: jsonSerialization['reason'] as String,
      remainingOpdMinutes: jsonSerialization['remainingOpdMinutes'] as int,
      activeWorkload: jsonSerialization['activeWorkload'] as int,
      avgConsultationDurationMinutes:
          (jsonSerialization['avgConsultationDurationMinutes'] as num)
              .toDouble(),
      estimatedCompletionMinutes:
          jsonSerialization['estimatedCompletionMinutes'] as int,
      remainingStandardCapacity:
          jsonSerialization['remainingStandardCapacity'] as int,
      currentBufferPatients: jsonSerialization['currentBufferPatients'] as int,
      remainingBufferCapacity:
          jsonSerialization['remainingBufferCapacity'] as int,
      bufferLimit: jsonSerialization['bufferLimit'] as int,
      isAvailable: _is.BoolJsonExtension.fromJson(
        jsonSerialization['isAvailable'],
      ),
      isClosed: _is.BoolJsonExtension.fromJson(jsonSerialization['isClosed']),
    );
  }

  bool canAccept;

  bool isBuffer;

  String reason;

  int remainingOpdMinutes;

  int activeWorkload;

  double avgConsultationDurationMinutes;

  int estimatedCompletionMinutes;

  int remainingStandardCapacity;

  int currentBufferPatients;

  int remainingBufferCapacity;

  int bufferLimit;

  bool isAvailable;

  bool isClosed;

  /// Returns a shallow copy of this [DoctorCapacity]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  DoctorCapacity copyWith({
    bool? canAccept,
    bool? isBuffer,
    String? reason,
    int? remainingOpdMinutes,
    int? activeWorkload,
    double? avgConsultationDurationMinutes,
    int? estimatedCompletionMinutes,
    int? remainingStandardCapacity,
    int? currentBufferPatients,
    int? remainingBufferCapacity,
    int? bufferLimit,
    bool? isAvailable,
    bool? isClosed,
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'DoctorCapacity',
      'canAccept': canAccept,
      'isBuffer': isBuffer,
      'reason': reason,
      'remainingOpdMinutes': remainingOpdMinutes,
      'activeWorkload': activeWorkload,
      'avgConsultationDurationMinutes': avgConsultationDurationMinutes,
      'estimatedCompletionMinutes': estimatedCompletionMinutes,
      'remainingStandardCapacity': remainingStandardCapacity,
      'currentBufferPatients': currentBufferPatients,
      'remainingBufferCapacity': remainingBufferCapacity,
      'bufferLimit': bufferLimit,
      'isAvailable': isAvailable,
      'isClosed': isClosed,
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'DoctorCapacity',
      'canAccept': canAccept,
      'isBuffer': isBuffer,
      'reason': reason,
      'remainingOpdMinutes': remainingOpdMinutes,
      'activeWorkload': activeWorkload,
      'avgConsultationDurationMinutes': avgConsultationDurationMinutes,
      'estimatedCompletionMinutes': estimatedCompletionMinutes,
      'remainingStandardCapacity': remainingStandardCapacity,
      'currentBufferPatients': currentBufferPatients,
      'remainingBufferCapacity': remainingBufferCapacity,
      'bufferLimit': bufferLimit,
      'isAvailable': isAvailable,
      'isClosed': isClosed,
    };
  }

  @override
  String toString() {
    return _is.SerializationManager.encode(this);
  }
}

class _DoctorCapacityImpl extends DoctorCapacity {
  _DoctorCapacityImpl({
    required bool canAccept,
    required bool isBuffer,
    required String reason,
    required int remainingOpdMinutes,
    required int activeWorkload,
    required double avgConsultationDurationMinutes,
    required int estimatedCompletionMinutes,
    required int remainingStandardCapacity,
    required int currentBufferPatients,
    required int remainingBufferCapacity,
    required int bufferLimit,
    required bool isAvailable,
    required bool isClosed,
  }) : super._(
         canAccept: canAccept,
         isBuffer: isBuffer,
         reason: reason,
         remainingOpdMinutes: remainingOpdMinutes,
         activeWorkload: activeWorkload,
         avgConsultationDurationMinutes: avgConsultationDurationMinutes,
         estimatedCompletionMinutes: estimatedCompletionMinutes,
         remainingStandardCapacity: remainingStandardCapacity,
         currentBufferPatients: currentBufferPatients,
         remainingBufferCapacity: remainingBufferCapacity,
         bufferLimit: bufferLimit,
         isAvailable: isAvailable,
         isClosed: isClosed,
       );

  /// Returns a shallow copy of this [DoctorCapacity]
  /// with some or all fields replaced by the given arguments.
  @_is.useResult
  @override
  DoctorCapacity copyWith({
    bool? canAccept,
    bool? isBuffer,
    String? reason,
    int? remainingOpdMinutes,
    int? activeWorkload,
    double? avgConsultationDurationMinutes,
    int? estimatedCompletionMinutes,
    int? remainingStandardCapacity,
    int? currentBufferPatients,
    int? remainingBufferCapacity,
    int? bufferLimit,
    bool? isAvailable,
    bool? isClosed,
  }) {
    return DoctorCapacity(
      canAccept: canAccept ?? this.canAccept,
      isBuffer: isBuffer ?? this.isBuffer,
      reason: reason ?? this.reason,
      remainingOpdMinutes: remainingOpdMinutes ?? this.remainingOpdMinutes,
      activeWorkload: activeWorkload ?? this.activeWorkload,
      avgConsultationDurationMinutes:
          avgConsultationDurationMinutes ?? this.avgConsultationDurationMinutes,
      estimatedCompletionMinutes:
          estimatedCompletionMinutes ?? this.estimatedCompletionMinutes,
      remainingStandardCapacity:
          remainingStandardCapacity ?? this.remainingStandardCapacity,
      currentBufferPatients:
          currentBufferPatients ?? this.currentBufferPatients,
      remainingBufferCapacity:
          remainingBufferCapacity ?? this.remainingBufferCapacity,
      bufferLimit: bufferLimit ?? this.bufferLimit,
      isAvailable: isAvailable ?? this.isAvailable,
      isClosed: isClosed ?? this.isClosed,
    );
  }
}
