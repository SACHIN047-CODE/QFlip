import mongoose from 'mongoose';

const labTestSchema = new mongoose.Schema(
  {
    testRequestId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation'
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
    labStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    testCategory: {
      type: String,
      enum: ['Pathology', 'Radiology', 'Biochemistry', 'Microbiology', 'Hematology'],
      default: 'Hematology'
    },
    testName: {
      type: String,
      required: [true, 'Test name is required']
    },
    priority: {
      type: String,
      enum: ['routine', 'urgent', 'stat'],
      default: 'routine'
    },
    status: {
      type: String,
      enum: ['requested', 'sample_collected', 'in_progress', 'completed', 'cancelled'],
      default: 'requested',
      index: true
    },
    sampleCollectedAt: {
      type: Date
    },
    resultSummary: {
      type: String,
      default: ''
    },
    resultParameters: [
      {
        parameter: String,
        value: String,
        unit: String,
        referenceRange: String,
        status: { type: String, enum: ['normal', 'low', 'high'], default: 'normal' }
      }
    ],
    reportUrl: {
      type: String,
      default: ''
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const LabTest = mongoose.model('LabTest', labTestSchema);
export default LabTest;
