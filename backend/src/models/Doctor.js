import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    qualification: {
      type: String,
      default: 'MBBS, MD'
    },
    roomNumber: {
      type: String,
      default: 'Room 101'
    },
    opdShift: {
      start: { type: String, default: '09:00 AM' },
      end: { type: String, default: '02:00 PM' }
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    maxDailyPatients: {
      type: Number,
      default: 50
    },
    consultationFee: {
      type: Number,
      default: 0 // Free OPD in Govt Hospitals
    },
    averageConsultationTimeMinutes: {
      type: Number,
      default: 10
    }
  },
  {
    timestamps: true
  }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
