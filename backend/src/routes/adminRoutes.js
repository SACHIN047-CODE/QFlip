import { Router } from 'express';
import { getAllUsers, toggleUserStatus, getAuditLogs } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.get('/audit-logs', getAuditLogs);

export default router;
