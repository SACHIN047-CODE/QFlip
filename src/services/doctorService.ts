import { apiClient, delay, USE_MOCK } from './api';
import { ConsultationNote, PrescriptionMedicine } from '../types';

const getCurrentDoctor = () => {
  try {
    const u = JSON.parse(localStorage.getItem('qflip_user') || '{}');
    if (u && (u.role === 'doctor' || u.name)) {
      return {
        name: u.name,
        department: u.department || 'General Medicine',
        room: u.roomNumber || 'OPD Room 101'
      };
    }
  } catch {}
  return {
    name: 'Dr. Rahul Verma, MD',
    department: 'General Medicine',
    room: 'OPD Room 101'
  };
};

export const doctorService = {
  async getDoctorSchedule(doctorId: string) {
    if (USE_MOCK) {
      await delay(200);
      const activeDoc = getCurrentDoctor();
      return {
        doctorId: doctorId || 'doc-rahul',
        name: activeDoc.name,
        department: activeDoc.department,
        room: activeDoc.room,
        shift: 'Morning OPD: 08:30 AM – 02:00 PM',
        status: 'IN_SESSION',
        totalPatientsAssigned: 32,
        completedConsultations: 16,
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
      const activeDoc = getCurrentDoctor();
      const noteId = `note-${Date.now()}`;
      const note: ConsultationNote = {
        id: noteId,
        patientId: consultation.patientId,
        patientName: consultation.patientName,
        doctorId: 'doc-current',
        doctorName: activeDoc.name,
        department: activeDoc.department,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        chiefComplaints: consultation.chiefComplaints,
        clinicalFindings: consultation.clinicalFindings,
        diagnosis: consultation.diagnosis,
        prescriptions: consultation.prescriptions || [],
        labTestsOrdered: consultation.labTestsOrdered || [],
        followUpDays: consultation.followUpDays || 7,
        advice: consultation.advice
      };

      // 1. Store consultation history locally
      try {
        const storedNotes = JSON.parse(localStorage.getItem('qflip_consultations') || '[]');
        localStorage.setItem('qflip_consultations', JSON.stringify([note, ...storedNotes]));
      } catch (e) {
        console.warn('Error saving consultation note:', e);
      }

      // 2. Cross-Role Sync: Send prescription to Chemist (Jan Aushadhi Pharmacy)
      if (consultation.prescriptions && consultation.prescriptions.length > 0) {
        try {
          const storedPharm = JSON.parse(localStorage.getItem('qflip_pharmacy_orders') || '[]');
          const newOrder = {
            id: `rx-${Date.now()}`,
            tokenNumber: consultation.tokenId || `OPD-${Math.floor(100 + Math.random() * 900)}`,
            patientId: consultation.patientId,
            patientName: consultation.patientName,
            prescribedDoctor: activeDoc.name,
            department: activeDoc.department,
            medicines: consultation.prescriptions.map((p) => ({
              name: p.name,
              dosage: p.dosage || '500 mg',
              timing: p.consumptionTiming || 'After food',
              frequency: p.frequency || 'Twice daily',
              duration: p.duration || '5 days',
              instructions: p.instructions || '',
              availableInJanAushadhi: true,
              genericSubstitute: `${p.name} (Jan Aushadhi Generic)`
            })),
            status: 'QUEUED' as const,
            createdAt: 'Just now',
            totalCost: (consultation.prescriptions.length * 28) + 15
          };
          localStorage.setItem('qflip_pharmacy_orders', JSON.stringify([newOrder, ...storedPharm]));
        } catch (e) {
          console.warn('Error syncing e-prescription to pharmacy:', e);
        }
      }

      // 3. Cross-Role Sync: Send diagnostic orders to Laboratory Dashboard
      if (consultation.labTestsOrdered && consultation.labTestsOrdered.length > 0) {
        try {
          const storedLab = JSON.parse(localStorage.getItem('qflip_lab_requests') || '[]');
          const newLabItems = consultation.labTestsOrdered.map((testName, idx) => ({
            id: `lab-${Date.now()}-${idx}`,
            tokenNumber: consultation.tokenId || `OPD-${Math.floor(100 + Math.random() * 900)}`,
            patientId: consultation.patientId,
            patientName: consultation.patientName,
            testName,
            category: testName.toLowerCase().includes('x-ray') || testName.toLowerCase().includes('scan') ? 'RADIOLOGY' : 'PATHOLOGY',
            status: 'PENDING' as const,
            orderedBy: activeDoc.name,
            orderedAt: 'Just now',
            department: activeDoc.department
          }));
          localStorage.setItem('qflip_lab_requests', JSON.stringify([...newLabItems, ...storedLab]));
        } catch (e) {
          console.warn('Error syncing lab requests to laboratory:', e);
        }
      }

      return note;
    }
    return apiClient.post('/doctor/consultations', consultation);
  },

  async getPatientConsultations(patientId?: string): Promise<ConsultationNote[]> {
    if (USE_MOCK) {
      await delay(150);
      try {
        const stored = JSON.parse(localStorage.getItem('qflip_consultations') || '[]');
        if (!patientId) return stored;
        return stored.filter((c: ConsultationNote) => 
          c.patientId === patientId || 
          (c.patientName && c.patientName.toLowerCase().includes(patientId.toLowerCase()))
        );
      } catch {
        return [];
      }
    }
    return apiClient.get('/doctor/consultations', { params: { patientId } });
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

