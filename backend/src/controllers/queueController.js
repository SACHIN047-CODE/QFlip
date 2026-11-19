import { Queue } from '../models/Queue.js';
import { Patient } from '../models/Patient.js';
import { Department } from '../models/Department.js';
import { QueueService } from '../services/queueService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const generateToken = asyncHandler(async (req, res) => {
  let { patientId, departmentId, doctorId, appointmentId, triageLevel = 'green', symptoms = '' } = req.body;

  // If called by an authenticated patient, auto-resolve their patientId
  if (req.user.role === 'patient') {
    const patientProfile = await Patient.findOne({ userId: req.user._id });
    if (!patientProfile) {
      throw ApiError.notFound('No patient profile found for this account.');
    }
    patientId = patientProfile._id;
  }

  if (!patientId || !departmentId) {
    throw ApiError.badRequest('Both patientId and departmentId are required.');
  }

  const queueEntry = await QueueService.generateToken({
    patientId,
    departmentId,
    doctorId,
    appointmentId,
    triageLevel,
    symptoms
  });

  return ApiResponse.created(res, queueEntry, 'Queue token issued successfully');
});

export const getDepartmentQueue = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const queueData = await QueueService.getDepartmentQueue(departmentId);
  return ApiResponse.success(res, queueData, 'Live OPD queue fetched');
});

export const getMyActiveToken = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ userId: req.user._id });
  if (!patient) {
    throw ApiError.notFound('Patient record not found');
  }

  const activeToken = await Queue.findOne({
    patientId: patient._id,
    status: { $in: ['waiting', 'called', 'in_consultation'] }
  })
    .sort({ createdAt: -1 })
    .populate('departmentId doctorId');

  let patientsAhead = 0;
  if (activeToken && activeToken.status === 'waiting') {
    patientsAhead = await Queue.countDocuments({
      departmentId: activeToken.departmentId._id,
      status: 'waiting',
      sequenceNumber: { $lt: activeToken.sequenceNumber }
    });
  }

  return ApiResponse.success(
    res,
    { activeToken, patientsAhead },
    activeToken ? 'Active token retrieved' : 'No active token currently waiting'
  );
});

export const updateQueueStatus = asyncHandler(async (req, res) => {
  const { queueId } = req.params;
  const { status, doctorId, delayReason } = req.body;

  const validStatuses = [
    'waiting',
    'called',
    'in_consultation',
    'completed',
    'skipped',
    'transferred',
    'cancelled'
  ];

  if (!validStatuses.includes(status)) {
    throw ApiError.badRequest(`Invalid queue status. Allowed: ${validStatuses.join(', ')}`);
  }

  const updatedQueue = await QueueService.updateQueueStatus(
    queueId,
    status,
    doctorId,
    delayReason
  );

  return ApiResponse.success(res, updatedQueue, `Queue status updated to ${status}`);
});

export const transferQueue = asyncHandler(async (req, res) => {
  const { queueId } = req.params;
  const { targetDepartmentId, reason } = req.body;

  const currentQueue = await Queue.findById(queueId);
  if (!currentQueue) {
    throw ApiError.notFound('Queue token not found');
  }

  currentQueue.status = 'transferred';
  currentQueue.delayReason = `Transferred: ${reason || 'Doctor Referral'}`;
  await currentQueue.save();

  // Create new token in destination department
  const newQueueEntry = await QueueService.generateToken({
    patientId: currentQueue.patientId,
    departmentId: targetDepartmentId,
    triageLevel: currentQueue.triageLevel,
    symptoms: `Transferred from previous OPD. ${reason || ''}`
  });

  return ApiResponse.success(
    res,
    { previousToken: currentQueue.tokenNumber, newToken: newQueueEntry },
    'Patient successfully transferred to new department queue'
  );
});
