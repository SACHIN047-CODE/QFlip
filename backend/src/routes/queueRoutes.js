import { Router } from 'express';
import {
  generateToken,
  getDepartmentQueue,
  getMyActiveToken,
  updateQueueStatus,
  transferQueue,
  rejoinQueue,
  getSkippedQueue,
  getDoctorCapacity
} from '../controllers/queueController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

// Public / Patient accessible live board
router.get('/department/:departmentId', getDepartmentQueue);
router.get('/doctor/:doctorId/capacity', getDoctorCapacity);

router.use(protect);

router.post('/token', generateToken);
router.get('/my-token', authorizeRoles('patient'), getMyActiveToken);
router.put('/:queueId/status', authorizeRoles('doctor', 'registration_staff', 'staff', 'admin'), updateQueueStatus);
router.post('/:queueId/transfer', authorizeRoles('doctor', 'registration_staff', 'staff', 'admin'), transferQueue);

// Reception re-entry and skipped queue endpoints
router.post('/rejoin', authorizeRoles('registration_staff', 'staff', 'doctor', 'admin'), rejoinQueue);
router.get('/skipped', authorizeRoles('registration_staff', 'staff', 'doctor', 'admin'), getSkippedQueue);

export default router;
