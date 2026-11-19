import { Notification } from '../models/Notification.js';
import logger from '../config/logger.js';

let ioInstance = null;

export const setSocketIO = (io) => {
  ioInstance = io;
};

export const getSocketIO = () => ioInstance;

export const sendNotification = async ({
  recipientUserId,
  title,
  message,
  type = 'queue_update',
  metadata = {}
}) => {
  try {
    const notification = await Notification.create({
      recipientUserId,
      title,
      message,
      type,
      metadata
    });

    if (ioInstance) {
      // Emit to user's personal socket room
      ioInstance.to(`user:${recipientUserId.toString()}`).emit('notification', notification);
      
      // Also broadcast general alerts if high urgency
      if (type === 'system_alert' || type === 'triage_alert') {
        ioInstance.emit('global_alert', notification);
      }
    }

    return notification;
  } catch (error) {
    logger.error(`Error sending notification: ${error.message}`);
    return null;
  }
};

export default {
  setSocketIO,
  getSocketIO,
  sendNotification
};
