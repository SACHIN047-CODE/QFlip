import { Appointment } from '../models/Appointment.js';
import { Patient } from '../models/Patient.js';
import { QueueService } from '../services/queueService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const bookAppointment = asyncHandler(async (req, res) => {
  let { patientId, doctorId, departmentId, appointmentDate, timeSlot, symptoms, priority } = req.body;

  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      throw ApiError.notFound('Patient profile not found for this account.');
    }
    patientId = patientProfile._id;
  }

  const appointmentCount = await Appointment.countDocuments();
  const appointmentNumber = `APT-${new Date().getFullYear()}-${String(appointmentCount + 1).padStart(5, '0')}`;

  const appointment = await Appointment.create({
    appointmentNumber,
    patientId,
    doctorId,
    departmentId,
    appointmentDate: new Date(appointmentDate),
    timeSlot: timeSlot || '10:00 AM - 10:30 AM',
    symptoms: symptoms || '',
    priority: priority || 'normal',
    status: 'scheduled'
  });

  return ApiResponse.created(res, appointment, 'Appointment booked successfully');
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
