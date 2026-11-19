import { Department } from '../models/Department.js';
import { Doctor } from '../models/Doctor.js';
import { Queue } from '../models/Queue.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({ isActive: true });

  // Attach live metrics for each department
  const enriched = await Promise.all(
    departments.map(async (dept) => {
      const activeDoctors = await Doctor.countDocuments({
        departmentId: dept._id,
        isAvailable: true
      });
      const currentWaiting = await Queue.countDocuments({
        departmentId: dept._id,
        status: 'waiting'
      });
      const avgWait = Math.round((currentWaiting * dept.averageWaitTimeMinutes) / Math.max(activeDoctors, 1));

      return {
        ...dept.toObject(),
        activeDoctorsCount: activeDoctors,
        currentWaitingCount: currentWaiting,
        liveWaitTimeMinutes: Math.max(avgWait, 2)
      };
    })
  );

  return ApiResponse.success(res, enriched, 'All hospital departments');
});

export const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) {
    throw ApiError.notFound('Department not found');
  }

  const doctors = await Doctor.find({ departmentId: department._id }).populate('userId', 'name email phone');
  return ApiResponse.success(res, { department, doctors }, 'Department details');
});

export const createDepartment = asyncHandler(async (req, res) => {
  const { name, code, description, floor, roomNumbers, averageWaitTimeMinutes, maxDailyCapacity } = req.body;

  const existing = await Department.findOne({ $or: [{ name }, { code }] });
  if (existing) {
    throw ApiError.conflict('Department with this name or code already exists');
  }

  const department = await Department.create({
    name,
    code,
    description,
    floor,
    roomNumbers,
    averageWaitTimeMinutes,
    maxDailyCapacity
  });

  return ApiResponse.created(res, department, 'Department created successfully');
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!department) {
    throw ApiError.notFound('Department not found');
  }

  return ApiResponse.success(res, department, 'Department updated');
});
