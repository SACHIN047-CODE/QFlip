import { Router } from 'express';
import {
  submitTicket,
  trackTicket,
  getAllTickets,
  updateTicketStatus
} from '../controllers/ticketController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = Router();

// Public / Patient endpoints
router.post('/', optionalAuth, submitTicket);
router.get('/track/:ticketId', trackTicket);

// Admin-protected endpoints
router.get('/', protect, authorizeRoles('admin'), getAllTickets);
router.patch('/:id', protect, authorizeRoles('admin'), updateTicketStatus);

export default router;
