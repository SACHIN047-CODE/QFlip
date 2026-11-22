import { apiClient, delay, USE_MOCK } from './api';
import { PatientToken, TokenStatus, PriorityLevel, DoctorCapacityInfo } from '../types';
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
  async addDemoPatients(): Promise<void> {
    if (USE_MOCK) {
      await delay(300);
      const demoPatients: PatientToken[] = [
        { id: 'tok-demo-1', tokenNumber: 'OPD-GEN-301', patientId: 'PT-DEMO-1', patientName: 'Riya Sharma', age: 27, gender: 'Female', phone: '+91 98765 43101', department: 'General Medicine', assignedDoctorName: 'Dr. Rahul Verma', roomNumber: 'OPD Room 101', symptoms: ['Fever', 'Body ache'], priority: 'Normal', status: 'WAITING', registeredAt: '09:40 AM', estimatedWaitMinutes: 12 },
        { id: 'tok-demo-2', tokenNumber: 'OPD-GEN-302', patientId: 'PT-DEMO-2', patientName: 'Mohit Verma', age: 68, gender: 'Male', phone: '+91 98765 43102', department: 'General Medicine', assignedDoctorName: 'Dr. Rahul Verma', roomNumber: 'OPD Room 101', symptoms: ['Joint pain'], priority: 'Senior', status: 'WAITING', registeredAt: '09:42 AM', estimatedWaitMinutes: 10 },
        { id: 'tok-demo-3', tokenNumber: 'OPD-GEN-303', patientId: 'PT-DEMO-3', patientName: 'Kabir Singh', age: 8, gender: 'Male', phone: '+91 98765 43103', department: 'Pediatrics', assignedDoctorName: 'Dr. Simran Kaur', roomNumber: 'Room 301', symptoms: ['Cough'], priority: 'Pediatric', status: 'WAITING', registeredAt: '09:44 AM', estimatedWaitMinutes: 8 },
        { id: 'tok-demo-4', tokenNumber: 'OPD-GEN-304', patientId: 'PT-DEMO-4', patientName: 'Sunita Devi', age: 54, gender: 'Female', phone: '+91 98765 43104', department: 'Cardiology', assignedDoctorName: 'Dr. Priya Singh', roomNumber: 'Room 201', symptoms: ['Chest discomfort'], priority: 'Emergency', status: 'WAITING', registeredAt: '09:46 AM', estimatedWaitMinutes: 5 },
        { id: 'tok-demo-5', tokenNumber: 'OPD-GEN-305', patientId: 'PT-DEMO-5', patientName: 'Aarav Jain', age: 34, gender: 'Male', phone: '+91 98765 43105', department: 'Orthopedics', assignedDoctorName: 'Dr. Karan Malhotra', roomNumber: 'Room 108', symptoms: ['Knee pain'], priority: 'Normal', status: 'WAITING', registeredAt: '09:48 AM', estimatedWaitMinutes: 15 },
        { id: 'tok-demo-6', tokenNumber: 'OPD-GEN-306', patientId: 'PT-DEMO-6', patientName: 'Meera Kapoor', age: 31, gender: 'Female', phone: '+91 98765 43106', department: 'General Medicine', assignedDoctorName: 'Dr. Rahul Verma', roomNumber: 'OPD Room 101', symptoms: ['Migraine'], priority: 'Normal', status: 'WAITING', registeredAt: '09:50 AM', estimatedWaitMinutes: 18 },
      ];
      const existing = getStoredTokens();
      const newIds = new Set(demoPatients.map((token) => token.id));
      saveTokens([...existing.filter((token) => !newIds.has(token.id)), ...demoPatients]);
      return;
    }
    await apiClient.post('/queue/demo-patients');
  },

  async resetDemoQueue(): Promise<void> {
    if (USE_MOCK) {
      await delay(300);
      saveTokens(INITIAL_TOKENS);
      return;
    }
    await apiClient.post('/queue/reset-demo');
  },

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
      return (
        tokens.find(
          (t) => t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase() || t.id === tokenNumber
        ) || null
      );
    }
    return apiClient.get(`/queue/tokens/${tokenNumber}`);
  },

  /**
   * Get all tokens in the separate Skipped Patients Queue
   */
  async getSkippedTokens(department?: string): Promise<PatientToken[]> {
    if (USE_MOCK) {
      await delay(150);
      const tokens = getStoredTokens();
      const skipped = tokens.filter(
        (t) => t.status === 'SKIPPED' || t.status === 'SKIPPED_AWAITING_RECEPTION'
      );
      if (!department || department === 'All') return skipped;
      return skipped.filter((t) => t.department.toLowerCase().includes(department.toLowerCase()));
    }
    return apiClient.get('/queue/skipped', { params: { departmentId: department } });
  },

  /**
   * Check live doctor capacity, remaining OPD time, and buffer limits
   */
  async checkDoctorCapacity(doctorId?: string, department = 'General Medicine'): Promise<DoctorCapacityInfo> {
    if (USE_MOCK) {
      await delay(150);
      const tokens = getStoredTokens();
      // Count active queue workload for doctor
      const activeWorkload = tokens.filter(
        (t) =>
          t.department.toLowerCase().includes(department.toLowerCase()) &&
          (t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
      ).length;

      const avgDuration = 6.5; // minutes per patient
      const bufferLimit = 5;

      // Simulated OPD shift: 08:30 AM to 02:00 PM
      const now = new Date();
      const shiftEnd = new Date();
      shiftEnd.setHours(14, 0, 0, 0); // 2:00 PM

      const remainingOpdMinutes = Math.max(0, Math.floor((shiftEnd.getTime() - now.getTime()) / 60000));
      const estimatedCompletionMinutes = Math.round(activeWorkload * avgDuration);
      const isClosed = remainingOpdMinutes <= 0;

      // Count current buffer patients
      const currentBufferPatients = tokens.filter(
        (t) =>
          t.department.toLowerCase().includes(department.toLowerCase()) &&
          t.isBuffer &&
          (t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
      ).length;

      const remainingBufferCapacity = Math.max(0, bufferLimit - currentBufferPatients);
      const standardCapacity = Math.floor(remainingOpdMinutes / avgDuration);
      const remainingStandardCapacity = Math.max(0, standardCapacity - activeWorkload);

      let canAccept = true;
      let isBuffer = false;
      let reason = 'Standard queue capacity available.';

      if (isClosed) {
        canAccept = false;
        reason = 'Doctor OPD session has closed for today.';
      } else if (estimatedCompletionMinutes < remainingOpdMinutes) {
        canAccept = true;
        isBuffer = false;
        reason = 'Standard queue capacity available.';
      } else {
        // Standard capacity reached -> check buffer
        if (currentBufferPatients < bufferLimit) {
          canAccept = true;
          isBuffer = true;
          reason = `Doctor queue reached standard capacity. Accepted under Extended Buffer Capacity (${remainingBufferCapacity} slot${remainingBufferCapacity === 1 ? '' : 's'} left).`;
        } else {
          canAccept = false;
          isBuffer = false;
          reason = `Doctor's queue has reached its maximum booking capacity (including buffer limit of ${bufferLimit}).`;
        }
      }

      return {
        canAccept,
        isBuffer,
        reason,
        remainingOpdMinutes,
        activeWorkload,
        avgConsultationDurationMinutes: avgDuration,
        estimatedCompletionMinutes,
        remainingStandardCapacity,
        currentBufferPatients,
        remainingBufferCapacity,
        bufferLimit,
        isAvailable: true,
        isClosed,
        alternativeDoctors: [
          {
            id: 'doc-karan',
            name: 'Dr. Karan Malhotra, MS',
            specialization: 'Orthopedics',
            roomNumber: 'Room 108',
            activeQueueCount: 4,
            estimatedWaitMinutes: 20
          },
          {
            id: 'doc-simran',
            name: 'Dr. Simran Kaur, MD',
            specialization: 'Pediatrics',
            roomNumber: 'Room 301',
            activeQueueCount: 3,
            estimatedWaitMinutes: 15
          }
        ]
      };
    }
    return apiClient.get(`/queue/doctor/${doctorId}/capacity`);
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
    doctorId?: string;
  }): Promise<PatientToken> {
    if (USE_MOCK) {
      await delay(400);

      // Check capacity first
      const capacity = await this.checkDoctorCapacity(payload.doctorId, payload.department);
      if (!capacity.canAccept) {
        throw new Error(capacity.reason);
      }

      const tokens = getStoredTokens();
      const nextNum = tokens.length + 98;
      const tokenNumber = `OPD-${nextNum.toString().padStart(3, '0')}`;
      const patientId = `PT-${Math.floor(10000 + Math.random() * 90000)}`;

      // Calculate wait time: 5 mins per patient ahead in active queue
      const waitingAhead = tokens.filter(
        (t) => t.department === payload.department && (t.status === 'WAITING' || t.status === 'IN_CONSULTATION')
      ).length;

      const docMapping: Record<string, { name: string; room: string }> = {
        'general medicine': { name: 'Dr. Rahul Verma', room: 'OPD Room 101' },
        'cardiology': { name: 'Dr. Priya Singh', room: 'Room 201' },
        'orthopedics': { name: 'Dr. Karan Malhotra', room: 'Room 108' },
        'pediatrics': { name: 'Dr. Simran Kaur', room: 'Room 301' },
      };
      const deptKey = (payload.department || '').toLowerCase();
      const assigned = docMapping[deptKey] || { name: 'Dr. Rahul Verma', room: 'OPD Room 101' };

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
        assignedDoctorName: assigned.name,
        roomNumber: assigned.room,
        symptoms: payload.symptoms,
        priority: payload.priority || 'Normal',
        status: 'WAITING',
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedWaitMinutes: Math.max(5, waitingAhead * 5),
        voiceNoteUrl: payload.voiceNoteUrl,
        isBuffer: capacity.isBuffer,
        entryType: capacity.isBuffer ? 'buffer' : 'standard',
        statusHistory: [
          {
            status: 'WAITING',
            timestamp: new Date().toISOString(),
            note: capacity.isBuffer ? 'Registered under Extended Buffer Capacity quota' : 'Standard OPD token issued'
          }
        ]
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
      if (status === 'SKIPPED' || status === 'SKIPPED_AWAITING_RECEPTION') {
        await this.skipToken(tokenId);
        const tokens = getStoredTokens();
        return tokens.find((t) => t.id === tokenId || t.tokenNumber === tokenId)!;
      }

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
      
      // Find current in consultation in this department (or any if 'All') and mark completed
      const currentInConsult = tokens.find((t) => 
        (department === 'All' || t.department.toLowerCase().includes(department.toLowerCase())) && 
        t.status === 'IN_CONSULTATION'
      );
      let updated = tokens.map((t) => {
        if (t.id === currentInConsult?.id) {
          return { ...t, status: 'COMPLETED' as TokenStatus, consultationEndTime: new Date().toISOString() };
        }
        return t;
      });

      // Find next waiting:
      // Step 1: Look in doctor's department (priority: Emergency > Senior > Standard)
      let nextToCall: PatientToken | undefined;
      if (department && department !== 'All') {
        const emergencyNext = updated.find((t) => 
          (t.department.toLowerCase().includes(department.toLowerCase()) || 
           (t.assignedDoctorName && t.assignedDoctorName.toLowerCase().includes(department.toLowerCase()))) && 
          t.status === 'WAITING' && t.priority === 'Emergency'
        );
        const seniorNext = updated.find((t) => 
          (t.department.toLowerCase().includes(department.toLowerCase()) || 
           (t.assignedDoctorName && t.assignedDoctorName.toLowerCase().includes(department.toLowerCase()))) && 
          t.status === 'WAITING' && t.priority === 'Senior'
        );
        const standardNext = updated.find((t) => 
          (t.department.toLowerCase().includes(department.toLowerCase()) || 
           (t.assignedDoctorName && t.assignedDoctorName.toLowerCase().includes(department.toLowerCase()))) && 
          t.status === 'WAITING'
        );
        nextToCall = emergencyNext || seniorNext || standardNext;
      }

      // Step 2: If no patient waiting in this department, assign ANY waiting patient across the hospital!
      if (!nextToCall) {
        const anyEmergency = updated.find((t) => t.status === 'WAITING' && t.priority === 'Emergency');
        const anySenior = updated.find((t) => t.status === 'WAITING' && t.priority === 'Senior');
        const anyStandard = updated.find((t) => t.status === 'WAITING');
        nextToCall = anyEmergency || anySenior || anyStandard;
      }

      if (nextToCall) {
        updated = updated.map((t) => {
          if (t.id === nextToCall!.id) {
            return {
              ...t,
              status: 'IN_CONSULTATION' as TokenStatus,
              estimatedWaitMinutes: 0,
              consultationStartTime: new Date().toISOString()
            };
          }
          return t;
        });
      }

      saveTokens(updated);
      return nextToCall || null;
    }
    return apiClient.post('/queue/call-next', { department });
  },

  /**
   * Skip a patient in the priority queue.
   * Completely removes them from active main queue into separate Skipped Patients Queue.
   * Patient must not occupy a position in the active main queue while waiting.
   */
  async skipToken(tokenId: string, reason = 'Patient not present when called'): Promise<void> {
    if (USE_MOCK) {
      await delay(200);
      const tokens = getStoredTokens();
      const updated = tokens.map((t) => {
        if (t.id === tokenId || t.tokenNumber === tokenId) {
          return {
            ...t,
            status: 'SKIPPED' as TokenStatus,
            skippedAt: new Date().toISOString(),
            statusHistory: [
              ...(t.statusHistory || []),
              {
                status: 'SKIPPED',
                timestamp: new Date().toISOString(),
                note: reason || 'Patient skipped – awaiting physical reception check-in'
              }
            ]
          };
        }
        return t;
      });

      // Recalculate wait times for all remaining waiting patients
      let countAhead = 0;
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].status === 'WAITING') {
          updated[i].estimatedWaitMinutes = Math.max(5, countAhead * 5);
          countAhead++;
        }
      }

      saveTokens(updated);
      return;
    }
    return apiClient.put(`/queue/${tokenId}/status`, { status: 'skipped', delayReason: reason });
  },

  /**
   * Reception Physical Arrival Verification & Rejoining with THREE-PLACE PENALTY.
   * Scans QR/token code, confirms physical arrival, prevents duplicate scans,
   * reinserts into active main queue 3 positions behind normal priority position.
   */
  async rejoinToken(tokenNumberOrId: string, staffId = 'Front Desk Staff'): Promise<{ token: PatientToken; newPosition: number }> {
    if (USE_MOCK) {
      await delay(300);
      const tokens = getStoredTokens();
      const token = tokens.find(
        (t) =>
          t.tokenNumber.toLowerCase() === tokenNumberOrId.trim().toLowerCase() ||
          t.id === tokenNumberOrId.trim()
      );

      if (!token) {
        throw new Error(`Token "${tokenNumberOrId}" not found in hospital registry.`);
      }

      // Duplicate scan prevention:
      if (token.status === 'WAITING') {
        const activeWaiting = tokens.filter((t) => t.department === token.department && t.status === 'WAITING');
        const pos = activeWaiting.findIndex((t) => t.id === token.id) + 1;
        throw new Error(`Duplicate scan: Token ${token.tokenNumber} is already active in the queue at position #${pos}.`);
      }

      if (token.status === 'IN_CONSULTATION') {
        throw new Error(`Duplicate scan: Token ${token.tokenNumber} is currently inside the consultation room.`);
      }

      if (token.status === 'COMPLETED') {
        throw new Error(`Token ${token.tokenNumber} has already completed consultation today.`);
      }

      if (token.status !== 'SKIPPED' && token.status !== 'SKIPPED_AWAITING_RECEPTION') {
        throw new Error(`Token ${token.tokenNumber} is not in the skipped queue (current status: ${token.status}).`);
      }

      // 1. Get currently active waiting tokens for this department
      const activeWaiting = tokens.filter((t) => t.department === token.department && t.status === 'WAITING');

      // 2. Determine natural position based on priority rules
      let naturalIndex = 0;
      if (token.priority === 'Emergency') {
        // Place after existing emergencies
        naturalIndex = activeWaiting.filter((t) => t.priority === 'Emergency').length;
      } else if (token.priority === 'Senior') {
        // Place after emergencies and existing seniors
        naturalIndex = activeWaiting.filter((t) => t.priority === 'Emergency' || t.priority === 'Senior').length;
      } else {
        // Normal: natural position is behind higher priorities
        naturalIndex = activeWaiting.filter((t) => t.priority !== 'Normal').length;
      }

      // 3. Apply THREE-PLACE PENALTY:
      // Re-entry token is placed 3 positions behind where it would otherwise be placed
      let targetIndex = naturalIndex + 3;
      if (targetIndex > activeWaiting.length) {
        targetIndex = activeWaiting.length;
      }

      // Emergency rule preservation: non-emergency can NEVER jump ahead of an emergency patient
      const emergencyCount = activeWaiting.filter((t) => t.priority === 'Emergency').length;
      if (token.priority !== 'Emergency' && targetIndex < emergencyCount) {
        targetIndex = emergencyCount;
      }

      // 4. Update token record
      const updatedToken: PatientToken = {
        ...token,
        status: 'WAITING',
        rejoinedAt: new Date().toISOString(),
        reentryPenaltyApplied: true,
        reentryPenaltyPositions: 3,
        queuePosition: targetIndex + 1,
        verifiedByStaff: staffId,
        estimatedWaitMinutes: Math.max(5, targetIndex * 5),
        statusHistory: [
          ...(token.statusHistory || []),
          {
            status: 'WAITING',
            timestamp: new Date().toISOString(),
            note: `Physical arrival verified at reception. Rejoined active main queue at position #${targetIndex + 1} with 3-position penalty applied.`
          }
        ]
      };

      // 5. Reinsert into tokens array preserving the new order
      const remainingTokens = tokens.filter((t) => t.id !== token.id);
      
      // Find insertion point in the full list
      const deptWaiting = remainingTokens.filter(
        (t) => t.department === token.department && t.status === 'WAITING'
      );
      
      let insertIndex = remainingTokens.length;
      if (deptWaiting.length > 0 && targetIndex < deptWaiting.length) {
        const referenceToken = deptWaiting[targetIndex];
        insertIndex = remainingTokens.findIndex((t) => t.id === referenceToken.id);
      }

      const finalTokens = [...remainingTokens];
      finalTokens.splice(insertIndex, 0, updatedToken);

      // Recalculate wait times
      let waitingCount = 0;
      for (let i = 0; i < finalTokens.length; i++) {
        if (finalTokens[i].department === token.department && finalTokens[i].status === 'WAITING') {
          finalTokens[i].estimatedWaitMinutes = Math.max(5, waitingCount * 5);
          waitingCount++;
        }
      }

      saveTokens(finalTokens);
      return { token: updatedToken, newPosition: targetIndex + 1 };
    }

    const res: any = await apiClient.post('/queue/rejoin', { tokenNumber: tokenNumberOrId });
    return { token: res.data.queueEntry, newPosition: res.data.newPosition };
  }
};

export default queueService;
