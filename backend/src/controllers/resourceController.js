import { HospitalResource } from '../models/HospitalResource.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getResources = asyncHandler(async (req, res) => {
  const { resourceType, status, departmentId } = req.query;
  const filter = {};

  if (resourceType) filter.resourceType = resourceType;
  if (status) filter.status = status;
  if (departmentId) filter.departmentId = departmentId;

  const resources = await HospitalResource.find(filter)
    .populate('departmentId', 'name code floor')
    .populate({ path: 'allocatedToPatientId', populate: { path: 'userId', select: 'name' } });

  const summary = {
    total: resources.length,
    available: resources.filter((r) => r.status === 'available').length,
    occupied: resources.filter((r) => r.status === 'occupied').length,
    maintenance: resources.filter((r) => r.status === 'maintenance').length
  };

  return ApiResponse.success(res, { summary, resources }, 'Hospital resources');
});

export const updateResourceStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, allocatedToPatientId, ward } = req.body;

  const resource = await HospitalResource.findById(id);
  if (!resource) {
    throw ApiError.notFound('Resource not found');
  }

  if (status) resource.status = status;
  if (allocatedToPatientId !== undefined) resource.allocatedToPatientId = allocatedToPatientId || null;
  if (ward) resource.ward = ward;

  await resource.save();
  return ApiResponse.success(res, resource, 'Resource status updated');
});

export const createResource = asyncHandler(async (req, res) => {
  const { resourceType, resourceName, identifier, departmentId, ward } = req.body;

  const existing = await HospitalResource.findOne({ identifier });
  if (existing) {
    throw ApiError.conflict('Resource with this identifier already exists');
  }

  const resource = await HospitalResource.create({
    resourceType,
    resourceName,
    identifier,
    departmentId,
    ward: ward || 'General Ward A',
    status: 'available'
  });

  return ApiResponse.created(res, resource, 'Resource created successfully');
});
