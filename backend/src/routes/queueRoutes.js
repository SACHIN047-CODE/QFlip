import { Router } from 'express';
import {
  generateToken,
  getDepartmentQueue,
  getMyActiveToken,
  updateQueueStatus,
  transferQueue
} from '../controllers/queueController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

// Public / Patient accessible live board
router.get('/department/:departmentId', getDepartmentQueue);

router.use(protect);

router.post('/token', generateToken);
router.get('/my-token', authorizeRoles('patient'), getMyActiveToken);
router.put('/:queueId/status', authorizeRoles('doctor', 'registration_staff', 'admin'), updateQueueStatus);
router.post('/:queueId/transfer', authorizeRoles('doctor', 'registration_staff', 'admin'), transferQueue);

export default router;
