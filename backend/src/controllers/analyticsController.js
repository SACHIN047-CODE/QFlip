import { Queue } from '../models/Queue.js';
import { Department } from '../models/Department.js';
import { Doctor } from '../models/Doctor.js';
import { Patient } from '../models/Patient.js';
import { Appointment } from '../models/Appointment.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import dayjs from 'dayjs';

export const getHospitalAnalytics = asyncHandler(async (req, res) => {
  const todayStart = dayjs().startOf('day').toDate();
  const weekStart = dayjs().subtract(7, 'day').startOf('day').toDate();

  const totalPatients = await Patient.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const activeDoctors = await Doctor.countDocuments({ isAvailable: true });

  const totalTokensToday = await Queue.countDocuments({ createdAt: { $gte: todayStart } });
  const completedTokensToday = await Queue.countDocuments({
    status: 'completed',
    createdAt: { $gte: todayStart }
  });
  const waitingTokensToday = await Queue.countDocuments({
    status: 'waiting',
    createdAt: { $gte: todayStart }
  });

  // Calculate Average Wait Time for today
  const queuesToday = await Queue.find({
    status: 'completed',
    createdAt: { $gte: todayStart },
    callTime: { $exists: true }
  });

  let avgWaitMinutes = 18;
  if (queuesToday.length > 0) {
    const totalWait = queuesToday.reduce((acc, q) => {
      const wait = dayjs(q.callTime).diff(dayjs(q.checkInTime), 'minute');
      return acc + Math.max(wait, 0);
    }, 0);
    avgWaitMinutes = Math.round(totalWait / queuesToday.length);
  }

  // Departmental breakdown
  const departments = await Department.find({ isActive: true });
  const departmentBreakdown = await Promise.all(
    departments.map(async (dept) => {
      const tokensCount = await Queue.countDocuments({
        departmentId: dept._id,
        createdAt: { $gte: todayStart }
      });
      const waiting = await Queue.countDocuments({
        departmentId: dept._id,
        status: 'waiting'
      });
      return {
        name: dept.name,
        code: dept.code,
        totalToday: tokensCount,
        currentlyWaiting: waiting,
        averageWaitMinutes: dept.averageWaitTimeMinutes
      };
    })
  );

  return ApiResponse.success(
    res,
    {
      kpis: {
        totalPatients,
        totalDoctors,
        activeDoctors,
        totalTokensToday,
        completedTokensToday,
        waitingTokensToday,
        averageWaitMinutes
      },
      departmentBreakdown
    },
    'Hospital analytics operational overview'
  );
});
