import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Department code is required (e.g. GEN, CARD)'],
      unique: true,
      uppercase: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    floor: {
      type: String,
      default: 'Ground Floor'
    },
    roomNumbers: [
      {
        type: String
      }
    ],
    averageWaitTimeMinutes: {
      type: Number,
      default: 20
    },
    maxDailyCapacity: {
      type: Number,
      default: 250
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

export const Department = mongoose.model('Department', departmentSchema);
export default Department;
