import { Staff } from '../models/Staff.js';
import { Queue } from '../models/Queue.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import dayjs from 'dayjs';

export const getStaffDashboard = asyncHandler(async (req, res) => {
  const todayStart = dayjs().startOf('day').toDate();

  const totalRegisteredToday = await Queue.countDocuments({
    createdAt: { $gte: todayStart }
  });

  const recentTokens = await Queue.find({
    createdAt: { $gte: todayStart }
  })
    .sort({ createdAt: -1 })
    .limit(15)
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name phone' } },
      { path: 'departmentId', select: 'name code' }
    ]);

  return ApiResponse.success(
    res,
    {
      totalRegisteredToday,
      recentTokens
    },
    'Staff operational overview'
  );
});

export const getAllStaff = asyncHandler(async (req, res) => {
  const staffMembers = await Staff.find()
    .populate('userId', 'name email phone')
    .populate('departmentId', 'name code');

  return ApiResponse.success(res, staffMembers, 'Staff directory');
});
