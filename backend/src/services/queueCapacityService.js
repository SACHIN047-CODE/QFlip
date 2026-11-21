import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { Doctor } from '../models/Doctor.js';
import { Queue } from '../models/Queue.js';
import logger from '../config/logger.js';

dayjs.extend(customParseFormat);

export class QueueCapacityService {
  /**
   * Helper to parse doctor's shift time string (e.g., '09:00 AM' or '14:00') into a Date for today
   */
  static parseShiftTime(timeStr, baseDate = new Date()) {
    if (!timeStr) return null;
    const trimmed = timeStr.trim();
    const formats = ['hh:mm A', 'h:mm A', 'HH:mm', 'H:mm', 'hh:mma', 'h:mma'];
    const todayStr = dayjs(baseDate).format('YYYY-MM-DD');

    for (const fmt of formats) {
      const parsed = dayjs(`${todayStr} ${trimmed}`, `YYYY-MM-DD ${fmt}`, true);
      if (parsed.isValid()) {
        return parsed.second(0).millisecond(0).toDate();
      }
    }

    // Fallback: simple match
    const match = trimmed.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const meridiem = match[3] ? match[3].toUpperCase() : null;

      if (meridiem === 'PM' && hours < 12) hours += 12;
      if (meridiem === 'AM' && hours === 12) hours = 0;

      return dayjs(baseDate).hour(hours).minute(minutes).second(0).millisecond(0).toDate();
    }

