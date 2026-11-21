import {
  PatientToken,
  HospitalDepartment,
  LabTestRequest,
  PharmacyOrder,
  HospitalResource,
  AIRecommendation,
  CrowdForecastHour,
  ComplaintFeedback,
  AppNotification
} from '../types';

export const INITIAL_DEPARTMENTS: HospitalDepartment[] = [
  {
    id: 'dept-gen-med',
    name: 'General Medicine',
    code: 'GEN-MED',
    headDoctor: 'Dr. Rajesh Sharma, MD',
    activeDoctorsCount: 4,
    waitingCount: 24,
    completedTodayCount: 68,
    avgWaitTimeMinutes: 18,
    capacityStatus: 'NORMAL',
    rooms: ['Room 12', 'Room 14', 'Room 15', 'Room 16']
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics',
    code: 'ORTHO',
    headDoctor: 'Dr. Harpreet Singh, MS',
    activeDoctorsCount: 2,
    waitingCount: 19,
    completedTodayCount: 42,
    avgWaitTimeMinutes: 28,
    capacityStatus: 'ELEVATED',
    rooms: ['Room 08', 'Room 09']
  },
  {
    id: 'dept-peds',
    name: 'Pediatrics',
    code: 'PEDS',
    headDoctor: 'Dr. Priya Patel, MD (Ped)',
    activeDoctorsCount: 3,
    waitingCount: 15,
    completedTodayCount: 51,
    avgWaitTimeMinutes: 14,
    capacityStatus: 'NORMAL',
    rooms: ['Room 03', 'Room 04', 'Room 05']
  },
  {
    id: 'dept-cardio',
    name: 'Cardiology',
    code: 'CARDIO',
    headDoctor: 'Dr. Arvind Kumar, DM',
    activeDoctorsCount: 2,
    waitingCount: 11,
    completedTodayCount: 29,
    avgWaitTimeMinutes: 22,
    capacityStatus: 'NORMAL',
    rooms: ['Room 21', 'Room 22']
  },
  {
    id: 'dept-gynae',
    name: 'Obstetrics & Gynecology',
    code: 'OBGYN',
    headDoctor: 'Dr. Sunita Verma, MS (OBG)',
    activeDoctorsCount: 3,
    waitingCount: 31,
    completedTodayCount: 59,
    avgWaitTimeMinutes: 34,
    capacityStatus: 'OVERLOAD',
    rooms: ['Room 18', 'Room 19', 'Room 20']
  },
  {
    id: 'dept-ent',
    name: 'ENT & Head Neck',
    code: 'ENT',
    headDoctor: 'Dr. Vivek Malhotra, MS',
    activeDoctorsCount: 2,
    waitingCount: 12,
    completedTodayCount: 38,
    avgWaitTimeMinutes: 16,
    capacityStatus: 'NORMAL',
    rooms: ['Room 06', 'Room 07']
  },
  {
    id: 'dept-emergency',
    name: 'Emergency Trauma Care',
    code: 'EMERGENCY',
    headDoctor: 'Dr. Vikramaditya Sen, MD',
    activeDoctorsCount: 5,
    waitingCount: 4,
    completedTodayCount: 88,
    avgWaitTimeMinutes: 2,
    capacityStatus: 'NORMAL',
    rooms: ['Trauma Bay 1', 'Trauma Bay 2', 'Triage Desk']
  }
];

