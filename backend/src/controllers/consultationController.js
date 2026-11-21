import { Consultation } from '../models/Consultation.js';
import { Prescription } from '../models/Prescription.js';
import { PharmacyOrder } from '../models/PharmacyOrder.js';
import { LabTest } from '../models/LabTest.js';
import { Queue } from '../models/Queue.js';
import { Doctor } from '../models/Doctor.js';
import { QueueService } from '../services/queueService.js';
import { getSocketIO, sendNotification } from '../services/notificationService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createConsultation = asyncHandler(async (req, res) => {
  const {
    queueId,
    patientId,
    chiefComplaints,
    clinicalObservations,
    diagnosis,
    vitalSigns,
    clinicalNotes,
    followUpDate,
    prescriptions = [], // [{ name, dosage, frequency, duration, instructions }]
    labTests = [] // [{ testName, testCategory, priority }]
  } = req.body;

  // Find doctor record for logged-in user
  let doctor = await Doctor.findOne({ userId: req.user._id });
  let doctorId = doctor ? doctor._id : req.body.doctorId;

  if (!doctorId) {
    throw ApiError.badRequest('Doctor identification required');
  }

  const consultationCount = await Consultation.countDocuments();
  const consultationId = `CNS-${new Date().getFullYear()}-${String(consultationCount + 1).padStart(5, '0')}`;

  const consultation = await Consultation.create({
    consultationId,
    patientId,
    doctorId,
    departmentId: doctor ? doctor.departmentId : req.body.departmentId,
    queueId,
    chiefComplaints,
    clinicalObservations,
    diagnosis,
    vitalSigns: vitalSigns || {},
    clinicalNotes,
    followUpDate: followUpDate ? new Date(followUpDate) : null,
    status: 'completed'
  });

  // 1. If medications were prescribed, create Prescription and Pharmacy Order
  let prescriptionRecord = null;
  let pharmacyOrder = null;
  if (prescriptions && prescriptions.length > 0) {
    const pCount = await Prescription.countDocuments();
    const prescriptionNumber = `RX-${new Date().getFullYear()}-${String(pCount + 1).padStart(5, '0')}`;

    prescriptionRecord = await Prescription.create({
      prescriptionNumber,
      consultationId: consultation._id,
      patientId,
      doctorId,
      medications: prescriptions,
      dietaryAdvice: clinicalNotes || 'Follow prescribed regimen.'
    });

    const oCount = await PharmacyOrder.countDocuments();
    pharmacyOrder = await PharmacyOrder.create({
      orderNumber: `PHARM-${new Date().getFullYear()}-${String(oCount + 1).padStart(5, '0')}`,
      prescriptionId: prescriptionRecord._id,
      patientId,
      items: prescriptions.map((m) => ({
        medicineName: m.name,
        quantity: parseInt(m.duration, 10) * 2 || 10,
        dosage: m.dosage,
        unitPrice: 0,
        total: 0
      })),
      totalAmount: 0,
      paymentStatus: 'exempt_gov',
      status: 'received'
    });

    // Notify Pharmacy
    const io = getSocketIO();
    if (io) {
      io.emit('pharmacy:new_order', pharmacyOrder);
    }
  }

  // 2. If lab tests were ordered, create LabTest records
  const createdLabTests = [];
  if (labTests && labTests.length > 0) {
    for (const test of labTests) {
      const lCount = await LabTest.countDocuments();
      const testReqId = `LAB-${new Date().getFullYear()}-${String(lCount + 1).padStart(5, '0')}`;

      const labRecord = await LabTest.create({
        testRequestId: testReqId,
        consultationId: consultation._id,
        patientId,
        doctorId,
        testCategory: test.testCategory || 'Hematology',
        testName: test.testName,
        priority: test.priority || 'routine',
        status: 'requested'
      });
      createdLabTests.push(labRecord);
    }

    // Notify Laboratory
    const io = getSocketIO();
    if (io) {
      io.emit('lab:new_request', createdLabTests);
    }
  }

  // 3. Mark Queue Token as completed
  if (queueId) {
    await QueueService.updateQueueStatus(queueId, 'completed', doctorId);
  }

  return ApiResponse.created(
    res,
    {
      consultation,
      prescription: prescriptionRecord,
      pharmacyOrder,
      labTests: createdLabTests
    },
    'Consultation completed and downstream orders placed'
  );
});

export const getConsultationById = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findById(req.params.id)
    .populate([
      { path: 'patientId', populate: { path: 'userId', select: 'name email phone' } },
      { path: 'doctorId', populate: { path: 'userId', select: 'name' } },
      { path: 'departmentId', select: 'name code floor' }
    ]);

  if (!consultation) {
    throw ApiError.notFound('Consultation not found');
  }

  // Strict Data Privacy: A patient can only view their own consultation
  if (req.user.role === 'patient') {
    if (!consultation.patientId?.userId || consultation.patientId.userId._id.toString() !== req.user._id.toString()) {
      throw ApiError.forbidden('Access denied. You can only view your own consultation records.');
    }
  }

  const prescription = await Prescription.findOne({ consultationId: consultation._id });
  const labTests = await LabTest.find({ consultationId: consultation._id });

  return ApiResponse.success(res, { consultation, prescription, labTests }, 'Consultation details');
});
