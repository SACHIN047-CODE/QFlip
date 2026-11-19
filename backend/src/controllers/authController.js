import { User } from '../models/User.js';
import { Patient } from '../models/Patient.js';
import { Doctor } from '../models/Doctor.js';
import { Staff } from '../models/Staff.js';
import { AuditLog } from '../models/AuditLog.js';
import { generateToken } from '../utils/generateToken.js';
import { generatePatientId } from '../utils/generatePatientId.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role = 'patient', ...additionalInfo } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('An account with this email already exists.');
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role
  });

  // Automatically create corresponding profile based on role
  let profile = null;
  if (role === 'patient') {
    const patientCount = await Patient.countDocuments();
    const patientId = generatePatientId(patientCount + 1);
    profile = await Patient.create({
      patientId,
      userId: user._id,
      age: additionalInfo.age || 30,
      gender: additionalInfo.gender || 'Male',
      address: additionalInfo.address || {}
    });
  } else if (role === 'doctor') {
    const doctorCount = await Doctor.countDocuments();
    profile = await Doctor.create({
      doctorId: `DOC-${String(doctorCount + 1).padStart(3, '0')}`,
      userId: user._id,
      specialization: additionalInfo.specialization || 'General Physician',
      departmentId: additionalInfo.departmentId
    });
  } else if (role === 'registration_staff') {
    const staffCount = await Staff.countDocuments();
    profile = await Staff.create({
      staffId: `STF-${String(staffCount + 1).padStart(3, '0')}`,
      userId: user._id,
      designation: 'Registration Officer'
    });
  }

  // Audit log
  await AuditLog.create({
    userId: user._id,
    userRole: user.role,
    action: 'USER_REGISTERED',
    resource: 'User',
    resourceId: user._id.toString()
  });

  const token = generateToken({ id: user._id, role: user.role });

  return ApiResponse.created(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      profile,
      token
    },
    'Account registered successfully'
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password credentials');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('This user account has been deactivated. Contact administration.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password credentials');
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Fetch associated role profile
  let profile = null;
  if (user.role === 'patient') {
    profile = await Patient.findOne({ userId: user._id });
  } else if (user.role === 'doctor') {
    profile = await Doctor.findOne({ userId: user._id }).populate('departmentId', 'name code');
  } else if (user.role === 'registration_staff') {
    profile = await Staff.findOne({ userId: user._id });
  }

  const token = generateToken({ id: user._id, role: user.role });

  await AuditLog.create({
    userId: user._id,
    userRole: user.role,
    action: 'USER_LOGIN',
    resource: 'User',
    resourceId: user._id.toString()
  });

  return ApiResponse.success(
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      profile,
      token
    },
    'Login successful'
  );
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  let profile = null;

  if (user.role === 'patient') {
    profile = await Patient.findOne({ userId: user._id });
  } else if (user.role === 'doctor') {
    profile = await Doctor.findOne({ userId: user._id }).populate('departmentId', 'name code floor');
  } else if (user.role === 'registration_staff') {
    profile = await Staff.findOne({ userId: user._id });
  }

  return ApiResponse.success(res, { user, profile }, 'Current user profile');
});

export const updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.user._id);

  user.role = role;
  await user.save({ validateBeforeSave: false });

  const token = generateToken({ id: user._id, role: user.role });

  return ApiResponse.success(res, { user, token }, `Role updated to ${role}`);
});

export const verifyDoctorPasskey = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  const { config } = await import('../config/env.js');

  if (!pin) {
    throw ApiError.badRequest('Doctor Passkey PIN is required');
  }

  const configuredPasskey = config.doctorPasskey || '7788';
  const isMatch = String(pin).trim() === String(configuredPasskey).trim();

  if (!isMatch) {
    throw ApiError.forbidden('Invalid Clinical Passkey. Access Denied.');
  }

  return ApiResponse.success(
    res,
    { verified: true },
    'Doctor Clinical authorization verified successfully'
  );
});
