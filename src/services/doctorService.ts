import { apiClient, delay, USE_MOCK } from './api';
import { ConsultationNote, PrescriptionMedicine } from '../types';

export const doctorService = {
  async getDoctorSchedule(doctorId: string) {
    if (USE_MOCK) {
      await delay(200);
      return {
        doctorId: doctorId || 'doc-rajesh',
        name: 'Dr. Rajesh Sharma, MD',
        department: 'General Medicine',
        room: 'OPD Room 12',
        shift: 'Morning OPD: 08:30 AM – 02:00 PM',
        status: 'IN_SESSION',
        totalPatientsAssigned: 48,
        completedConsultations: 24,
        avgConsultationMinutes: 6.5
      };
    }
    return apiClient.get(`/doctor/${doctorId}/schedule`);
  },

  async saveConsultation(consultation: {
    tokenId: string;
    patientId: string;
    patientName: string;
    chiefComplaints: string;
    clinicalFindings: string;
    diagnosis: string;
    prescriptions: PrescriptionMedicine[];
    labTestsOrdered: string[];
    advice?: string;
    followUpDays?: number;
  }): Promise<ConsultationNote> {
    if (USE_MOCK) {
      await delay(450);
      const note: ConsultationNote = {
        id: `note-${Date.now()}`,
        patientId: consultation.patientId,
        patientName: consultation.patientName,
        doctorId: 'doc-rajesh',
        doctorName: 'Dr. Rajesh Sharma, MD',
        department: 'General Medicine',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        chiefComplaints: consultation.chiefComplaints,
        clinicalFindings: consultation.clinicalFindings,
        diagnosis: consultation.diagnosis,
        prescriptions: consultation.prescriptions,
        labTestsOrdered: consultation.labTestsOrdered,
        followUpDays: consultation.followUpDays || 7,
        advice: consultation.advice
      };
      return note;
    }
    return apiClient.post('/doctor/consultations', consultation);
  },

  async updateDoctorAvailability(status: 'IN_SESSION' | 'ON_BREAK' | 'UNAVAILABLE'): Promise<{ status: string }> {
    if (USE_MOCK) {
      await delay(200);
      localStorage.setItem('qflip_doctor_status', status);
      return { status };
    }
    return apiClient.patch('/doctor/status', { status });
  }
};

