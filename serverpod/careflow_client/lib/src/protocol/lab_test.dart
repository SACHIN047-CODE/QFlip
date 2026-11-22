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

abstract class LabTest
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  LabTest._({
    this.id,
    required this.testRequestId,
    this.consultationId,
    required this.patientId,
    required this.doctorId,
    String? testCategory,
    required this.testName,
    String? priority,
    String? status,
    this.sampleCollectedAt,
    this.resultSummary,
    this.reportUrl,
    this.completedAt,
    this.createdAt,
    this.updatedAt,
  }) : testCategory = testCategory ?? 'Hematology',
       priority = priority ?? 'routine',
       status = status ?? 'requested';

  factory LabTest({
    int? id,
    required String testRequestId,
    int? consultationId,
    required int patientId,
    required int doctorId,
    String? testCategory,
    required String testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt,
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _LabTestImpl;

  factory LabTest.fromJson(Map<String, dynamic> jsonSerialization) {
    return LabTest(
      id: jsonSerialization['id'] as int?,
      testRequestId: jsonSerialization['testRequestId'] as String,
      consultationId: jsonSerialization['consultationId'] as int?,
      patientId: jsonSerialization['patientId'] as int,
      doctorId: jsonSerialization['doctorId'] as int,
      testCategory: jsonSerialization['testCategory'] as String?,
      testName: jsonSerialization['testName'] as String,
      priority: jsonSerialization['priority'] as String?,
      status: jsonSerialization['status'] as String?,
      sampleCollectedAt: jsonSerialization['sampleCollectedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['sampleCollectedAt'],
            ),
      resultSummary: jsonSerialization['resultSummary'] as String?,
      reportUrl: jsonSerialization['reportUrl'] as String?,
      completedAt: jsonSerialization['completedAt'] == null
          ? null
          : _isc.DateTimeJsonExtension.fromJson(
              jsonSerialization['completedAt'],
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

  String testRequestId;

  int? consultationId;

  int patientId;

  int doctorId;

  String testCategory;

  String testName;

  String priority;

  String status;

  DateTime? sampleCollectedAt;

  String? resultSummary;

  String? reportUrl;

  DateTime? completedAt;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [LabTest]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  LabTest copyWith({
    int? id,
    String? testRequestId,
    int? consultationId,
    int? patientId,
    int? doctorId,
    String? testCategory,
    String? testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt = const _isc.$UndefinedDateTime(),
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'LabTest',
      if (id != null) 'id': id,
      'testRequestId': testRequestId,
      if (consultationId != null) 'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'testCategory': testCategory,
      'testName': testName,
      'priority': priority,
      'status': status,
      if (sampleCollectedAt != null)
        'sampleCollectedAt': sampleCollectedAt?.toJson(),
      if (resultSummary != null) 'resultSummary': resultSummary,
      if (reportUrl != null) 'reportUrl': reportUrl,
      if (completedAt != null) 'completedAt': completedAt?.toJson(),
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'LabTest',
      if (id != null) 'id': id,
      'testRequestId': testRequestId,
      if (consultationId != null) 'consultationId': consultationId,
      'patientId': patientId,
      'doctorId': doctorId,
      'testCategory': testCategory,
      'testName': testName,
      'priority': priority,
      'status': status,
      if (sampleCollectedAt != null)
        'sampleCollectedAt': sampleCollectedAt?.toJson(),
      if (resultSummary != null) 'resultSummary': resultSummary,
      if (reportUrl != null) 'reportUrl': reportUrl,
      if (completedAt != null) 'completedAt': completedAt?.toJson(),
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

class _LabTestImpl extends LabTest {
  _LabTestImpl({
    int? id,
    required String testRequestId,
    int? consultationId,
    required int patientId,
    required int doctorId,
    String? testCategory,
    required String testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt,
    String? resultSummary,
    String? reportUrl,
    DateTime? completedAt,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         testRequestId: testRequestId,
         consultationId: consultationId,
         patientId: patientId,
         doctorId: doctorId,
         testCategory: testCategory,
         testName: testName,
         priority: priority,
         status: status,
         sampleCollectedAt: sampleCollectedAt,
         resultSummary: resultSummary,
         reportUrl: reportUrl,
         completedAt: completedAt,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [LabTest]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  LabTest copyWith({
    Object? id = _Undefined,
    String? testRequestId,
    Object? consultationId = _Undefined,
    int? patientId,
    int? doctorId,
    String? testCategory,
    String? testName,
    String? priority,
    String? status,
    DateTime? sampleCollectedAt = const _isc.$UndefinedDateTime(),
    Object? resultSummary = _Undefined,
    Object? reportUrl = _Undefined,
    DateTime? completedAt = const _isc.$UndefinedDateTime(),
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return LabTest(
      id: id is int? ? id : this.id,
      testRequestId: testRequestId ?? this.testRequestId,
      consultationId: consultationId is int?
          ? consultationId
          : this.consultationId,
      patientId: patientId ?? this.patientId,
      doctorId: doctorId ?? this.doctorId,
      testCategory: testCategory ?? this.testCategory,
      testName: testName ?? this.testName,
      priority: priority ?? this.priority,
      status: status ?? this.status,
      sampleCollectedAt: sampleCollectedAt is _isc.UndefinedSentinel
          ? this.sampleCollectedAt
          : sampleCollectedAt,
      resultSummary: resultSummary is String?
          ? resultSummary
          : this.resultSummary,
      reportUrl: reportUrl is String? ? reportUrl : this.reportUrl,
      completedAt: completedAt is _isc.UndefinedSentinel
          ? this.completedAt
          : completedAt,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
