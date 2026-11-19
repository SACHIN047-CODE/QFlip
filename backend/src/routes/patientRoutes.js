import { Router } from 'express';
import {
  registerPatientByStaff,
  getMyPatientProfile,
  getPatientMedicalHistory,
  searchPatients
} from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { validatePatientRegistration } from '../validators/patientValidator.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = Router();

router.use(protect);

router.post(
  '/register',
  authorizeRoles('registration_staff', 'admin', 'doctor'),
  validatePatientRegistration,
  validateRequest,
  registerPatientByStaff
);

router.get('/me', authorizeRoles('patient'), getMyPatientProfile);
router.get('/search', authorizeRoles('registration_staff', 'doctor', 'admin', 'lab_staff', 'pharmacy_staff'), searchPatients);
router.get('/:id/history', getPatientMedicalHistory);

export default router;
