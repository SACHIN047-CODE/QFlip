import { apiClient, delay, USE_MOCK } from './api';
import { ConsultationNote, AppNotification, ComplaintFeedback, SupportTicket } from '../types';
import { INITIAL_NOTIFICATIONS, INITIAL_COMPLAINTS } from './mockData';

export const patientService = {
  async getMedicalHistory(patientId: string): Promise<ConsultationNote[]> {
    if (USE_MOCK) {
      await delay(250);
      return [
        {
          id: 'note-01',
          patientId: patientId || 'PT-10088',
          patientName: 'Manpreet Singh',
          doctorId: 'doc-rajesh',
          doctorName: 'Dr. Rajesh Sharma, MD',
          department: 'General Medicine',
          date: '15 Oct 2026',
          chiefComplaints: 'Viral Upper Respiratory Tract Infection, persistent dry cough',
          clinicalFindings: 'Throat congestion (+), Chest clear on auscultation, Vitals stable.',
          diagnosis: 'Acute Viral Pharyngitis (J02.9)',
          prescriptions: [
            { id: 'rx-1', name: 'Azithromycin 500mg', dosage: '1 Tablet', frequency: 'Once daily', duration: '3 days', instructions: 'After Food' },
            { id: 'rx-2', name: 'Levocetirizine + Montelukast', dosage: '1 Tablet', frequency: 'Once daily', duration: '5 days', instructions: 'Before Food' },
            { id: 'rx-3', name: 'Dextromethorphan Syrup', dosage: '10 ml', frequency: 'Thrice daily', duration: '5 days', instructions: 'With Water' },
          ],
          labTestsOrdered: ['Complete Blood Count (CBC)'],
          followUpDays: 5,
          advice: 'Steam inhalation twice daily. Avoid cold drinks and direct air drafts.'
        },
        {
          id: 'note-02',
          patientId: patientId || 'PT-10088',
          patientName: 'Manpreet Singh',
          doctorId: 'doc-arvind',
          doctorName: 'Dr. Arvind Kumar, DM',
          department: 'Cardiology',
          date: '02 Jun 2026',
          chiefComplaints: 'Routine preventive health checkup & Mild exertional fatigue',
          clinicalFindings: 'BP 128/84 mmHg, S1 S2 heard normal, no murmurs.',
          diagnosis: 'Essential Hypertension - Pre-hypertensive State',
          prescriptions: [
            { id: 'rx-4', name: 'Telmisartan 20mg', dosage: '1 Tablet', frequency: 'Once daily', duration: '30 days', instructions: 'Before Food' }
          ],
          labTestsOrdered: ['Lipid Profile', 'Serum Creatinine', 'ECG 12 Lead'],
          followUpDays: 30,
          advice: 'Low sodium diet (<5g/day), brisk walking 30 minutes daily.'
        }
      ];
    }
    return apiClient.get(`/patient/${patientId}/history`);
  },

  async getNotifications(): Promise<AppNotification[]> {
    if (USE_MOCK) {
      await delay(150);
      const stored = localStorage.getItem('qflip_notifications');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    }
    return apiClient.get('/patient/notifications');
  },

  async markNotificationRead(id: string): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('qflip_notifications');
      const list: AppNotification[] = stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
      const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('qflip_notifications', JSON.stringify(updated));
      return;
    }
    return apiClient.patch(`/patient/notifications/${id}/read`);
  },

  async submitTicket(ticket: {
    subject?: string;
    description: string;
    category: SupportTicket['category'];
    patientName: string;
    phone: string;
    rating?: number;
    userId?: string;
  }): Promise<SupportTicket> {
    if (USE_MOCK) {
      await delay(350);
      const now = new Date();
      const formattedDate =
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      const item: SupportTicket = {
        id: `tck-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: ticket.userId || (localStorage.getItem('qflip_user') ? JSON.parse(localStorage.getItem('qflip_user')!).id : undefined),
        patientId: ticket.userId,
        patientName: ticket.patientName,
        userName: ticket.patientName,
        phone: ticket.phone,
        subject: ticket.subject || `${ticket.category} Grievance`,
        description: ticket.description,
        message: ticket.description,
        category: ticket.category,
        rating: ticket.rating || 3,
        status: 'OPEN',
        createdAt: now.toISOString(),
        submittedAt: formattedDate,
        updatedAt: now.toISOString(),
        statusHistory: [
          {
            status: 'OPEN',
            timestamp: formattedDate,
            changedBy: ticket.patientName,
            note: 'Ticket submitted via Patient Portal'
          }
        ],
        adminUpdates: [],
        internalNotes: []
      };

      const stored = localStorage.getItem('qflip_complaints');
      const list: SupportTicket[] = stored ? JSON.parse(stored) : INITIAL_COMPLAINTS;
      const updatedList = [item, ...list];
      localStorage.setItem('qflip_complaints', JSON.stringify(updatedList));
      return item;
    }
    return apiClient.post('/tickets', ticket);
  },

  async submitFeedback(feedback: {
    subject?: string;
    category: SupportTicket['category'];
    rating: number;
    message: string;
    patientName: string;
    phone: string;
    userId?: string;
  }): Promise<SupportTicket> {
    return this.submitTicket({
      subject: feedback.subject,
      description: feedback.message,
      category: feedback.category,
      patientName: feedback.patientName,
      phone: feedback.phone,
      rating: feedback.rating,
      userId: feedback.userId
    });
  },

  async getTicketByTrackingId(ticketId: string): Promise<SupportTicket | null> {
    if (!ticketId || !ticketId.trim()) return null;
    const query = ticketId.trim().toUpperCase();

    if (USE_MOCK) {
      await delay(250);
      const stored = localStorage.getItem('qflip_complaints');
      const list: SupportTicket[] = stored ? JSON.parse(stored) : INITIAL_COMPLAINTS;
      const found = list.find(
        (c) => c.ticketId.toUpperCase() === query || c.id.toUpperCase() === query
      );
      if (!found) return null;
      // Guarantee privacy: never expose internal admin notes to patients
      const sanitized: SupportTicket = {
        ...found,
        internalNotes: undefined
      };
      return sanitized;
    }
    try {
      const ticket: SupportTicket = await apiClient.get(`/tickets/track/${encodeURIComponent(query)}`);
      if (ticket) {
        return { ...ticket, internalNotes: undefined };
      }
      return null;
    } catch {
      return null;
    }
  }
};

