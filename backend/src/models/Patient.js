import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: [true, 'Patient ID is required'],
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Male'
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: 'New Delhi' },
      state: { type: String, default: 'Delhi' },
      pincode: { type: String, default: '110001' }
    },
    emergencyContact: {
      name: { type: String, default: '' },
      relation: { type: String, default: '' },
      phone: { type: String, default: '' }
    },
    basicMedicalInformation: {
      bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
        default: 'Unknown'
      },
      allergies: [{ type: String }],
      chronicConditions: [{ type: String }],
      currentMedications: [{ type: String }]
    },
    registrationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
