import { Router } from 'express';
import { getMyNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/my', getMyNotifications);
router.put('/:id/read', markAsRead);

export default router;
