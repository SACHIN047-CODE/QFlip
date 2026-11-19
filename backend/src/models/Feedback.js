import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    category: {
      type: String,
      enum: ['doctor_care', 'wait_time', 'staff_behavior', 'cleanliness', 'overall'],
      default: 'overall'
    },
    comments: {
      type: String,
      default: ''
    },
    sentimentScore: {
      type: Number, // Between -1.0 (very negative) to +1.0 (very positive)
      default: 0
    },
    sentimentLabel: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral'
    },
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
