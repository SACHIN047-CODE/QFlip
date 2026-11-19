import { Doctor } from '../models/Doctor.js';
import { Queue } from '../models/Queue.js';
import { Appointment } from '../models/Appointment.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import dayjs from 'dayjs';

export const getAllDoctors = asyncHandler(async (req, res) => {
  const { departmentId, isAvailable } = req.query;
  const filter = {};

  if (departmentId) filter.departmentId = departmentId;
  if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

  const doctors = await Doctor.find(filter)
    .populate('userId', 'name email phone')
    .populate('departmentId', 'name code floor');

  return ApiResponse.success(res, doctors, 'Doctors list fetched');
});

export const getDoctorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id)
    .populate('userId', 'name email phone')
    .populate('departmentId', 'name code floor');

  if (!doctor) {
    throw ApiError.notFound('Doctor not found');
  }

  return ApiResponse.success(res, doctor, 'Doctor profile fetched');
});

export const getDoctorDashboard = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id }).populate('departmentId');
  if (!doctor) {
    throw ApiError.notFound('Doctor profile not found for this user account');
  }

  const todayStart = dayjs().startOf('day').toDate();

  const activeConsultation = await Queue.findOne({
    departmentId: doctor.departmentId._id,
    doctorId: doctor._id,
    status: 'in_consultation'
  }).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } }
  ]);

  const waitingQueue = await Queue.find({
    departmentId: doctor.departmentId._id,
    status: 'waiting',
    createdAt: { $gte: todayStart }
  })
    .sort({ priorityScore: -1, sequenceNumber: 1 })
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name phone' } }
    ]);

  const completedToday = await Queue.countDocuments({
    doctorId: doctor._id,
    status: 'completed',
    createdAt: { $gte: todayStart }
  });

  return ApiResponse.success(
    res,
    {
      doctor,
      activeConsultation,
      waitingQueue,
      waitingCount: waitingQueue.length,
      completedTodayCount: completedToday
    },
    'Doctor dashboard operational feed'
  );
});

export const toggleAvailability = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findOne({ userId: req.user._id });
  if (!doctor) {
    throw ApiError.notFound('Doctor profile not found');
  }

  const { isAvailable } = req.body;
  doctor.isAvailable = isAvailable !== undefined ? isAvailable : !doctor.isAvailable;
  await doctor.save();

  return ApiResponse.success(
    res,
    doctor,
    `Doctor availability marked as ${doctor.isAvailable ? 'Available' : 'Unavailable'}`
  );
});