export const INITIAL_TOKENS: PatientToken[] = [
  {
    id: 'tok-201',
    tokenNumber: 'OPD-GEN-201',
    patientId: 'USR-PAT-01',
    patientName: 'Amit Kumar',
    age: 36,
    gender: 'Male',
    phone: '+91 98100 12347',
    abhaId: '91-1001-2002-3001',
    department: 'General Medicine',
    assignedDoctorId: 'USR-DOC-01',
    assignedDoctorName: 'Dr. Rahul Verma',
    roomNumber: 'OPD Room 101',
    symptoms: ['Fever for 2 days', 'Mild body ache'],
    priority: 'Normal',
    status: 'IN_CONSULTATION',
    registeredAt: '09:15 AM',
    estimatedWaitMinutes: 0,
    vitals: { bp: '122/80', pulse: 76, spo2: 98, temp: 99.2, weight: 70 }
  },
  {
    id: 'tok-202',
    tokenNumber: 'OPD-CARD-202',
    patientId: 'USR-PAT-02',
    patientName: 'Neha Gupta',
    age: 29,
    gender: 'Female',
    phone: '+91 98100 12349',
    abhaId: '91-1002-2003-3002',
    department: 'Cardiology',
    assignedDoctorId: 'USR-DOC-02',
    assignedDoctorName: 'Dr. Priya Singh',
    roomNumber: 'Room 201',
    symptoms: ['Palpitations', 'Exertional fatigue'],
    priority: 'Normal',
    status: 'CALLED',
    registeredAt: '09:20 AM',
    estimatedWaitMinutes: 2,
    vitals: { bp: '118/76', pulse: 88, spo2: 99, temp: 98.4, weight: 55 }
  },
  {
    id: 'tok-203',
    tokenNumber: 'OPD-GEN-203',
    patientId: 'USR-PAT-03',
    patientName: 'Arjun Mehta',
    age: 42,
    gender: 'Male',
    phone: '+91 98100 12350',
    abhaId: '91-1003-2004-3003',
    department: 'General Medicine',
    assignedDoctorId: 'USR-DOC-01',
    assignedDoctorName: 'Dr. Rahul Verma',
    roomNumber: 'OPD Room 101',
    symptoms: ['Persistent dry cough', 'Throat irritation'],
    priority: 'Normal',
    status: 'WAITING',
    registeredAt: '09:25 AM',
    estimatedWaitMinutes: 8,
    vitals: { bp: '128/84', pulse: 74, spo2: 98, temp: 98.6, weight: 78 }
  },
  {
    id: 'tok-204',
    tokenNumber: 'OPD-ORTHO-204',
    patientId: 'USR-PAT-04',
    patientName: 'Anjali Sharma',
    age: 33,
    gender: 'Female',
    phone: '+91 98100 12352',
    abhaId: '91-1004-2005-3004',
    department: 'Orthopedics',
    assignedDoctorId: 'USR-DOC-03',
    assignedDoctorName: 'Dr. Karan Malhotra',
    roomNumber: 'Room 108',
    symptoms: ['Right knee swelling', 'Difficulty walking'],
    priority: 'Normal',
    status: 'WAITING',
    registeredAt: '09:30 AM',
    estimatedWaitMinutes: 14,
    vitals: { bp: '120/78', pulse: 72, spo2: 99, temp: 98.4, weight: 60 }
  },
  {
    id: 'tok-098',
    tokenNumber: 'OPD-098',
    patientId: 'PT-10082',
    patientName: 'Ramesh Chander Gupta',
    age: 58,
    gender: 'Male',
    phone: '9812401824',
    abhaId: '91-8274-1049-3321',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Chest Congestion', 'Mild Fever for 3 days', 'Dry Cough'],
    priority: 'Normal',
    status: 'IN_CONSULTATION',
    registeredAt: '09:15 AM',
    estimatedWaitMinutes: 0,
    vitals: { bp: '134/86', pulse: 78, spo2: 98, temp: 99.4, weight: 68 }
  },
  {
    id: 'tok-099',
    tokenNumber: 'OPD-099',
    patientId: 'PT-10083',
    patientName: 'Jaspreet Kaur',
    age: 67,
    gender: 'Female',
    phone: '9872109843',
    abhaId: '91-4412-8871-9012',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Joint Pain', 'Hypertension Checkup'],
    priority: 'Senior',
    status: 'WAITING',
    registeredAt: '09:20 AM',
    estimatedWaitMinutes: 5,
    vitals: { bp: '148/92', pulse: 82, spo2: 97, temp: 98.6, weight: 64 }
  },
  {
    id: 'tok-100',
    tokenNumber: 'OPD-100',
    patientId: 'PT-10084',
    patientName: 'Kuldeep Singh',
    age: 34,
    gender: 'Male',
    phone: '9416023411',
    abhaId: '91-1122-3344-5566',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Abdominal Cramps', 'Nausea'],
    priority: 'Normal',
    status: 'WAITING',
    registeredAt: '09:28 AM',
    estimatedWaitMinutes: 10,
    vitals: { bp: '120/80', pulse: 74, spo2: 99, temp: 98.4, weight: 72 }
  },
  {
    id: 'tok-101',
    tokenNumber: 'OPD-101',
    patientId: 'PT-10085',
    patientName: 'Sunil Verma',
    age: 42,
    gender: 'Male',
    phone: '9896011223',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Severe Migraine', 'Photophobia'],
    priority: 'Normal',
    status: 'WAITING',
    registeredAt: '09:35 AM',
    estimatedWaitMinutes: 15
  },
  {
    id: 'tok-102',
    tokenNumber: 'OPD-102',
    patientId: 'PT-10086',
    patientName: 'Pooja Devi',
    age: 29,
    gender: 'Female',
    phone: '9813088741',
    abhaId: '91-7788-9900-1122',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Acute Asthmatic Wheezing', 'Breathlessness'],
    priority: 'Emergency',
    status: 'WAITING',
    registeredAt: '09:40 AM',
    estimatedWaitMinutes: 3,
    vitals: { bp: '118/76', pulse: 104, spo2: 92, temp: 98.8, weight: 54 }
  },
  {
    id: 'tok-103',
    tokenNumber: 'OPD-103',
    patientId: 'PT-10087',
    patientName: 'Aarav Sharma',
    age: 7,
    gender: 'Male',
    phone: '9812409988',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Persistent High Fever', 'Body Rashes'],
    priority: 'Pediatric',
    status: 'WAITING',
    registeredAt: '09:44 AM',
    estimatedWaitMinutes: 20
  },
  {
    id: 'tok-104',
    tokenNumber: 'OPD-104',
    patientId: 'PT-10088',
    patientName: 'Manpreet Singh (You)',
    age: 38,
    gender: 'Male',
    phone: '9812401824',
    abhaId: '91-8274-1049-9812',
    department: 'General Medicine',
    assignedDoctorId: 'doc-rajesh',
    assignedDoctorName: 'Dr. Rajesh Sharma',
    roomNumber: 'OPD Room 12',
    symptoms: ['Throat Infection', 'Persistent Cough for 4 days', 'Difficulty Swallowing'],
    priority: 'Normal',
    status: 'WAITING',
    registeredAt: '09:48 AM',
    estimatedWaitMinutes: 25,
    vitals: { bp: '124/82', pulse: 76, spo2: 98, temp: 99.1, weight: 75 }
  }
];

