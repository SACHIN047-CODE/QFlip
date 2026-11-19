import { Router } from 'express';
import { submitFeedback, getFeedbacks } from '../controllers/feedbackController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.post('/', submitFeedback);

router.use(protect);
router.get('/', authorizeRoles('admin', 'doctor'), getFeedbacks);

export default router;
