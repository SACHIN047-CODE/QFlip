import { PharmacyOrder } from '../models/PharmacyOrder.js';
import { Prescription } from '../models/Prescription.js';
import { sendNotification } from '../services/notificationService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPharmacyOrders = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const orders = await PharmacyOrder.find(filter)
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone age gender' } },
      {
        path: 'prescriptionId',
        populate: { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
      }
    ])
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, orders, 'Pharmacy orders');
});

export const getMyPharmacyOrders = asyncHandler(async (req, res) => {
  const { Patient } = await import('../models/Patient.js');
  const patientProfile = await Patient.findOne({ userId: req.user._id });
  if (!patientProfile) {
    return ApiResponse.success(res, [], 'No pharmacy orders found');
  }

  const orders = await PharmacyOrder.find({ patientId: patientProfile._id })
    .populate({
      path: 'prescriptionId',
      populate: { path: 'doctorId', populate: { path: 'userId', select: 'name' } }
    })
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, orders, 'Your personal pharmacy orders');
});

export const dispensePharmacyOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await PharmacyOrder.findById(id).populate([
    { path: 'patientId', populate: { path: 'userId', select: 'name _id' } }
  ]);

  if (!order) {
    throw ApiError.notFound('Pharmacy order not found');
  }

  order.status = 'dispensed';
  order.dispensedAt = new Date();
  if (req.user) {
    order.pharmacistId = req.user._id;
  }
  await order.save();

  // Mark prescription as dispensed
  if (order.prescriptionId) {
    await Prescription.findByIdAndUpdate(order.prescriptionId, { status: 'dispensed' });
  }

  // Push notification to patient
  if (order.patientId?.userId?._id) {
    await sendNotification({
      recipientUserId: order.patientId.userId._id,
      title: 'Medications Dispensed',
      message: `Your prescription (${order.orderNumber}) has been packaged and dispensed at Pharmacy Counter.`,
      type: 'prescription_ready',
      metadata: { orderNumber: order.orderNumber }
    });
  }

  return ApiResponse.success(res, order, 'Medications successfully dispensed to patient');
});
