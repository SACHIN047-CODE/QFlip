import { LabTest } from '../models/LabTest.js';
import { sendNotification } from '../services/notificationService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getLabRequests = asyncHandler(async (req, res) => {
  const { status, testCategory, priority } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (testCategory) filter.testCategory = testCategory;
  if (priority) filter.priority = priority;

  const requests = await LabTest.find(filter)
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone age gender' } },
      { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
    ])
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, requests, 'Laboratory test requests');
});

export const getMyLabReports = asyncHandler(async (req, res) => {
  const { Patient } = await import('../models/Patient.js');
  const patientProfile = await Patient.findOne({ userId: req.user._id });
  if (!patientProfile) {
    return ApiResponse.success(res, [], 'No lab reports found');
  }

  const reports = await LabTest.find({ patientId: patientProfile._id })
    .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name' } })
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, reports, 'Your personal lab reports');
});

export const updateLabTestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, resultSummary, resultParameters, remarks } = req.body;

  const labTest = await LabTest.findById(id).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name _id' } }
  ]);

  if (!labTest) {
    throw ApiError.notFound('Lab test record not found');
  }

  labTest.status = status;
  if (status === 'sample_collected') {
    labTest.sampleCollectedAt = new Date();
  } else if (status === 'completed') {
    labTest.completedAt = new Date();
    labTest.resultSummary = resultSummary || 'Report verified by Laboratory Officer';
    if (resultParameters) labTest.resultParameters = resultParameters;

    // Send push notification to patient that report is ready
    if (labTest.patientId?.userId?._id) {
      await sendNotification({
        recipientUserId: labTest.patientId.userId._id,
        title: 'Lab Test Result Ready',
        message: `Your lab report for ${labTest.testName} (${labTest.testRequestId}) is now ready and verified.`,
        type: 'lab_ready',
        metadata: { testRequestId: labTest.testRequestId }
      });
    }
  }

  if (req.user) {
    labTest.labStaffId = req.user._id;
  }

  await labTest.save();
  return ApiResponse.success(res, labTest, `Lab test status updated to ${status}`);
});

export const uploadLabReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    throw ApiError.badRequest('Please upload a lab report file (PDF or Image)');
  }

  const labTest = await LabTest.findById(id);
  if (!labTest) {
    throw ApiError.notFound('Lab test not found');
  }

  labTest.reportUrl = `/uploads/${req.file.filename}`;
  labTest.status = 'completed';
  labTest.completedAt = new Date();
  await labTest.save();

  return ApiResponse.success(res, labTest, 'Lab report uploaded successfully');
});
