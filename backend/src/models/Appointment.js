import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    appointmentNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    timeSlot: {
      type: String,
      required: true,
      default: '09:30 AM - 10:00 AM'
    },
    status: {
      type: String,
      enum: ['scheduled', 'checked_in', 'completed', 'cancelled', 'no_show'],
      default: 'scheduled',
      index: true
    },
    tokenNumber: {
      type: String,
      trim: true
    },
    accessToken: {
      type: String
    },
    accessTokenHash: {
      type: String,
      required: true,
      index: true
    },
    accessTokenExpiry: {
      type: Date,
      required: true
    },
    isRevoked: {
      type: Boolean,
      default: false
    },
    symptoms: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['normal', 'urgent', 'emergency'],
      default: 'normal'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
