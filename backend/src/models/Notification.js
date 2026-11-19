import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: [
        'queue_update',
        'appointment_reminder',
        'lab_ready',
        'prescription_ready',
        'system_alert',
        'triage_alert'
      ],
      default: 'queue_update'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    metadata: {
      tokenNumber: String,
      queueId: String,
      department: String,
      urgency: String
    }
  },
  {
    timestamps: true
  }
);

export const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
