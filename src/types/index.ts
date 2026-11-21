export type UserRole = 
  | 'patient' 
  | 'doctor' 
  | 'staff' 
  | 'admin' 
  | 'lab' 
  | 'pharmacy';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  phone?: string;
  abhaId?: string;
  department?: string;
  roomNumber?: string;
  avatar?: string;
}

export type PriorityLevel = 'Normal' | 'Senior' | 'Emergency' | 'Pediatric';

export type TokenStatus = 
  | 'WAITING' 
  | 'CALLED' 
  | 'IN_CONSULTATION' 
  | 'COMPLETED' 
  | 'SKIPPED'
  | 'SKIPPED_AWAITING_RECEPTION'
  | 'REJOINED'
  | 'LAB_PENDING' 
  | 'PHARMACY_PENDING';

export interface PatientToken {
  id: string;
  tokenNumber: string; // e.g. OPD-104
  patientId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  abhaId?: string;
  department: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  roomNumber?: string;
  symptoms: string[];
  symptomSummary?: string;
  voiceNoteUrl?: string;
  priority: PriorityLevel;
  status: TokenStatus;
  registeredAt: string;
  estimatedWaitMinutes: number;
  consultationStartTime?: string;
  consultationEndTime?: string;
  isBuffer?: boolean;
  entryType?: 'standard' | 'buffer';
  skippedAt?: string;
  rejoinedAt?: string;
  reentryPenaltyApplied?: boolean;
  reentryPenaltyPositions?: number;
  queuePosition?: number;
  verifiedByStaff?: string;
  statusHistory?: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
  vitals?: {
    bp?: string;
    pulse?: number;
    spo2?: number;
    temp?: number;
    weight?: number;
  };
}

export interface ConsultationNote {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  chiefComplaints: string;
  clinicalFindings: string;
  diagnosis: string;
  prescriptions: PrescriptionMedicine[];
  labTestsOrdered: string[];
  followUpDays?: number;
  advice?: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  quantity?: number;
  consumptionTiming: string; // e.g. 'Before breakfast', 'After breakfast', 'Before lunch', 'After lunch', 'Before dinner', 'After dinner', 'At bedtime', 'As required'
  frequency: string; // e.g. 'Once daily', 'Twice daily', 'Thrice daily', 'SOS / As needed'
  duration: string;
  instructions?: string;
}

export interface DoctorCapacityInfo {
  canAccept: boolean;
  isBuffer: boolean;
  reason: string;
  remainingOpdMinutes: number;
  activeWorkload: number;
  avgConsultationDurationMinutes: number;
  estimatedCompletionMinutes: number;
  remainingStandardCapacity: number;
  currentBufferPatients: number;
  remainingBufferCapacity: number;
  bufferLimit: number;
  isAvailable: boolean;
  isClosed: boolean;
  alternativeDoctors: {
    id: string;
    name: string;
    specialization: string;
    roomNumber: string;
    activeQueueCount?: number;
    estimatedWaitMinutes?: number;
  }[];
}

export interface LabTestRequest {
  id: string;
  tokenNumber: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Radiology' | 'Microbiology' | 'Pathology';
  orderedByDoctor: string;
  orderedAt: string;
  status: 'PENDING' | 'SAMPLE_COLLECTED' | 'PROCESSING' | 'COMPLETED' | 'CRITICAL';
  resultReportUrl?: string;
  summaryFindings?: string;
  labTechnician?: string;
}

export interface PharmacyOrder {
  id: string;
  tokenNumber: string;
  patientId: string;
  patientName: string;
  prescribedDoctor: string;
  orderDate: string;
  status: 'QUEUED' | 'DISPENSING' | 'READY_FOR_PICKUP' | 'DISPENSED';
  medicines: {
    medicineName: string;
    quantity: number;
    inStock: boolean;
    batchNumber?: string;
    instructions: string;
  }[];
  counterNumber: string;
}

export interface HospitalDepartment {
  id: string;
  name: string;
  code: string;
  headDoctor: string;
  activeDoctorsCount: number;
  waitingCount: number;
  completedTodayCount: number;
  avgWaitTimeMinutes: number;
  capacityStatus: 'NORMAL' | 'ELEVATED' | 'OVERLOAD';
  rooms: string[];
}

export interface HospitalResource {
  id: string;
  name: string;
  category: 'Bed' | 'Stretcher' | 'Wheelchair' | 'Ventilator' | 'Oxygen Cylinder';
  department: string;
  total: number;
  occupied: number;
  available: number;
  status: 'OPTIMAL' | 'LOW' | 'CRITICAL';
}

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'QUEUE' | 'STAFFING' | 'RESOURCE' | 'TRIAGE';
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
  impactScore: string;
  supportingData: string;
  recommendedAction: string;
  approved: boolean;
  timestamp: string;
}

export interface CrowdForecastHour {
  hour: string;
  historicalAverage: number;
  predictedVolume: number;
  actualArrivals?: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'SURGE';
}

export interface DigitalTwinSimulationParams {
  patientArrivalMultiplier: number; // 0.5 to 2.5x
  activeDoctorRatio: number; // 0.5 to 1.5x
  triageEfficiencyGain: number; // 0% to 50%
  pharmacyThroughput: number;
}

export interface DigitalTwinSimulationResult {
  avgWaitTimeBefore: number;
  avgWaitTimeAfter: number;
  peakQueueDepthBefore: number;
  peakQueueDepthAfter: number;
  bottleneckDepartment: string;
  burnoutRiskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  recommendedInterventions: string[];
}

export interface ComplaintFeedback {
  id: string;
  ticketId: string;
  patientId?: string;
  patientName: string;
  phone: string;
  category: 'Long Wait Time' | 'Doctor Unavailability' | 'Cleanliness' | 'Staff Behavior' | 'Pharmacy Delay' | 'App Issue' | 'Other';
  rating: number; // 1 to 5
  message: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
  submittedAt: string;
  resolutionNote?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'TOKEN_CALLED' | 'WAIT_UPDATE' | 'LAB_READY' | 'EMERGENCY_ALERT' | 'INFO';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface TriageResult {
  department: string;
  departmentCode: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  triageColor: 'green' | 'yellow' | 'red';
  confidence: number;
  summary: string;
  disclaimer: string;
  symptoms?: string[];
}