export const INITIAL_LAB_REQUESTS: LabTestRequest[] = [
  {
    id: 'lab-001',
    tokenNumber: 'OPD-092',
    patientId: 'PT-10076',
    patientName: 'Harbhajan Lal',
    age: 62,
    gender: 'Male',
    testName: 'Complete Blood Count (CBC) with Platelets',
    category: 'Hematology',
    orderedByDoctor: 'Dr. Rajesh Sharma',
    orderedAt: '09:10 AM',
    status: 'PROCESSING',
    labTechnician: 'Tech. Manoj Varma'
  },
  {
    id: 'lab-002',
    tokenNumber: 'OPD-094',
    patientId: 'PT-10078',
    patientName: 'Rekha Rani',
    age: 45,
    gender: 'Female',
    testName: 'Serum Creatinine & Blood Urea Nitrogen',
    category: 'Biochemistry',
    orderedByDoctor: 'Dr. Rajesh Sharma',
    orderedAt: '09:18 AM',
    status: 'COMPLETED',
    summaryFindings: 'Creatinine: 0.9 mg/dL (Normal). BUN: 14 mg/dL.',
    resultReportUrl: '#report-view-002',
    labTechnician: 'Tech. Preeti Rawat'
  },
  {
    id: 'lab-003',
    tokenNumber: 'OPD-098',
    patientId: 'PT-10082',
    patientName: 'Ramesh Chander Gupta',
    age: 58,
    gender: 'Male',
    testName: 'Digital Chest X-Ray PA View',
    category: 'Radiology',
    orderedByDoctor: 'Dr. Rajesh Sharma',
    orderedAt: '09:50 AM',
    status: 'PENDING',
    labTechnician: 'Radiographer Gurmeet Singh'
  },
  {
    id: 'lab-004',
    tokenNumber: 'OPD-102',
    patientId: 'PT-10086',
    patientName: 'Pooja Devi',
    age: 29,
    gender: 'Female',
    testName: 'Arterial Blood Gas (ABG) Analysis',
    category: 'Biochemistry',
    orderedByDoctor: 'Dr. Rajesh Sharma',
    orderedAt: '09:55 AM',
    status: 'CRITICAL',
    summaryFindings: 'PaO2: 68 mmHg. Mild hypoxia detected.',
    labTechnician: 'Tech. Preeti Rawat'
  }
];

