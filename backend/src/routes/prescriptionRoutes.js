import { Router } from 'express';
import {
  getPatientPrescriptions,
  getPrescriptionById
} from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/patient/:patientId', getPatientPrescriptions);
router.get('/my-prescriptions', getPatientPrescriptions);
router.get('/:id', getPrescriptionById);

export default router;
