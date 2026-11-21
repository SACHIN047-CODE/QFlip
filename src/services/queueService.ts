import { apiClient, delay, USE_MOCK } from './api';
import { PatientToken, TokenStatus, PriorityLevel } from '../types';
import { INITIAL_TOKENS } from './mockData';

// In-memory reactive state stored in localStorage for persistence across pages
const STORAGE_KEY = 'qflip_tokens_state';

const getStoredTokens = (): PatientToken[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOKENS));
    return INITIAL_TOKENS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_TOKENS;
  }
};

const saveTokens = (tokens: PatientToken[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
};

export const queueService = {
  async getTokens(department?: string): Promise<PatientToken[]> {
    if (USE_MOCK) {
      await delay(200);
      const tokens = getStoredTokens();
      if (!department || department === 'All') return tokens;
      return tokens.filter((t) => t.department.toLowerCase().includes(department.toLowerCase()));
    }
    return apiClient.get('/queue/tokens', { params: { department } });
  },

  async getTokenByNumber(tokenNumber: string): Promise<PatientToken | null> {
    if (USE_MOCK) {
      await delay(150);
      const tokens = getStoredTokens();
      return tokens.find((t) => t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase()) || null;
    }
    return apiClient.get(`/queue/tokens/${tokenNumber}`);
  },

  async createToken(payload: {
    patientName: string;
    phone: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    abhaId?: string;
    department: string;
    symptoms: string[];
    priority?: PriorityLevel;
    voiceNoteUrl?: string;
  }): Promise<PatientToken> {
    if (USE_MOCK) {
      await delay(400);
      const tokens = getStoredTokens();
      const nextNum = tokens.length + 98;
      const tokenNumber = `OPD-${nextNum.toString().padStart(3, '0')}`;
      const patientId = `PT-${Math.floor(10000 + Math.random() * 90000)}`;

      // Calculate wait time: 5 mins per patient ahead
      const waitingAhead = tokens.filter(
        (t) => t.department === payload.department && (t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
      ).length;

      const newToken: PatientToken = {
        id: `tok-${Date.now()}`,
        tokenNumber,
        patientId,
        patientName: payload.patientName,
        age: payload.age,
        gender: payload.gender,
        phone: payload.phone,
        abhaId: payload.abhaId,
        department: payload.department,
        assignedDoctorName: 'Dr. Rajesh Sharma',
        roomNumber: 'OPD Room 12',
        symptoms: payload.symptoms,
        priority: payload.priority || 'Normal',
        status: 'WAITING',
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedWaitMinutes: Math.max(5, waitingAhead * 5),
        voiceNoteUrl: payload.voiceNoteUrl,
      };

      // Emergency cases jump ahead
      let updated: PatientToken[];
      if (newToken.priority === 'Emergency') {
        const inConsultIdx = tokens.findIndex((t) => t.status === 'IN_CONSULTATION');
        updated = [
          ...tokens.slice(0, inConsultIdx + 1),
          newToken,
          ...tokens.slice(inConsultIdx + 1)
        ];
      } else {
        updated = [...tokens, newToken];
      }

      saveTokens(updated);
      return newToken;
    }
    return apiClient.post('/queue/tokens', payload);
  },

  async updateTokenStatus(tokenId: string, status: TokenStatus): Promise<PatientToken> {
    if (USE_MOCK) {
      await delay(200);
      const tokens = getStoredTokens();
      const updated = tokens.map((t) => {
        if (t.id === tokenId || t.tokenNumber === tokenId) {
          return {
            ...t,
            status,
            consultationStartTime: status === 'IN_CONSULTATION' ? new Date().toISOString() : t.consultationStartTime,
            consultationEndTime: status === 'COMPLETED' ? new Date().toISOString() : t.consultationEndTime,
          };
        }
        return t;
      });
      saveTokens(updated);
      const found = updated.find((t) => t.id === tokenId || t.tokenNumber === tokenId);
      if (!found) throw new Error('Token not found');
      return found;
    }
    return apiClient.patch(`/queue/tokens/${tokenId}/status`, { status });
  },

  async callNextToken(department = 'General Medicine'): Promise<PatientToken | null> {
    if (USE_MOCK) {
      await delay(300);
      const tokens = getStoredTokens();
      
      // Find current in consultation and mark completed or skipped
      const currentInConsult = tokens.find((t) => t.department === department && t.status === 'IN_CONSULTATION');
      let updated = tokens.map((t) => {
        if (t.id === currentInConsult?.id) {
          return { ...t, status: 'COMPLETED' as TokenStatus };
        }
        return t;
      });

      // Find next waiting (priority cases first)
      const emergencyNext = updated.find((t) => t.department === department && t.status === 'WAITING' && t.priority === 'Emergency');
      const seniorNext = updated.find((t) => t.department === department && t.status === 'WAITING' && t.priority === 'Senior');
      const standardNext = updated.find((t) => t.department === department && t.status === 'WAITING');
      const nextToCall = emergencyNext || seniorNext || standardNext;

      if (nextToCall) {
        updated = updated.map((t) => {
          if (t.id === nextToCall.id) {
            return { ...t, status: 'IN_CONSULTATION' as TokenStatus, estimatedWaitMinutes: 0 };
          }
          return t;
        });
      }

      saveTokens(updated);
      return nextToCall || null;
    }
    return apiClient.post('/queue/call-next', { department });
  },

  async skipToken(tokenId: string): Promise<void> {
    if (USE_MOCK) {
      await delay(200);
      const tokens = getStoredTokens();
      const updated = tokens.map((t) => (t.id === tokenId || t.tokenNumber === tokenId ? { ...t, status: 'SKIPPED' as TokenStatus } : t));
      saveTokens(updated);
      return;
    }
    return apiClient.post(`/queue/tokens/${tokenId}/skip`);
  },

  async addDemoPatients(): Promise<PatientToken[]> {
    const current = getStoredTokens();
    const demoPatients = [
      { name: 'Kavita Chawla', age: 31, gender: 'Female' as const, phone: '9812001122', symptoms: ['Persistent Migraine', 'Photophobia', 'Nausea'], priority: 'Normal' as PriorityLevel, vitals: { bp: '110/70', pulse: 72, spo2: 99, temp: 98.6, weight: 58 } },
      { name: 'Baldev Raj', age: 71, gender: 'Male' as const, phone: '9876543210', symptoms: ['Exertional Chest Tightness', 'Chronic Hypertension'], priority: 'Senior' as PriorityLevel, vitals: { bp: '150/95', pulse: 84, spo2: 96, temp: 98.4, weight: 70 } },
      { name: 'Simranpreet Kaur', age: 19, gender: 'Female' as const, phone: '9814400221', symptoms: ['High Fever (102°F)', 'Severe Body Aches', 'Chills'], priority: 'Emergency' as PriorityLevel, vitals: { bp: '115/75', pulse: 108, spo2: 97, temp: 102.1, weight: 52 } },
      { name: 'Harpreet Singh', age: 45, gender: 'Male' as const, phone: '9815522334', symptoms: ['Chronic Lower Back Pain', 'Lumbago with Sciatica'], priority: 'Normal' as PriorityLevel, vitals: { bp: '130/85', pulse: 76, spo2: 98, temp: 98.2, weight: 80 } },
      { name: 'Ananya Gupta', age: 5, gender: 'Female' as const, phone: '9811224455', symptoms: ['Acute Otitis Media', 'Ear Pain with Persistent Fever'], priority: 'Pediatric' as PriorityLevel, vitals: { bp: '100/65', pulse: 98, spo2: 99, temp: 99.8, weight: 18 } },
      { name: 'Gurpreet Singh', age: 52, gender: 'Male' as const, phone: '9872110099', symptoms: ['Uncontrolled Type-2 Diabetes', 'Fasting Sugar 240 mg/dL'], priority: 'Normal' as PriorityLevel, vitals: { bp: '138/88', pulse: 80, spo2: 98, temp: 98.6, weight: 77 } }
    ];

    const startNum = current.length + 105;
    const newTokens: PatientToken[] = demoPatients.map((p, idx) => ({
      id: `tok-demo-${Date.now()}-${idx}`,
      tokenNumber: `OPD-${(startNum + idx).toString().padStart(3, '0')}`,
      patientId: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      patientName: p.name,
      age: p.age,
      gender: p.gender,
      phone: p.phone,
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      department: 'General Medicine',
      assignedDoctorId: 'doc-rajesh',
      assignedDoctorName: 'Dr. Rajesh Sharma',
      roomNumber: 'OPD Room 12',
      symptoms: p.symptoms,
      priority: p.priority,
      status: 'WAITING',
      registeredAt: new Date(Date.now() - (demoPatients.length - idx) * 180000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedWaitMinutes: (idx + 1) * 6,
      vitals: p.vitals
    }));

    const updated = [...current, ...newTokens];
    saveTokens(updated);
    return updated;
  },

  async resetDemoQueue(): Promise<PatientToken[]> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TOKENS));
    return INITIAL_TOKENS;
  }
};

