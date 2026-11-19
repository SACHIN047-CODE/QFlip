import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: String,
      required: true,
      index: true
    },
    sequenceNumber: {
      type: Number,
      required: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    status: {
      type: String,
      enum: [
        'waiting',
        'called',
        'in_consultation',
        'completed',
        'skipped',
        'transferred',
        'cancelled'
      ],
      default: 'waiting',
      index: true
    },
    triageLevel: {
      type: String,
      enum: ['green', 'yellow', 'red'],
      default: 'green'
    },
    priorityScore: {
      type: Number,
      default: 10
    },
    symptoms: {
      type: String,
      default: ''
    },
    estimatedWaitTimeMinutes: {
      type: Number,
      default: 15
    },
    checkInTime: {
      type: Date,
      default: Date.now
    },
    callTime: {
      type: Date
    },
    consultationStartTime: {
      type: Date
    },
    completionTime: {
      type: Date
    },
    delayReason: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Composite indexes for fast query resolution during live OPD hours
queueSchema.index({ departmentId: 1, status: 1, sequenceNumber: 1 });
queueSchema.index({ doctorId: 1, status: 1 });
queueSchema.index({ createdAt: -1 });

export const Queue = mongoose.model('Queue', queueSchema);
export default Queue;