export const INITIAL_PHARMACY_ORDERS: PharmacyOrder[] = [
  {
    id: 'ph-881',
    tokenNumber: 'OPD-089',
    patientId: 'PT-10073',
    patientName: 'Sanjay Dutt',
    prescribedDoctor: 'Dr. Arvind Kumar',
    orderDate: '09:25 AM',
    status: 'READY_FOR_PICKUP',
    counterNumber: 'Dispensing Counter #03',
    medicines: [
      { medicineName: 'Amlodipine 5mg Tab', quantity: 30, inStock: true, batchNumber: 'AML-2026-X', instructions: 'Once daily morning' },
      { medicineName: 'Atorvastatin 20mg Tab', quantity: 30, inStock: true, batchNumber: 'ATV-882', instructions: 'Once daily at bedtime' }
    ]
  },
  {
    id: 'ph-882',
    tokenNumber: 'OPD-091',
    patientId: 'PT-10075',
    patientName: 'Gurdeep Kaur',
    prescribedDoctor: 'Dr. Rajesh Sharma',
    orderDate: '09:35 AM',
    status: 'DISPENSING',
    counterNumber: 'Dispensing Counter #01',
    medicines: [
      { medicineName: 'Amoxicillin + Clavulanic Acid 625mg', quantity: 10, inStock: true, batchNumber: 'AMX-901', instructions: 'Twice daily after food' },
      { medicineName: 'Paracetamol 650mg Tab', quantity: 15, inStock: true, batchNumber: 'PCM-441', instructions: 'Thrice daily if fever > 100F' },
      { medicineName: 'Pantoprazole 40mg Tab', quantity: 10, inStock: true, batchNumber: 'PAN-104', instructions: 'Once daily before breakfast' }
    ]
  },
  {
    id: 'ph-883',
    tokenNumber: 'OPD-095',
    patientId: 'PT-10079',
    patientName: 'Vikas Sood',
    prescribedDoctor: 'Dr. Harpreet Singh',
    orderDate: '09:42 AM',
    status: 'QUEUED',
    counterNumber: 'Dispensing Counter #02',
    medicines: [
      { medicineName: 'Aceclofenac + Paracetamol Tab', quantity: 10, inStock: true, batchNumber: 'ACP-772', instructions: 'Twice daily after food' },
      { medicineName: 'Thiocolchicoside 4mg Cap', quantity: 10, inStock: true, batchNumber: 'THC-311', instructions: 'Twice daily' }
    ]
  }
];

export const INITIAL_RESOURCES: HospitalResource[] = [
  { id: 'res-1', name: 'ICU Critical Care Beds', category: 'Bed', department: 'ICU Block B', total: 24, occupied: 21, available: 3, status: 'CRITICAL' },
  { id: 'res-2', name: 'General Medicine Ward Beds', category: 'Bed', department: 'Male Ward 3', total: 60, occupied: 48, available: 12, status: 'OPTIMAL' },
  { id: 'res-3', name: 'Emergency Trauma Beds', category: 'Bed', department: 'Emergency Wing', total: 18, occupied: 14, available: 4, status: 'LOW' },
  { id: 'res-4', name: 'Wheelchairs with Escort', category: 'Wheelchair', department: 'Main Entrance & Triage', total: 35, occupied: 26, available: 9, status: 'OPTIMAL' },
  { id: 'res-5', name: 'Hydraulic Mobile Stretchers', category: 'Stretcher', department: 'Ambulance Bay & OPD', total: 20, occupied: 17, available: 3, status: 'LOW' },
  { id: 'res-6', name: 'B-Type High Pressure O2 Cylinders', category: 'Oxygen Cylinder', department: 'Central Store & OPD', total: 80, occupied: 52, available: 28, status: 'OPTIMAL' }
];

export const INITIAL_AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-01',
    title: 'Surge Warning: Reallocate 1 General Doctor to OPD-12',
    category: 'STAFFING',
    urgency: 'HIGH',
    explanation: 'OPD queue is accelerating at 38 patients/hr following morning bus arrivals from rural routes. Dr. Sharma alone will face a 52-minute average backlog by 11:30 AM.',
    impactScore: '-32% Wait Time',
    supportingData: 'Historical Monday rush trend: 10:30 AM to 1:00 PM creates 140+ footfall spike.',
    recommendedAction: 'Open Room 14 with On-Duty Floater Dr. Arvind Kumar',
    approved: false,
    timestamp: '10 mins ago'
  },
  {
    id: 'rec-02',
    title: 'Laboratory Phlebotomy Queue Balancing',
    category: 'QUEUE',
    urgency: 'MEDIUM',
    explanation: 'Phlebotomy counter #1 has 14 patients queued while counter #2 has only 3 patients due to uneven slip direction.',
    impactScore: '-12 min Lab Transit',
    supportingData: 'Telemetry shows Counter 2 technician idle for 8 mins.',
    recommendedAction: 'Auto-route next 8 blood test tokens to Counter #2 display',
    approved: true,
    timestamp: '25 mins ago'
  },
  {
    id: 'rec-03',
    title: 'Pre-package Common Fever & Cough Rx Kits at Pharmacy',
    category: 'RESOURCE',
    urgency: 'LOW',
    explanation: '68% of today’s prescriptions contain standard Paracetamol + Cetirizine + Antacid combinations.',
    impactScore: '4x Dispensing Speed',
    supportingData: 'Pharmacy counter wait will peak to 22 mins without pre-bundled medication pouches.',
    recommendedAction: 'Pre-assemble 50 kits at Counter #01 for instant barcode checkout',
    approved: true,
    timestamp: '40 mins ago'
  }
];

