import { Patient } from '../models/Patient.js';
import { User } from '../models/User.js';
import { Appointment } from '../models/Appointment.js';
import { Queue } from '../models/Queue.js';
import { Consultation } from '../models/Consultation.js';
import { Prescription } from '../models/Prescription.js';
import { LabTest } from '../models/LabTest.js';
import { generatePatientId } from '../utils/generatePatientId.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const registerPatientByStaff = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    gender,
    age,
    dateOfBirth,
    address,
    emergencyContact,
    bloodGroup,
    allergies,
    chronicConditions
  } = req.body;

  // Check if a user with this phone or email already exists
  let user = null;
  const userEmail = email || `patient_${Date.now()}@careflow.gov.in`;
  
  user = await User.findOne({ $or: [{ phone }, { email: userEmail }] });
  if (!user) {
    user = await User.create({
      name,
      phone,
      email: userEmail,
      password: 'careflow_default_pwd_2026', // Can be reset via OTP/SMS
      role: 'patient'
    });
  }

  const patientCount = await Patient.countDocuments();
  const patientId = generatePatientId(patientCount + 1);

  const patient = await Patient.create({
    patientId,
    userId: user._id,
    gender: gender || 'Male',
    age: age || 30,
    dateOfBirth,
    address: address || {},
    emergencyContact: emergencyContact || {},
    basicMedicalInformation: {
      bloodGroup: bloodGroup || 'Unknown',
      allergies: allergies || [],
      chronicConditions: chronicConditions || []
    }
  });

  return ApiResponse.created(
    res,
    { patient, user: { id: user._id, name: user.name, phone: user.phone } },
    'Patient registered successfully'
  );
});

export const getMyPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user._id }).populate('userId', 'name email phone');
  if (!patient) {
    throw ApiError.notFound('Patient record not found for this account');
  }

  return ApiResponse.success(res, patient, 'Patient profile retrieved');
});

export const getPatientMedicalHistory = asyncHandler(async (req, res) => {
  const { id } = req.params; // Can be patientId or Mongo ObjectId

  let patient = await Patient.findOne({
    $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { patientId: id }]
  }).populate('userId', 'name email phone');

  if (!patient && req.user.role === 'patient') {
    patient = await Patient.findOne({ userId: req.user._id }).populate('userId', 'name email phone');
  }

  if (!patient) {
    throw ApiError.notFound('Patient record not found');
  }

  // Strict Data Privacy Check: A patient can ONLY view their own records
  if (req.user.role === 'patient') {
    if (patient.userId && patient.userId._id.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('Access denied. You are strictly permitted to view only your own medical records.');
    }
  }

  const appointments = await Appointment.find({ patientId: patient._id })
    .populate('doctorId departmentId')
    .sort({ appointmentDate: -1 });

  const queues = await Queue.find({ patientId: patient._id })
    .populate('departmentId doctorId')
    .sort({ createdAt: -1 });

  const consultations = await Consultation.find({ patientId: patient._id })
    .populate('doctorId departmentId')
    .sort({ createdAt: -1 });

  const prescriptions = await Prescription.find({ patientId: patient._id })
    .populate('doctorId')
    .sort({ createdAt: -1 });

  const labTests = await LabTest.find({ patientId: patient._id })
    .populate('doctorId')
    .sort({ createdAt: -1 });

  return ApiResponse.success(
    res,
    {
      patient,
      appointments,
      queues,
      consultations,
      prescriptions,
      labTests
    },
    'Complete patient medical records retrieved'
  );
});

export const searchPatients = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    const recent = await Patient.find().populate('userId', 'name email phone').limit(20);
    return ApiResponse.success(res, recent);
  }

  const users = await User.find({
    role: 'patient',
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { phone: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  }).select('_id');

  const userIds = users.map((u) => u._id);

  const patients = await Patient.find({
    $or: [
      { patientId: { $regex: query, $options: 'i' } },
      { userId: { $in: userIds } }
    ]
  }).populate('userId', 'name email phone');

  return ApiResponse.success(res, patients, `Found ${patients.length} matching patients`);
});
