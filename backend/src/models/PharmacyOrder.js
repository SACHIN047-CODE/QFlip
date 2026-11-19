import mongoose from 'mongoose';

const pharmacyOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prescription',
      required: true
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    pharmacistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    items: [
      {
        medicineName: { type: String, required: true },
        quantity: { type: Number, required: true },
        dosage: { type: String, default: 'Standard' },
        batchNumber: { type: String, default: 'BT-2026-X' },
        unitPrice: { type: Number, default: 0 }, // Often subsidised / ₹0 in government hospital
        total: { type: Number, default: 0 }
      }
    ],
    totalAmount: {
      type: Number,
      default: 0
    },
    paymentStatus: {
      type: String,
      enum: ['exempt_gov', 'paid', 'pending'],
      default: 'exempt_gov'
    },
    status: {
      type: String,
      enum: ['received', 'processing', 'dispensed', 'cancelled'],
      default: 'received',
      index: true
    },
    dispensedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export const PharmacyOrder = mongoose.model('PharmacyOrder', pharmacyOrderSchema);
export default PharmacyOrder;
