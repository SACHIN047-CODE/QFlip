import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment
} from '../controllers/departmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);

router.use(protect);
router.post('/', authorizeRoles('admin'), createDepartment);
router.put('/:id', authorizeRoles('admin'), updateDepartment);

export default router;
