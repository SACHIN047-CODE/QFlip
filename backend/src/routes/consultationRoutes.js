import { Router } from 'express';
import {
  createConsultation,
  getConsultationById
} from '../controllers/consultationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);

router.post('/', authorizeRoles('doctor', 'admin'), createConsultation);
router.get('/:id', getConsultationById);

export default router;