export const CROWD_FORECAST_DATA: CrowdForecastHour[] = [
  { hour: '08:00 AM', historicalAverage: 35, predictedVolume: 42, actualArrivals: 44, riskLevel: 'LOW' },
  { hour: '09:00 AM', historicalAverage: 85, predictedVolume: 96, actualArrivals: 102, riskLevel: 'MODERATE' },
  { hour: '10:00 AM', historicalAverage: 145, predictedVolume: 168, actualArrivals: 165, riskLevel: 'HIGH' },
  { hour: '11:00 AM', historicalAverage: 160, predictedVolume: 185, riskLevel: 'SURGE' },
  { hour: '12:00 PM', historicalAverage: 130, predictedVolume: 140, riskLevel: 'HIGH' },
  { hour: '01:00 PM', historicalAverage: 75, predictedVolume: 80, riskLevel: 'MODERATE' },
  { hour: '02:00 PM', historicalAverage: 45, predictedVolume: 50, riskLevel: 'LOW' },
  { hour: '03:00 PM', historicalAverage: 40, predictedVolume: 42, riskLevel: 'LOW' },
  { hour: '04:00 PM', historicalAverage: 30, predictedVolume: 28, riskLevel: 'LOW' }
];

export const INITIAL_COMPLAINTS: ComplaintFeedback[] = [
  {
    id: 'comp-101',
    ticketId: 'TCK-9921',
    patientName: 'Sunita Rani',
    phone: '9812001122',
    category: 'Long Wait Time',
    rating: 2,
    message: 'Waited more than 45 minutes after my token OPD-045 was announced because doctor went for emergency round.',
    status: 'INVESTIGATING',
    submittedAt: 'Today, 09:30 AM',
    resolutionNote: 'Explained that emergency trauma patient arrived. Token priority restored.'
  },
  {
    id: 'comp-102',
    ticketId: 'TCK-9922',
    patientName: 'Rakesh Verma',
    phone: '9876543210',
    category: 'Pharmacy Delay',
    rating: 3,
    message: 'Medicine counter line was slow, but digital token screen helped track when medicines were ready.',
    status: 'RESOLVED',
    submittedAt: 'Yesterday, 03:15 PM',
    resolutionNote: 'Added extra pharmacist to dispensing desk #2 during afternoon rush.'
  },
  {
    id: 'comp-103',
    ticketId: 'TCK-9923',
    patientName: 'Balwinder Kaur',
    phone: '9416098765',
    category: 'Cleanliness',
    rating: 4,
    message: 'OPD waiting hall air conditioning was comfortable and drinking water available.',
    status: 'CLOSED',
    submittedAt: 'Yesterday, 11:45 AM'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Queue Moving: 6 Patients Ahead',
    message: 'Current token OPD-098 is in consultation. Estimated wait for OPD-104 is 25 minutes. Please proceed to OPD Waiting Hall 2.',
    type: 'WAIT_UPDATE',
    timestamp: 'Just now',
    read: false,
    actionUrl: '/patient/queue'
  },
  {
    id: 'notif-2',
    title: 'ABHA Health Locker Connected',
    message: 'Your past immunizations and prescription records from Ambala Civil Hospital have been verified successfully.',
    type: 'INFO',
    timestamp: '15 mins ago',
    read: true,
    actionUrl: '/patient/medical-history'
  },
  {
    id: 'notif-3',
    title: 'Lab Sample Ready for Collection',
    message: 'Your Biochemistry tests ordered on 12 Nov are now ready for download in digital PDF format.',
    type: 'LAB_READY',
    timestamp: '2 hours ago',
    read: true,
    actionUrl: '/patient/lab-tests'
  }
];

