import { Router } from 'express';
import {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  getAppointmentPassByToken,
  revokeAppointmentPass,
  checkInAppointment
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

// Public route: Digital Appointment Pass (no auth required for camera QR scanner)
router.get('/pass/:secureAccessToken', getAppointmentPassByToken);

// Protected routes (require valid JWT)
router.use(protect);

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id/revoke', authorizeRoles('registration_staff', 'admin', 'doctor'), revokeAppointmentPass);
router.put('/:id/check-in', authorizeRoles('registration_staff', 'admin', 'doctor'), checkInAppointment);

export default router;
