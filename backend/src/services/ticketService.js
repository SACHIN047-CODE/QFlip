import { SupportTicket } from '../models/SupportTicket.js';
import {
  isFirebaseConfigured,
  saveTicketToFirestore,
  getTicketFromFirestore,
  getAllTicketsFromFirestore,
  updateTicketInFirestore
} from '../config/firebase.js';
import logger from '../config/logger.js';

export const TicketService = {
  /**
   * Create a new support ticket and persist to both MongoDB and connected Firebase Firestore
   */
  async createTicket(ticketData) {
    const {
      patientName,
      phone,
      subject,
      description,
      category = 'Other',
      rating = 3,
      userId = null,
      patientId = null
    } = ticketData;

    // Generate unique readable Ticket ID (e.g. TCK-8492)
    let ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    let collision = await SupportTicket.findOne({ ticketId });
    while (collision) {
      ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      collision = await SupportTicket.findOne({ ticketId });
    }

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const statusHistory = [
      {
        status: 'OPEN',
        timestamp: now,
        changedBy: patientName || 'Portal User',
        note: 'Grievance submitted via Patient Portal'
      }
    ];

    // 1. Save in MongoDB
    const ticketDoc = await SupportTicket.create({
      ticketId,
      userId,
      patientId,
      patientName,
      phone,
      subject: subject || `${category} Grievance`,
      description,
      category,
      rating,
      status: 'OPEN',
      statusHistory,
      adminUpdates: [],
      internalNotes: []
    });

    const ticketObj = ticketDoc.toObject();
    ticketObj.submittedAt = formattedDate;

    // 2. Persist to connected Firebase Firestore if configured
    if (isFirebaseConfigured()) {
      try {
        await saveTicketToFirestore({
          ticketId,
          userId: userId ? String(userId) : null,
          patientId: patientId ? String(patientId) : null,
          patientName,
          phone,
          subject: ticketObj.subject,
          description: ticketObj.description,
          category,
          rating,
          status: 'OPEN',
          createdAt: now.toISOString(),
          submittedAt: formattedDate,
          updatedAt: now.toISOString(),
          statusHistory: statusHistory.map((h) => ({
            ...h,
            timestamp: h.timestamp.toISOString()
          })),
          adminUpdates: [],
          internalNotes: []
        });
      } catch (fbErr) {
        logger.warn(`[Firebase] Firestore sync failed for new ticket: ${fbErr.message}`);
      }
    }

    return ticketObj;
  },

  /**
   * Retrieve ticket by public tracking ID (strips sensitive internalNotes)
   */
  async getTicketByTrackingId(ticketId) {
    if (!ticketId) return null;
    const cleanId = ticketId.trim().toUpperCase();

    let ticket = null;

    // Try connected Firebase Firestore first if active
    if (isFirebaseConfigured()) {
      try {
        ticket = await getTicketFromFirestore(cleanId);
      } catch (fbErr) {
        logger.warn(`[Firebase] Firestore fetch failed, falling back to MongoDB: ${fbErr.message}`);
      }
    }

    // Fallback to MongoDB
    if (!ticket) {
      const doc = await SupportTicket.findOne({ ticketId: cleanId });
      if (doc) {
        ticket = doc.toObject();
      }
    }

    if (!ticket) return null;

    // Strict privacy rule: NEVER expose internal admin notes to patients
    const { internalNotes, ...sanitizedTicket } = ticket;
    return sanitizedTicket;
  },

  /**
   * Retrieve all tickets for Administrator (includes full details & internal notes)
   */
  async getAllTickets(statusFilter) {
    let tickets = [];

    // Try connected Firebase Firestore first if active
    if (isFirebaseConfigured()) {
      try {
        tickets = await getAllTicketsFromFirestore();
      } catch (fbErr) {
        logger.warn(`[Firebase] Firestore list failed, falling back to MongoDB: ${fbErr.message}`);
      }
    }

    // Fallback to MongoDB
    if (!tickets || tickets.length === 0) {
      const query = statusFilter ? { status: statusFilter } : {};
      const docs = await SupportTicket.find(query).sort({ createdAt: -1 });
      tickets = docs.map((d) => d.toObject());
    }

    return tickets;
  },

  /**
   * Update ticket status, resolution, patient updates, and confidential internal notes
   */
  async updateTicket(ticketId, updates) {
    const cleanId = ticketId.trim().toUpperCase();
    const doc = await SupportTicket.findOne({
      $or: [{ ticketId: cleanId }, { _id: cleanId.match(/^[0-9a-fA-F]{24}$/) ? cleanId : null }]
    });

    if (!doc) {
      throw new Error(`Ticket ${ticketId} not found`);
    }

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const authorName = updates.author || 'Hospital Administration';

    if (updates.status && updates.status !== doc.status) {
      doc.statusHistory.push({
        status: updates.status,
        timestamp: now,
        changedBy: authorName,
        note: updates.resolutionMessage || updates.adminUpdate || `Status updated to ${updates.status}`
      });
      doc.status = updates.status;
    }

    if (updates.status === 'RESOLVED' || updates.status === 'CLOSED') {
      doc.resolvedAt = now;
      if (updates.resolutionMessage) {
        doc.resolutionMessage = updates.resolutionMessage;
      }
    } else if (updates.status === 'IN_PROGRESS' || updates.status === 'OPEN') {
      doc.resolvedAt = null;
    }

    if (updates.resolutionMessage !== undefined) {
      doc.resolutionMessage = updates.resolutionMessage;
    }

    if (updates.adminUpdate && updates.adminUpdate.trim()) {
      doc.adminUpdates.push({
        id: `upd-${Date.now()}`,
        message: updates.adminUpdate.trim(),
        timestamp: formattedDate,
        author: authorName
      });
    }

    if (updates.internalNote && updates.internalNote.trim()) {
      doc.internalNotes.push({
        id: `in-${Date.now()}`,
        note: updates.internalNote.trim(),
        timestamp: formattedDate,
        author: authorName
      });
    }

    await doc.save();
    const updatedObj = doc.toObject();

    // Sync updates to Firebase Firestore if configured
    if (isFirebaseConfigured()) {
      try {
        await updateTicketInFirestore(doc.ticketId, {
          status: doc.status,
          resolutionMessage: doc.resolutionMessage,
          resolvedAt: doc.resolvedAt ? doc.resolvedAt.toISOString() : null,
          statusHistory: doc.statusHistory.map((h) => ({
            ...h,
            timestamp: h.timestamp ? (h.timestamp.toISOString ? h.timestamp.toISOString() : h.timestamp) : now.toISOString()
          })),
          adminUpdates: doc.adminUpdates,
          internalNotes: doc.internalNotes,
          updatedAt: now.toISOString()
        });
      } catch (fbErr) {
        logger.warn(`[Firebase] Firestore update sync failed for ${doc.ticketId}: ${fbErr.message}`);
      }
    }

    return updatedObj;
  }
};

export default TicketService;
