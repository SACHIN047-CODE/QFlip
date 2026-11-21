import mongoose from 'mongoose';

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'AWAITING_USER', 'RESOLVED', 'CLOSED'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    changedBy: {
      type: String,
      default: 'Hospital Staff'
    },
    note: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const adminUpdateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `upd-${Date.now()}`
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleString()
    },
    author: {
      type: String,
      default: 'Hospital Administration'
    }
  },
  { _id: false }
);

const internalNoteSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => `in-${Date.now()}`
    },
    note: {
      type: String,
      required: true
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleString()
    },
    author: {
      type: String,
      default: 'Hospital Administration'
    }
  },
  { _id: false }
);

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    userId: {
      type: String,
      default: null
    },
    patientId: {
      type: String,
      default: null
    },
    patientName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: [
        'Long Wait Time',
        'Doctor Unavailability',
        'Cleanliness',
        'Staff Behavior',
        'Pharmacy Delay',
        'App Issue',
        'Other'
      ],
      default: 'Other'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'AWAITING_USER', 'RESOLVED', 'CLOSED'],
      default: 'OPEN',
      index: true
    },
    resolutionMessage: {
      type: String,
      default: null
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    statusHistory: [statusHistorySchema],
    adminUpdates: [adminUpdateSchema],
    internalNotes: [internalNoteSchema]
  },
  {
    timestamps: true
  }
);

export const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);
export default SupportTicket;
