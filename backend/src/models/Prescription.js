import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Consultation',
      required: true
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
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g. "500mg"
        quantity: { type: Number },
        consumptionTiming: { type: String, default: 'After breakfast' }, // e.g. "Before breakfast", "After breakfast", "At bedtime", etc.
        frequency: { type: String, required: true }, // e.g. "Once daily", "Twice daily"
        duration: { type: String, required: true }, // e.g. "5 days"
        instructions: { type: String, default: 'After meals' },
        isDispensed: { type: Boolean, default: false }
      }
    ],
    dietaryAdvice: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending_pharmacy', 'partially_dispensed', 'dispensed', 'cancelled'],
      default: 'pending_pharmacy',
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
