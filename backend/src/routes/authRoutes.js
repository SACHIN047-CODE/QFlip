import { Router } from 'express';
import { register, login, getMe, updateRole, verifyDoctorPasskey } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRegister, validateLogin, validateUpdateRole } from '../validators/authValidator.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateRegister, validateRequest, register);
router.post('/login', validateLogin, validateRequest, login);
router.post('/verify-doctor-passkey', verifyDoctorPasskey);
router.get('/me', protect, getMe);
router.put('/role', protect, validateUpdateRole, validateRequest, updateRole);

export default router;
