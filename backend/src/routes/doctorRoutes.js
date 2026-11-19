import { Router } from 'express';
import {
  getAllDoctors,
  getDoctorById,
  getDoctorDashboard,
  toggleAvailability
} from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', getAllDoctors);
router.get('/profile/:id', getDoctorById);

router.use(protect);
router.get('/dashboard', authorizeRoles('doctor'), getDoctorDashboard);
router.put('/availability', authorizeRoles('doctor', 'admin'), toggleAvailability);

export default router;
