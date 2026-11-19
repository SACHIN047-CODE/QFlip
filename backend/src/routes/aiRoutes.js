import { Router } from 'express';
import {
  triageSymptoms,
  predictSurge,
  getDigitalTwin,
  runSimulation
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Public / Patient triage route
router.post('/triage', triageSymptoms);

// Operational AI routes
router.get('/surge-prediction', predictSurge);
router.get('/digital-twin', getDigitalTwin);
router.post('/simulation', protect, runSimulation);

export default router;
