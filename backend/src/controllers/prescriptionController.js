import { Prescription } from '../models/Prescription.js';
import { Patient } from '../models/Patient.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPatientPrescriptions = asyncHandler(async (req, res) => {
  let { patientId } = req.params;

  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      return ApiResponse.success(res, [], 'Prescriptions list');
    }
    patientId = patientProfile._id;
  }

  const prescriptions = await Prescription.find({ patientId })
    .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
    .populate('consultationId', 'diagnosis clinicalNotes createdAt')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, prescriptions, 'Prescriptions list');
});

export const getPrescriptionById = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate({ path: 'patientId', populate: { path: 'userId', select: 'name age gender phone' } })
    .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } });

  if (!prescription) {
    throw ApiError.notFound('Prescription record not found');
  }

  // Strict Data Privacy: A patient can only view their own prescription
  if (req.user.role === 'patient') {
    if (!prescription.patientId?.userId || prescription.patientId.userId._id.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('Access denied. You can only view your own prescriptions.');
    }
  }

  return ApiResponse.success(res, prescription, 'Prescription details');
});
