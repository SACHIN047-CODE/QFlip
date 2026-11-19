import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    staffId: {
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
      ref: 'Department'
    },
    designation: {
      type: String,
      default: 'Registration Officer'
    },
    counterNumber: {
      type: String,
      default: 'Counter 1'
    },
    shift: {
      type: String,
      enum: ['Morning', 'Evening', 'Night'],
      default: 'Morning'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
