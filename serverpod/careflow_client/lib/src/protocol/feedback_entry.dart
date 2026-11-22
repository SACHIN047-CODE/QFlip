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

abstract class FeedbackEntry
    implements _isc.SerializableModel, _isc.ProtocolSerialization {
  FeedbackEntry._({
    this.id,
    this.patientId,
    this.departmentId,
    this.doctorId,
    required this.rating,
    String? category,
    this.comments,
    required this.ticketId,
    String? status,
    this.resolutionNote,
    bool? isAnonymous,
    this.createdAt,
    this.updatedAt,
  }) : category = category ?? 'overall',
       status = status ?? 'open',
       isAnonymous = isAnonymous ?? false;

  factory FeedbackEntry({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    required int rating,
    String? category,
    String? comments,
    required String ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _FeedbackEntryImpl;

  factory FeedbackEntry.fromJson(Map<String, dynamic> jsonSerialization) {
    return FeedbackEntry(
      id: jsonSerialization['id'] as int?,
      patientId: jsonSerialization['patientId'] as int?,
      departmentId: jsonSerialization['departmentId'] as int?,
      doctorId: jsonSerialization['doctorId'] as int?,
      rating: jsonSerialization['rating'] as int,
      category: jsonSerialization['category'] as String?,
      comments: jsonSerialization['comments'] as String?,
      ticketId: jsonSerialization['ticketId'] as String,
      status: jsonSerialization['status'] as String?,
      resolutionNote: jsonSerialization['resolutionNote'] as String?,
      isAnonymous: jsonSerialization['isAnonymous'] == null
          ? null
          : _isc.BoolJsonExtension.fromJson(jsonSerialization['isAnonymous']),
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

  int? patientId;

  int? departmentId;

  int? doctorId;

  int rating;

  String category;

  String? comments;

  String ticketId;

  String status;

  String? resolutionNote;

  bool isAnonymous;

  DateTime? createdAt;

  DateTime? updatedAt;

  /// Returns a shallow copy of this [FeedbackEntry]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  FeedbackEntry copyWith({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    int? rating,
    String? category,
    String? comments,
    String? ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  });
  @override
  Map<String, dynamic> toJson() {
    return {
      '__className__': 'FeedbackEntry',
      if (id != null) 'id': id,
      if (patientId != null) 'patientId': patientId,
      if (departmentId != null) 'departmentId': departmentId,
      if (doctorId != null) 'doctorId': doctorId,
      'rating': rating,
      'category': category,
      if (comments != null) 'comments': comments,
      'ticketId': ticketId,
      'status': status,
      if (resolutionNote != null) 'resolutionNote': resolutionNote,
      'isAnonymous': isAnonymous,
      if (createdAt != null) 'createdAt': createdAt?.toJson(),
      if (updatedAt != null) 'updatedAt': updatedAt?.toJson(),
    };
  }

  @override
  Map<String, dynamic> toJsonForProtocol() {
    return {
      '__className__': 'FeedbackEntry',
      if (id != null) 'id': id,
      if (patientId != null) 'patientId': patientId,
      if (departmentId != null) 'departmentId': departmentId,
      if (doctorId != null) 'doctorId': doctorId,
      'rating': rating,
      'category': category,
      if (comments != null) 'comments': comments,
      'ticketId': ticketId,
      'status': status,
      if (resolutionNote != null) 'resolutionNote': resolutionNote,
      'isAnonymous': isAnonymous,
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

class _FeedbackEntryImpl extends FeedbackEntry {
  _FeedbackEntryImpl({
    int? id,
    int? patientId,
    int? departmentId,
    int? doctorId,
    required int rating,
    String? category,
    String? comments,
    required String ticketId,
    String? status,
    String? resolutionNote,
    bool? isAnonymous,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) : super._(
         id: id,
         patientId: patientId,
         departmentId: departmentId,
         doctorId: doctorId,
         rating: rating,
         category: category,
         comments: comments,
         ticketId: ticketId,
         status: status,
         resolutionNote: resolutionNote,
         isAnonymous: isAnonymous,
         createdAt: createdAt,
         updatedAt: updatedAt,
       );

  /// Returns a shallow copy of this [FeedbackEntry]
  /// with some or all fields replaced by the given arguments.
  @_isc.useResult
  @override
  FeedbackEntry copyWith({
    Object? id = _Undefined,
    Object? patientId = _Undefined,
    Object? departmentId = _Undefined,
    Object? doctorId = _Undefined,
    int? rating,
    String? category,
    Object? comments = _Undefined,
    String? ticketId,
    String? status,
    Object? resolutionNote = _Undefined,
    bool? isAnonymous,
    DateTime? createdAt = const _isc.$UndefinedDateTime(),
    DateTime? updatedAt = const _isc.$UndefinedDateTime(),
  }) {
    return FeedbackEntry(
      id: id is int? ? id : this.id,
      patientId: patientId is int? ? patientId : this.patientId,
      departmentId: departmentId is int? ? departmentId : this.departmentId,
      doctorId: doctorId is int? ? doctorId : this.doctorId,
      rating: rating ?? this.rating,
      category: category ?? this.category,
      comments: comments is String? ? comments : this.comments,
      ticketId: ticketId ?? this.ticketId,
      status: status ?? this.status,
      resolutionNote: resolutionNote is String?
          ? resolutionNote
          : this.resolutionNote,
      isAnonymous: isAnonymous ?? this.isAnonymous,
      createdAt: createdAt is _isc.UndefinedSentinel
          ? this.createdAt
          : createdAt,
      updatedAt: updatedAt is _isc.UndefinedSentinel
          ? this.updatedAt
          : updatedAt,
    );
  }
}