    return null;
  }

  /**
   * Calculate doctor's live queue capacity, remaining OPD time, and buffer status
   * @param {string|ObjectId} doctorId 
   * @param {Date} [referenceTime] Optional reference time for testing/simulation
   */
  static async calculateDoctorCapacity(doctorId, referenceTime = new Date()) {
    const doctor = await Doctor.findById(doctorId).populate('departmentId userId');
    if (!doctor) {
      return {
        canAccept: false,
        reason: 'Doctor not found.',
        doctor: null,
        alternativeDoctors: []
      };
    }

    const todayStart = dayjs(referenceTime).startOf('day').toDate();
    const todayEnd = dayjs(referenceTime).endOf('day').toDate();

    // 1. Availability check
    if (!doctor.isAvailable) {
      const alternativeDoctors = await this.findAlternativeDoctors(doctor.departmentId?._id, doctor._id, referenceTime);
      return {
        canAccept: false,
        reason: 'Doctor is currently marked unavailable.',
        isAvailable: false,
        isClosed: false,
        remainingOpdMinutes: 0,
        activeWorkload: 0,
        estimatedCompletionMinutes: 0,
        isBuffer: false,
        remainingStandardCapacity: 0,
        remainingBufferCapacity: 0,
        bufferLimit: doctor.bufferCapacityLimit ?? 5,
        doctor: {
          id: doctor._id,
          name: doctor.userId?.name || doctor.specialization,
          specialization: doctor.specialization,
          roomNumber: doctor.roomNumber
        },
        alternativeDoctors
      };
    }

    // 2. Parse shift timings
    const shiftEnd = this.parseShiftTime(doctor.opdShift?.end || '02:00 PM', referenceTime);
    const shiftStart = this.parseShiftTime(doctor.opdShift?.start || '09:00 AM', referenceTime);

    let remainingOpdMinutes = 0;
    let isClosed = false;

    if (shiftEnd) {
      if (dayjs(referenceTime).isAfter(dayjs(shiftEnd))) {
        // Shift has already ended
        isClosed = true;
        remainingOpdMinutes = 0;
      } else if (shiftStart && dayjs(referenceTime).isBefore(dayjs(shiftStart))) {
        // Shift hasn't started yet - full shift duration remaining
        remainingOpdMinutes = Math.max(0, dayjs(shiftEnd).diff(dayjs(shiftStart), 'minute'));
      } else {
        // Currently within shift
        remainingOpdMinutes = Math.max(0, dayjs(shiftEnd).diff(dayjs(referenceTime), 'minute'));
      }
    } else {
      // Default fallback if no valid end time
      remainingOpdMinutes = 180;
    }

    if (isClosed) {
      const alternativeDoctors = await this.findAlternativeDoctors(doctor.departmentId?._id, doctor._id, referenceTime);
      return {
        canAccept: false,
        reason: 'Doctor OPD consultation session has closed for today.',
        isAvailable: true,
        isClosed: true,
        remainingOpdMinutes: 0,
        activeWorkload: 0,
        estimatedCompletionMinutes: 0,
        isBuffer: false,
        remainingStandardCapacity: 0,
        remainingBufferCapacity: 0,
        bufferLimit: doctor.bufferCapacityLimit ?? 5,
        doctor: {
          id: doctor._id,
          name: doctor.userId?.name || doctor.specialization,
          specialization: doctor.specialization,
          roomNumber: doctor.roomNumber
        },
        alternativeDoctors
      };
    }

    // 3. Count existing active queue workload
    const activeWorkload = await Queue.countDocuments({
      doctorId: doctor._id,
      status: { $in: ['waiting', 'called', 'in_consultation'] },
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    const avgDuration = doctor.averageConsultationTimeMinutes || 10;
    const estimatedCompletionMinutes = activeWorkload * avgDuration;

    // Standard capacity calculations
    const totalPossibleInRemainingTime = Math.floor(remainingOpdMinutes / avgDuration);
    const remainingStandardCapacity = Math.max(0, totalPossibleInRemainingTime - activeWorkload);

    // Buffer capacity calculations
    const bufferLimit = doctor.bufferCapacityLimit ?? 5;
    const currentBufferPatients = await Queue.countDocuments({
      doctorId: doctor._id,
      isBuffer: true,
      status: { $in: ['waiting', 'called', 'in_consultation'] },
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });
    const remainingBufferCapacity = Math.max(0, bufferLimit - currentBufferPatients);

    // 4. Determine acceptance and buffer status
    let canAccept = false;
    let isBuffer = false;
    let reason = '';

    if (estimatedCompletionMinutes < remainingOpdMinutes) {
      // Normal capacity available
      canAccept = true;
      isBuffer = false;
      reason = 'Standard queue capacity available.';
    } else {
      // Standard capacity reached/exceeded -> check buffer
      if (currentBufferPatients < bufferLimit) {
        canAccept = true;
        isBuffer = true;
        reason = `Standard OPD capacity reached (${activeWorkload} patients ahead). Accepted under extended buffer capacity (${remainingBufferCapacity} buffer slot${remainingBufferCapacity === 1 ? '' : 's'} remaining).`;
      } else {
        canAccept = false;
        isBuffer = false;
        reason = `Doctor's queue has reached its maximum booking capacity (standard and buffer limit of ${bufferLimit} exhausted).`;
      }
    }

    let alternativeDoctors = [];
    if (!canAccept) {
      alternativeDoctors = await this.findAlternativeDoctors(doctor.departmentId?._id, doctor._id, referenceTime);
    }

    return {
      canAccept,
      isBuffer,
      reason,
      remainingOpdMinutes,
      activeWorkload,
      avgConsultationDurationMinutes: avgDuration,
      estimatedCompletionMinutes,
      remainingStandardCapacity,
      currentBufferPatients,
      remainingBufferCapacity,
      bufferLimit,
      isAvailable: doctor.isAvailable,
      isClosed,
      doctor: {
        id: doctor._id,
        name: doctor.userId?.name || doctor.specialization,
        specialization: doctor.specialization,
        roomNumber: doctor.roomNumber
      },
      alternativeDoctors
    };
  }

  /**
   * Find alternative doctors in the same department (or other departments) that currently have capacity
   */
  static async findAlternativeDoctors(departmentId, excludeDoctorId = null, referenceTime = new Date()) {
    try {
      if (!departmentId) return [];

      const otherDoctors = await Doctor.find({
        departmentId,
        isAvailable: true,
        ...(excludeDoctorId ? { _id: { $ne: excludeDoctorId } } : {})
      }).populate('userId departmentId');

      const availableAlternatives = [];

      for (const otherDoc of otherDoctors) {
        // Quick check if OPD has closed
        const shiftEnd = this.parseShiftTime(otherDoc.opdShift?.end || '02:00 PM', referenceTime);
        if (shiftEnd && dayjs(referenceTime).isAfter(dayjs(shiftEnd))) {
          continue; // closed
        }

        const todayStart = dayjs(referenceTime).startOf('day').toDate();
        const todayEnd = dayjs(referenceTime).endOf('day').toDate();

        const activeCount = await Queue.countDocuments({
          doctorId: otherDoc._id,
          status: { $in: ['waiting', 'called', 'in_consultation'] },
          createdAt: { $gte: todayStart, $lte: todayEnd }
        });

        const avgDuration = otherDoc.averageConsultationTimeMinutes || 10;
        const remainingMinutes = shiftEnd ? Math.max(0, dayjs(shiftEnd).diff(dayjs(referenceTime), 'minute')) : 120;
        const estCompletion = activeCount * avgDuration;

        if (estCompletion < remainingMinutes) {
          availableAlternatives.push({
            id: otherDoc._id,
            name: otherDoc.userId?.name || otherDoc.specialization,
            specialization: otherDoc.specialization,
            roomNumber: otherDoc.roomNumber,
            activeQueueCount: activeCount,
            estimatedWaitMinutes: activeCount * avgDuration
          });
        }
      }

      return availableAlternatives;
    } catch (err) {
      logger.error('Failed to find alternative doctors', err);
      return [];
    }
  }
}

export default QueueCapacityService;
