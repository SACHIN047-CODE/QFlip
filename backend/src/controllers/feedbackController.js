import { Feedback } from '../models/Feedback.js';
import { PredictionService } from '../services/predictionService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const submitFeedback = asyncHandler(async (req, res) => {
  const { departmentId, doctorId, rating, category, comments, isAnonymous } = req.body;

  let patientId = null;
  if (!isAnonymous && req.user?.role === 'patient') {
    const { Patient } = await import('../models/Patient.js');
    const p = await Patient.findOne({ userId: req.user._id });
    if (p) patientId = p._id;
  }

  // AI sentiment scoring
  const sentiment = PredictionService.analyzeFeedbackSentiment(comments || '');

  const feedback = await Feedback.create({
    patientId,
    departmentId,
    doctorId,
    rating,
    category: category || 'overall',
    comments,
    sentimentScore: sentiment.sentimentScore,
    sentimentLabel: sentiment.sentimentLabel,
    isAnonymous: Boolean(isAnonymous)
  });

  return ApiResponse.created(res, feedback, 'Feedback recorded with sentiment analysis');
});

export const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate('departmentId', 'name')
    .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, feedbacks, 'Feedbacks retrieved');
});
