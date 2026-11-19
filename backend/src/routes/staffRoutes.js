import { Router } from 'express';
import { getStaffDashboard, getAllStaff } from '../controllers/staffController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);

router.get('/dashboard', authorizeRoles('registration_staff', 'admin'), getStaffDashboard);
router.get('/', authorizeRoles('admin', 'registration_staff'), getAllStaff);

export default router;
