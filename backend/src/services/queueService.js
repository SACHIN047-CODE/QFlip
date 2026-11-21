import dayjs from 'dayjs';
import { Queue } from '../models/Queue.js';
import { Department } from '../models/Department.js';
import { Doctor } from '../models/Doctor.js';
import { ApiError } from '../utils/ApiError.js';
import { generateQueueToken } from '../utils/generateQueueToken.js';
import { getSocketIO, sendNotification } from './notificationService.js';
import logger from '../config/logger.js';

export class QueueService {
  /**
   * Calculate live estimated wait time in minutes for a queue position
   */
  static async calculateWaitTime(departmentId, patientsAheadCount) {
    if (!departmentId) {
      return Math.max(Math.round(patientsAheadCount * 12), 2);
    }
    const department = await Department.findById(departmentId);
    const avgTime = department?.averageWaitTimeMinutes || 12;

    // Count currently active and available doctors in this department
    const activeDoctorsCount = await Doctor.countDocuments({
      departmentId,
      isAvailable: true
    });

    const effectiveDoctors = Math.max(activeDoctorsCount, 1);
    const waitTime = Math.round((patientsAheadCount * avgTime) / effectiveDoctors);
    return Math.max(waitTime, 2); // At least 2 minutes minimum
  }

  /**
   * Generate next token for department
   */
  static async generateToken({
    patientId,
    departmentId,
    doctorId = null,
    appointmentId = null,
    triageLevel = 'green',
    symptoms = ''
  }) {
    const department = await Department.findById(departmentId);
    if (!department) {
      throw ApiError.notFound('Department not found');
    }

    const todayStart = dayjs().startOf('day').toDate();
    const todayEnd = dayjs().endOf('day').toDate();

    // Find highest sequence for this department today
    const lastToken = await Queue.findOne({
      departmentId,
      createdAt: { $gte: todayStart, $lte: todayEnd }
    }).sort({ sequenceNumber: -1 });

    const nextSeq = lastToken ? lastToken.sequenceNumber + 1 : 1;
    const tokenNumber = generateQueueToken(department.code, nextSeq);

    // Compute priority score
    let priorityScore = 10;
    if (triageLevel === 'red') priorityScore = 100;
    else if (triageLevel === 'yellow') priorityScore = 50;

    // Count patients currently waiting ahead
    const waitingAhead = await Queue.countDocuments({
      departmentId,
      status: { $in: ['waiting', 'called'] },
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const estimatedWaitTimeMinutes = await this.calculateWaitTime(
      departmentId,
      waitingAhead
    );

    const queueEntry = await Queue.create({
      tokenNumber,
      sequenceNumber: nextSeq,
      patientId,
      departmentId,
      doctorId,
      appointmentId,
      status: 'waiting',
      triageLevel,
      priorityScore,
      symptoms,
      estimatedWaitTimeMinutes,
      checkInTime: new Date()
    });

    // Populate patient and department
    await queueEntry.populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name phone email' } },
      { path: 'departmentId', select: 'name code floor' },
      { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
    ]);

    // Broadcast queue update via Socket.IO
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${departmentId}`).emit('queue:new_token', {
        queueEntry,
        waitingAhead
      });
      io.emit('queue:stats_update', {
        departmentId,
        departmentCode: department.code,
        waitingCount: waitingAhead + 1
      });
    }

    return queueEntry;
  }

  /**
   * Get Live OPD Queue Board for a department
   */
  static async getDepartmentQueue(departmentId) {
    const todayStart = dayjs().startOf('day').toDate();

    const currentServing = await Queue.findOne({
      departmentId,
      status: 'in_consultation'
    })
      .sort({ updatedAt: -1 })
      .populate('patientId doctorId');

    const currentlyCalled = await Queue.findOne({
      departmentId,
      status: 'called'
    })
      .sort({ updatedAt: -1 })
      .populate('patientId doctorId');

    const waitingList = await Queue.find({
      departmentId,
      status: 'waiting',
      createdAt: { $gte: todayStart }
    })
      .sort({ priorityScore: -1, sequenceNumber: 1 })
      .populate([
        { path: 'patientId', populate: { path: 'userId', select: 'name' } },
        { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      ]);

    const completedCount = await Queue.countDocuments({
      departmentId,
      status: 'completed',
      createdAt: { $gte: todayStart }
    });

    return {
      currentServing,
      currentlyCalled,
      waitingList,
      totalWaiting: waitingList.length,
      totalCompleted: completedCount
    };
  }

  /**
   * Advance Queue Status (Doctor calls patient, starts consultation, completes)
   */
  static async updateQueueStatus(queueId, nextStatus, doctorId = null, delayReason = '') {
    const queue = await Queue.findById(queueId).populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
      { path: 'departmentId', select: 'name code' }
    ]);

    if (!queue) {
      throw ApiError.notFound('Queue token record not found');
    }

    queue.status = nextStatus;

    if (doctorId) {
      queue.doctorId = doctorId;
    }

    if (nextStatus === 'called') {
      queue.callTime = new Date();
    } else if (nextStatus === 'in_consultation') {
      queue.consultationStartTime = new Date();
    } else if (nextStatus === 'completed') {
      queue.completionTime = new Date();
    }

    if (delayReason) {
      queue.delayReason = delayReason;
    }

    await queue.save();

    // Real-time broadcast
    const io = getSocketIO();
    if (io) {
      io.to(`dept:${queue.departmentId._id}`).emit('queue:status_changed', {
        queueId: queue._id,
        tokenNumber: queue.tokenNumber,
        status: nextStatus,
        doctorId
      });
    }

    // Send push notification to patient
    if (queue.patientId?.userId?._id) {
      const recipientId = queue.patientId.userId._id;
      let alertMsg = `Your token ${queue.tokenNumber} is now: ${nextStatus.replace('_', ' ').toUpperCase()}`;
      if (nextStatus === 'called') {
        alertMsg = `Attention: Token ${queue.tokenNumber} is being called to the consultation room! Please proceed inside.`;
      }
      await sendNotification({
        recipientUserId: recipientId,
        title: `Queue Status: ${queue.tokenNumber}`,
        message: alertMsg,
        type: 'queue_update',
        metadata: { tokenNumber: queue.tokenNumber, status: nextStatus }
      });
    }

    return queue;
  }
}

export default QueueService;
