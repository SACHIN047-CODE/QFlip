import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    consultationId: {
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
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queue'
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    chiefComplaints: {
      type: String,
      required: [true, 'Chief complaints are required']
    },
    clinicalObservations: {
      type: String,
      default: ''
    },
    diagnosis: {
      type: String,
      required: [true, 'Diagnosis is required']
    },
    vitalSigns: {
      bp: { type: String, default: '120/80 mmHg' },
      pulse: { type: String, default: '72 bpm' },
      temperature: { type: String, default: '98.6 °F' },
      spO2: { type: String, default: '98%' },
      weight: { type: String, default: '68 kg' }
    },
    clinicalNotes: {
      type: String,
      default: ''
    },
    followUpDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'referred'],
      default: 'completed'
    }
  },
  {
    timestamps: true
  }
);

export const Consultation = mongoose.model('Consultation', consultationSchema);
export default Consultation;
