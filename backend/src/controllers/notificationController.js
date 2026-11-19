import { Notification } from '../models/Notification.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipientUserId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30);

  const unreadCount = await Notification.countDocuments({
    recipientUserId: req.user._id,
    isRead: false
  });

  return ApiResponse.success(res, { notifications, unreadCount }, 'Notifications');
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id === 'all') {
    await Notification.updateMany({ recipientUserId: req.user._id }, { isRead: true });
    return ApiResponse.success(res, null, 'All notifications marked as read');
  }

  const notification = await Notification.findOneAndUpdate(
    { _id: id, recipientUserId: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw ApiError.notFound('Notification not found');
  }

  return ApiResponse.success(res, notification, 'Notification marked as read');
});
