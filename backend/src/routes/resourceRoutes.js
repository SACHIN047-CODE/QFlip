import { Router } from 'express';
import {
  getResources,
  updateResourceStatus,
  createResource
} from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', getResources);
router.put('/:id', authorizeRoles('admin', 'doctor', 'registration_staff'), updateResourceStatus);
router.post('/', authorizeRoles('admin'), createResource);

export default router;
