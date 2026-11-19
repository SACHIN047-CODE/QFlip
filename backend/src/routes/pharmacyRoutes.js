import { Router } from 'express';
import {
  getPharmacyOrders,
  dispensePharmacyOrder
} from '../controllers/pharmacyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', authorizeRoles('pharmacy_staff', 'admin', 'doctor'), getPharmacyOrders);
router.put('/:id/dispense', authorizeRoles('pharmacy_staff', 'admin'), dispensePharmacyOrder);

export default router;
