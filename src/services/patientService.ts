import { apiClient, delay, USE_MOCK } from './api';
import { ConsultationNote, AppNotification, ComplaintFeedback } from '../types';
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
      const stored = localStorage.getItem('careflow_notifications');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    }
    return apiClient.get('/patient/notifications');
  },

  async markNotificationRead(id: string): Promise<void> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('careflow_notifications');
      const list: AppNotification[] = stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
      const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('careflow_notifications', JSON.stringify(updated));
      return;
    }
    return apiClient.patch(`/patient/notifications/${id}/read`);
  },

  async submitFeedback(feedback: {
    category: ComplaintFeedback['category'];
    rating: number;
    message: string;
    patientName: string;
    phone: string;
  }): Promise<ComplaintFeedback> {
    if (USE_MOCK) {
      await delay(350);
      const item: ComplaintFeedback = {
        id: `comp-${Date.now()}`,
        ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: feedback.patientName,
        phone: feedback.phone,
        category: feedback.category,
        rating: feedback.rating,
        message: feedback.message,
        status: 'OPEN',
        submittedAt: 'Just now'
      };
      const stored = localStorage.getItem('careflow_complaints');
      const list: ComplaintFeedback[] = stored ? JSON.parse(stored) : INITIAL_COMPLAINTS;
      localStorage.setItem('careflow_complaints', JSON.stringify([item, ...list]));
      return item;
    }
    return apiClient.post('/patient/feedback', feedback);
  }
};

