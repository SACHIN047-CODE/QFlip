import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Patient Voice & Grievance Redressal Endpoint
class FeedbackEndpoint extends Endpoint {
  /// Submit patient feedback or grievance ticket
  Future<FeedbackEntry> submitFeedback(
    Session session,
    int rating,
    String category,
    String comments, {
    int? patientId,
    int? departmentId,
    int? doctorId,
    bool isAnonymous = false,
  }) async {
    final ticketId = 'TCK-${(1000 + DateTime.now().millisecondsSinceEpoch % 9000)}';
    final feedback = FeedbackEntry(
      patientId: patientId,
      departmentId: departmentId,
      doctorId: doctorId,
      rating: rating,
      category: category,
      comments: comments,
      ticketId: ticketId,
      status: 'open',
      isAnonymous: isAnonymous,
      createdAt: DateTime.now(),
    );
    return await FeedbackEntry.db.insertRow(session, feedback);
  }

  /// Track a grievance ticket by tracking ID
  Future<FeedbackEntry?> trackTicket(
    Session session,
    String ticketId,
  ) async {
    return await FeedbackEntry.db.findFirstRow(
      session,
      where: (t) => t.ticketId.equals(ticketId.trim().toUpperCase()),
    );
  }

  /// List all feedback records for hospital command admin
  Future<List<FeedbackEntry>> getAllFeedback(Session session) async {
    final list = await FeedbackEntry.db.find(
      session,
      orderBy: (t) => t.createdAt,
      limit: 100,
    );
    return list.reversed.toList();
  }
}
