import crypto from 'crypto';
import dayjs from 'dayjs';
import { Appointment } from '../models/Appointment.js';
import { Patient } from '../models/Patient.js';
import { Department } from '../models/Department.js';
import { QueueService } from '../services/queueService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const bookAppointment = asyncHandler(async (req, res) => {
  let { patientId, doctorId, departmentId, appointmentDate, timeSlot, symptoms, priority, tokenNumber } = req.body;

  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      throw ApiError.notFound('Patient profile not found for this account.');
    }
    patientId = patientProfile._id;
  }

  const appointmentCount = await Appointment.countDocuments();
  const appointmentNumber = `APT-${new Date().getFullYear()}-${String(appointmentCount + 1).padStart(5, '0')}`;

  // Generate cryptographically secure random access token
  const secureAccessToken = crypto.randomBytes(32).toString('hex');
  const accessTokenHash = crypto.createHash('sha256').update(secureAccessToken).digest('hex');

  // Set access token expiry (30 days from creation/appointment date)
  const baseDate = appointmentDate ? new Date(appointmentDate) : new Date();
  const accessTokenExpiry = new Date(baseDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Assign or generate token number
  if (!tokenNumber) {
    let deptCode = 'GEN';
    if (departmentId) {
      const dept = await Department.findById(departmentId);
      if (dept?.code) deptCode = dept.code;
    }
    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();
    const dayCount = await Appointment.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });
    tokenNumber = `OPD-${deptCode}-${String(dayCount + 1).padStart(3, '0')}`;
  }

  const appointment = await Appointment.create({
    appointmentNumber,
    tokenNumber,
    patientId,
    doctorId,
    departmentId,
    appointmentDate: new Date(appointmentDate || Date.now()),
    timeSlot: timeSlot || '10:00 AM - 10:30 AM',
    symptoms: symptoms || '',
    priority: priority || 'normal',
    status: 'scheduled',
    accessToken: secureAccessToken,
    accessTokenHash,
    accessTokenExpiry,
    isRevoked: false
  });

  const populated = await Appointment.findById(appointment._id).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name' } },
    { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
    { path: 'departmentId', select: 'name code floor' }
  ]);

  const responseData = populated.toObject();
  responseData.secureAccessToken = secureAccessToken;
  responseData.qrAccessUrl = `/appointment/${secureAccessToken}`;

  return ApiResponse.created(res, responseData, 'Appointment booked successfully');
});

export const getAppointmentPassByToken = asyncHandler(async (req, res) => {
  const { secureAccessToken } = req.params;

  if (!secureAccessToken || typeof secureAccessToken !== 'string') {
    throw ApiError.badRequest('Invalid or missing access token');
  }

  const tokenHash = crypto.createHash('sha256').update(secureAccessToken).digest('hex');

  const appointment = await Appointment.findOne({ accessTokenHash: tokenHash }).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name' } },
    { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
    { path: 'departmentId', select: 'name code floor' }
  ]);

  if (!appointment) {
    throw ApiError.notFound('Invalid or unknown appointment pass link.');
  }

  if (appointment.isRevoked) {
    throw ApiError.badRequest('This digital appointment pass has been cancelled or revoked.');
  }

  if (appointment.accessTokenExpiry && new Date() > new Date(appointment.accessTokenExpiry)) {
    throw ApiError.badRequest('This digital appointment pass has expired.');
  }

  // Strictly sanitized public appointment details - NO sensitive personal info or internal Mongo IDs
  const publicPass = {
    appointmentId: appointment.appointmentNumber,
    tokenNumber: appointment.tokenNumber || 'N/A',
    patientName: appointment.patientId?.userId?.name || 'Registered Patient',
    doctorName: appointment.doctorId?.userId?.name || 'Assigned OPD Doctor',
    doctorSpecialization: appointment.doctorId?.specialization || 'Clinical Specialist',
    roomNumber: appointment.doctorId?.roomNumber || 'OPD Room',
    departmentName: appointment.departmentId?.name || 'General OPD',
    departmentCode: appointment.departmentId?.code || 'GEN',
    departmentFloor: appointment.departmentId?.floor || 'Ground Floor',
    appointmentDate: appointment.appointmentDate,
    timeSlot: appointment.timeSlot,
    status: appointment.status,
    priority: appointment.priority
  };

  return ApiResponse.success(res, publicPass, 'Appointment pass retrieved successfully');
});

export const getAppointmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name' } },
    { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
    { path: 'departmentId', select: 'name code floor' }
  ]);

  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }

  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile || String(appointment.patientId._id) !== String(patientProfile._id)) {
      throw ApiError.forbidden('You do not have permission to view this appointment');
    }
  }

  return ApiResponse.success(res, appointment, 'Appointment retrieved successfully');
});

export const revokeAppointmentPass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }

  appointment.isRevoked = true;
  appointment.status = 'cancelled';
  await appointment.save();

  return ApiResponse.success(res, appointment, 'Appointment pass revoked successfully');
});

export const getAppointments = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      return ApiResponse.success(res, [], 'No appointments scheduled');
    }
    filter.patientId = patientProfile._id;
  } else if (req.user.role === 'doctor') {
    // If doctor, filter by their doctor record
    const { Doctor } = await import('../models/Doctor.js');
    const doc = await Doctor.findOne({ userId: req.user._id });
    if (doc) filter.doctorId = doc._id;
  }

  if (req.query.status) filter.status = req.query.status;
  if (req.query.departmentId) filter.departmentId = req.query.departmentId;

  const appointments = await Appointment.find(filter)
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name phone' } },
      { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
      { path: 'departmentId', select: 'name code floor' }
    ])
    .sort({ appointmentDate: -1 });

  return ApiResponse.success(res, appointments, 'Appointments retrieved');
});

export const checkInAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw ApiError.notFound('Appointment not found');
  }

  appointment.status = 'checked_in';
  await appointment.save();

  // Automatically convert checked-in appointment to an active queue token
  const queueToken = await QueueService.generateToken({
    patientId: appointment.patientId,
    departmentId: appointment.departmentId,
    doctorId: appointment.doctorId,
    appointmentId: appointment._id,
    triageLevel: appointment.priority === 'urgent' ? 'yellow' : 'green',
    symptoms: appointment.symptoms
  });

  return ApiResponse.success(
    res,
    { appointment, queueToken },
    'Appointment checked-in and OPD Queue token generated'
  );
});
