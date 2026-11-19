import mongoose from 'mongoose';

const hospitalResourceSchema = new mongoose.Schema(
  {
    resourceType: {
      type: String,
      enum: ['bed', 'icu_bed', 'ventilator', 'oxygen_cylinder', 'wheelchair', 'triage_bay'],
      required: true
    },
    resourceName: {
      type: String,
      required: true
    },
    identifier: {
      type: String,
      required: true,
      unique: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    ward: {
      type: String,
      default: 'General Ward A'
    },
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance', 'reserved'],
      default: 'available',
      index: true
    },
    allocatedToPatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    lastMaintenanceAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const HospitalResource = mongoose.model('HospitalResource', hospitalResourceSchema);
export default HospitalResource;
