import { Router } from 'express';
import {
  bookAppointment,
  getAppointments,
  checkInAppointment
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);

router.post('/', bookAppointment);
router.get('/', getAppointments);
router.put('/:id/check-in', authorizeRoles('registration_staff', 'admin', 'doctor'), checkInAppointment);

export default router;
