import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// System Alerts & Push Notifications Endpoint
class NotificationEndpoint extends Endpoint {
  /// Fetch notifications for an authenticated user
  Future<List<AppNotification>> getNotifications(
    Session session,
    int userId,
  ) async {
    final list = await AppNotification.db.find(
      session,
      where: (t) => t.recipientUserId.equals(userId),
      orderBy: (t) => t.createdAt,
      limit: 50,
    );
    return list.reversed.toList();
  }

  /// Send a notification to a specific user
  Future<AppNotification> sendNotification(
    Session session,
    int recipientUserId,
    String title,
    String message, {
    String? type = 'queue_update',
    String? tokenNumber,
    String? department,
    String? urgency,
  }) async {
    final notification = AppNotification(
      recipientUserId: recipientUserId,
      title: title,
      message: message,
      type: type ?? 'queue_update',
      isRead: false,
      tokenNumber: tokenNumber,
      department: department,
      urgency: urgency,
      createdAt: DateTime.now(),
    );
    return await AppNotification.db.insertRow(session, notification);
  }

  /// Mark single notification as read
  Future<AppNotification> markAsRead(
    Session session,
    int notificationId,
  ) async {
    final notification = await AppNotification.db.findById(session, notificationId);
    if (notification == null) throw Exception('Notification not found');

    notification.isRead = true;
    return await AppNotification.db.updateRow(session, notification);
  }
}
