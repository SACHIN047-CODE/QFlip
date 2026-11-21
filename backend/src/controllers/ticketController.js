import { TicketService } from '../services/ticketService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const submitTicket = asyncHandler(async (req, res) => {
  const { subject, description, message, category, rating, patientName, phone } = req.body;

  const desc = description || message;
  if (!desc || !patientName || !phone) {
    throw new ApiError(400, 'Patient name, phone number, and description are required.');
  }

  const userId = req.user ? req.user._id : null;

  const ticket = await TicketService.createTicket({
    subject: subject || `${category || 'Hospital'} Grievance`,
    description: desc,
    category: category || 'Other',
    rating: rating || 3,
    patientName,
    phone,
    userId
  });

  return ApiResponse.created(res, ticket, 'Support ticket created and registered successfully');
});

export const trackTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId || !ticketId.trim()) {
    throw new ApiError(400, 'Ticket tracking ID is required');
  }

  const ticket = await TicketService.getTicketByTrackingId(ticketId);

  if (!ticket) {
    throw new ApiError(404, `No support ticket found for ID "${ticketId.toUpperCase()}"`);
  }

  return ApiResponse.success(res, ticket, 'Support ticket status retrieved successfully');
});

export const getAllTickets = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const tickets = await TicketService.getAllTickets(status);
  return ApiResponse.success(res, tickets, 'Support tickets retrieved successfully');
});

export const updateTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, resolutionMessage, adminUpdate, internalNote } = req.body;

  const authorName = req.user?.name || 'Chief Medical Superintendent';

  const updatedTicket = await TicketService.updateTicket(id, {
    status,
    resolutionMessage,
    adminUpdate,
    internalNote,
    author: authorName
  });

  return ApiResponse.success(res, updatedTicket, 'Ticket status updated successfully');
});
