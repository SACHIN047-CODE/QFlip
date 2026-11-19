import { Router } from 'express';
import {
  getLabRequests,
  updateLabTestStatus,
  uploadLabReport
} from '../controllers/laboratoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', authorizeRoles('lab_staff', 'doctor', 'admin'), getLabRequests);
router.put('/:id/status', authorizeRoles('lab_staff', 'admin'), updateLabTestStatus);
router.post('/:id/upload', authorizeRoles('lab_staff', 'admin'), upload.single('report'), uploadLabReport);

export default router;
