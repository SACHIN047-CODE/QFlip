import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';
import { Patient } from '../models/Patient.js';
import { Doctor } from '../models/Doctor.js';
import { Department } from '../models/Department.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const { role, isActive, search } = req.query;
  const filter = {};

  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
  return ApiResponse.success(res, users, 'Users retrieved');
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });

  await AuditLog.create({
    userId: req.user._id,
    userRole: req.user.role,
    action: user.isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
    resource: 'User',
    resourceId: user._id.toString()
  });

  return ApiResponse.success(
    res,
    user,
    `User account has been ${user.isActive ? 'activated' : 'deactivated'}`
  );
});

export const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find()
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 })
    .limit(100);

  return ApiResponse.success(res, logs, 'System audit trail');
});
