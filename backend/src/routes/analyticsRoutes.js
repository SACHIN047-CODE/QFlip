import { Router } from 'express';
import { getHospitalAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', authorizeRoles('admin', 'doctor', 'registration_staff'), getHospitalAnalytics);

export default router;
