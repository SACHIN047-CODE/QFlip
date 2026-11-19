import mongoose from 'mongoose';
import connectDB, { disconnectDB } from './config/db.js';
import logger from './config/logger.js';
import {
  User,
  Patient,
  Doctor,
  Staff,
  Department,
  Appointment,
  Queue,
  Consultation,
  Prescription,
  LabTest,
  PharmacyOrder,
  Feedback,
  HospitalResource,
  AuditLog
} from './models/index.js';

const seedDatabase = async () => {
  try {
    logger.info('Connecting to database for seeding...');
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection is not active. Please ensure MongoDB is running or MONGODB_URI is valid in backend/.env');
    }

    logger.info('Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Patient.deleteMany({}),
      Doctor.deleteMany({}),
      Staff.deleteMany({}),
      Department.deleteMany({}),
      Appointment.deleteMany({}),
      Queue.deleteMany({}),
      Consultation.deleteMany({}),
      Prescription.deleteMany({}),
      LabTest.deleteMany({}),
      PharmacyOrder.deleteMany({}),
      Feedback.deleteMany({}),
      HospitalResource.deleteMany({}),
      AuditLog.deleteMany({})
    ]);

    logger.info('1. Creating Hospital Departments...');
    const departmentsData = [
      {
        name: 'General Medicine',
        code: 'GEN',
        description: 'Comprehensive adult outpatient medical evaluation, chronic disease management, and primary triage.',
        floor: 'Ground Floor',
        roomNumbers: ['Room 101', 'Room 102', 'Room 103'],
        averageWaitTimeMinutes: 15,
        maxDailyCapacity: 300
      },
      {
        name: 'Cardiology',
        code: 'CARD',
        description: 'Cardiovascular screening, ECG, 2D Echo, heart failure and hypertension management.',
        floor: 'First Floor',
        roomNumbers: ['Room 201', 'Room 202'],
        averageWaitTimeMinutes: 20,
        maxDailyCapacity: 120
      },
      {
        name: 'Orthopedics',
        code: 'ORTHO',
        description: 'Bone fractures, arthritis, joint replacements, trauma rehabilitation and spine care.',
        floor: 'Ground Floor',
        roomNumbers: ['Room 108', 'Room 109'],
        averageWaitTimeMinutes: 18,
        maxDailyCapacity: 150
      },
      {
        name: 'Pediatrics',
        code: 'PED',
        description: 'Child healthcare, neonatal evaluation, immunizations and developmental pediatrics.',
        floor: 'Second Floor',
        roomNumbers: ['Room 301', 'Room 302'],
        averageWaitTimeMinutes: 12,
        maxDailyCapacity: 200
      },
      {
        name: 'Obstetrics & Gynecology',
        code: 'OBGYN',
        description: 'Maternal health, antenatal clinic, high-risk pregnancy care and gynecological surgery.',
        floor: 'Second Floor',
        roomNumbers: ['Room 308', 'Room 309'],
        averageWaitTimeMinutes: 22,
        maxDailyCapacity: 160
      },
      {
        name: 'ENT (Otorhinolaryngology)',
        code: 'ENT',
        description: 'Ear, nose, throat, head and neck surgery, vertigo and audiometry.',
        floor: 'First Floor',
        roomNumbers: ['Room 208'],
        averageWaitTimeMinutes: 15,
        maxDailyCapacity: 110
      },
      {
        name: 'Emergency Medicine',
        code: 'EMG',
        description: '24/7 Red-triage trauma bay, acute resuscitation and critical care intake.',
        floor: 'Ground Floor Wing B',
        roomNumbers: ['Bay 1', 'Bay 2', 'Bay 3', 'Trauma Bay Red'],
        averageWaitTimeMinutes: 2,
        maxDailyCapacity: 500
      }
    ];

    const departments = await Department.insertMany(departmentsData);
    const deptMap = {};
    departments.forEach((d) => {
      deptMap[d.code] = d;
    });

    logger.info('2. Creating Administrative and Staff Accounts...');
    // Password for all seeded demo accounts is: Careflow@2026
    const defaultPassword = 'Careflow@2026';

    const adminUser = await User.create({
      name: 'Dr. Sunita Rao',
      email: 'admin@careflow.gov.in',
      phone: '+91 98100 11001',
      password: defaultPassword,
      role: 'admin'
    });

    const staffUser = await User.create({
      name: 'Anita Devi',
      email: 'staff@careflow.gov.in',
      phone: '+91 98100 22002',
      password: defaultPassword,
      role: 'registration_staff'
    });

    const labUser = await User.create({
      name: 'Suresh Kumar',
      email: 'lab@careflow.gov.in',
      phone: '+91 98100 33003',
      password: defaultPassword,
      role: 'lab_staff'
    });

    const pharmacyUser = await User.create({
      name: 'Mohit Verma',
      email: 'pharmacy@careflow.gov.in',
      phone: '+91 98100 44004',
      password: defaultPassword,
      role: 'pharmacy_staff'
    });

    await Staff.create([
      {
        staffId: 'STF-001',
        userId: staffUser._id,
        departmentId: deptMap.GEN._id,
        designation: 'Senior Registration Officer',
        counterNumber: 'Counter 1'
      },
      {
        staffId: 'STF-002',
        userId: labUser._id,
        designation: 'Senior Lab Technologist',
        counterNumber: 'Lab Diagnostic Counter A'
      },
      {
        staffId: 'STF-003',
        userId: pharmacyUser._id,
        designation: 'Chief Pharmacist',
        counterNumber: 'Dispensary Counter 3'
      }
    ]);

    logger.info('3. Creating Doctors across Departments...');
    const doctorsData = [
      {
        name: 'Dr. Rajesh Sharma',
        email: 'doctor@careflow.gov.in',
        phone: '+91 98765 43210',
        specialization: 'Senior Consultant Physician',
        qualification: 'MBBS, MD (General Medicine), FACP',
        deptCode: 'GEN',
        roomNumber: 'Room 101',
        avgTime: 12
      },
      {
        name: 'Dr. Priya Nair',
        email: 'dr.priya@careflow.gov.in',
        phone: '+91 98765 43211',
        specialization: 'Interventional Cardiologist',
        qualification: 'MBBS, MD, DM (Cardiology)',
        deptCode: 'CARD',
        roomNumber: 'Room 201',
        avgTime: 18
      },
      {
        name: 'Dr. Vikram Mehta',
        email: 'dr.vikram@careflow.gov.in',
        phone: '+91 98765 43212',
        specialization: 'Consultant Orthopedic Surgeon',
        qualification: 'MBBS, MS (Orthopedics)',
        deptCode: 'ORTHO',
        roomNumber: 'Room 108',
        avgTime: 15
      },
      {
        name: 'Dr. Ananya Sen',
        email: 'dr.ananya@careflow.gov.in',
        phone: '+91 98765 43213',
        specialization: 'Head of Pediatric Medicine',
        qualification: 'MBBS, MD (Pediatrics), DCH',
        deptCode: 'PED',
        roomNumber: 'Room 301',
        avgTime: 10
      },
      {
        name: 'Dr. Ramesh Gupta',
        email: 'dr.ramesh@careflow.gov.in',
        phone: '+91 98765 43214',
        specialization: 'Consultant ENT Surgeon',
        qualification: 'MBBS, MS (ENT), DLO',
        deptCode: 'ENT',
        roomNumber: 'Room 208',
        avgTime: 14
      }
    ];

    const seededDoctors = [];
    for (const d of doctorsData) {
      const u = await User.create({
        name: d.name,
        email: d.email,
        phone: d.phone,
        password: defaultPassword,
        role: 'doctor'
      });

      const doc = await Doctor.create({
        doctorId: `DOC-${d.deptCode}-01`,
        userId: u._id,
        departmentId: deptMap[d.deptCode]._id,
        specialization: d.specialization,
        qualification: d.qualification,
        roomNumber: d.roomNumber,
        isAvailable: true,
        averageConsultationTimeMinutes: d.avgTime
      });

      seededDoctors.push({ ...doc.toObject(), user: u, deptCode: d.deptCode });
    }

    logger.info('4. Creating 30+ Realistic Indian Patients...');
    const patientRawList = [
      { name: 'Aarav Patel', email: 'patient@careflow.gov.in', phone: '+91 98201 11221', age: 34, gender: 'Male', blood: 'B+' },
      { name: 'Kavita Singh', email: 'kavita.s@example.com', phone: '+91 98201 11222', age: 28, gender: 'Female', blood: 'O+' },
      { name: 'Rohan Verma', email: 'rohan.v@example.com', phone: '+91 98201 11223', age: 45, gender: 'Male', blood: 'A+' },
      { name: 'Sunita Mehra', email: 'sunita.m@example.com', phone: '+91 98201 11224', age: 52, gender: 'Female', blood: 'B-' },
      { name: 'Vikas Dubey', email: 'vikas.d@example.com', phone: '+91 98201 11225', age: 39, gender: 'Male', blood: 'AB+' },
      { name: 'Pooja Iyer', email: 'pooja.i@example.com', phone: '+91 98201 11226', age: 31, gender: 'Female', blood: 'O-' },
      { name: 'Amitabh Sen', email: 'amitabh.s@example.com', phone: '+91 98201 11227', age: 64, gender: 'Male', blood: 'B+' },
      { name: 'Meena Kumari', email: 'meena.k@example.com', phone: '+91 98201 11228', age: 41, gender: 'Female', blood: 'A-' },
      { name: 'Harpreet Singh', email: 'harpreet.s@example.com', phone: '+91 98201 11229', age: 50, gender: 'Male', blood: 'O+' },
      { name: 'Deepika Joshi', email: 'deepika.j@example.com', phone: '+91 98201 11230', age: 26, gender: 'Female', blood: 'B+' },
      { name: 'Rajendra Prasad', email: 'rajendra.p@example.com', phone: '+91 98201 11231', age: 68, gender: 'Male', blood: 'A+' },
      { name: 'Simran Kaur', email: 'simran.k@example.com', phone: '+91 98201 11232', age: 22, gender: 'Female', blood: 'AB-' },
      { name: 'Sanjay Deshmukh', email: 'sanjay.d@example.com', phone: '+91 98201 11233', age: 47, gender: 'Male', blood: 'B+' },
      { name: 'Neelam Roy', email: 'neelam.r@example.com', phone: '+91 98201 11234', age: 36, gender: 'Female', blood: 'O+' },
      { name: 'Manish Tiwari', email: 'manish.t@example.com', phone: '+91 98201 11235', age: 29, gender: 'Male', blood: 'A+' },
      { name: 'Geeta Rani', email: 'geeta.r@example.com', phone: '+91 98201 11236', age: 58, gender: 'Female', blood: 'B+' },
      { name: 'Anil Kumar', email: 'anil.k@example.com', phone: '+91 98201 11237', age: 35, gender: 'Male', blood: 'O+' },
      { name: 'Shweta Shinde', email: 'shweta.s@example.com', phone: '+91 98201 11238', age: 30, gender: 'Female', blood: 'A+' },
      { name: 'Gaurav Bhatt', email: 'gaurav.b@example.com', phone: '+91 98201 11239', age: 33, gender: 'Male', blood: 'B-' },
      { name: 'Archana Nair', email: 'archana.n@example.com', phone: '+91 98201 11240', age: 49, gender: 'Female', blood: 'AB+' },
      { name: 'Ramesh Yadav', email: 'ramesh.y@example.com', phone: '+91 98201 11241', age: 55, gender: 'Male', blood: 'O+' },
      { name: 'Farhan Akhtar', email: 'farhan.a@example.com', phone: '+91 98201 11242', age: 38, gender: 'Male', blood: 'B+' },
      { name: 'Zoya Khan', email: 'zoya.k@example.com', phone: '+91 98201 11243', age: 25, gender: 'Female', blood: 'A+' },
      { name: 'Taranjeet Singh', email: 'taran.s@example.com', phone: '+91 98201 11244', age: 43, gender: 'Male', blood: 'O-' },
      { name: 'Divya Aggarwal', email: 'divya.a@example.com', phone: '+91 98201 11245', age: 27, gender: 'Female', blood: 'B+' },
      { name: 'Naveen Reddy', email: 'naveen.r@example.com', phone: '+91 98201 11246', age: 37, gender: 'Male', blood: 'A+' },
      { name: 'Bhavna Dave', email: 'bhavna.d@example.com', phone: '+91 98201 11247', age: 61, gender: 'Female', blood: 'AB+' },
      { name: 'Kishore Jha', email: 'kishore.j@example.com', phone: '+91 98201 11248', age: 53, gender: 'Male', blood: 'O+' },
      { name: 'Monika Paul', email: 'monika.p@example.com', phone: '+91 98201 11249', age: 32, gender: 'Female', blood: 'B+' },
      { name: 'Devendra Bisht', email: 'devendra.b@example.com', phone: '+91 98201 11250', age: 44, gender: 'Male', blood: 'A-' },
      { name: 'Preeti Rawat', email: 'preeti.r@example.com', phone: '+91 98201 11251', age: 29, gender: 'Female', blood: 'O+' },
      { name: 'Suresh Raina', email: 'suresh.r@example.com', phone: '+91 98201 11252', age: 36, gender: 'Male', blood: 'B+' }
    ];

    const seededPatients = [];
    for (let i = 0; i < patientRawList.length; i++) {
      const p = patientRawList[i];
      const u = await User.create({
        name: p.name,
        email: p.email,
        phone: p.phone,
        password: defaultPassword,
        role: 'patient'
      });

      const patientDoc = await Patient.create({
        patientId: `CF-2026-${String(i + 1).padStart(5, '0')}`,
        userId: u._id,
        age: p.age,
        gender: p.gender,
        address: {
          street: `${i + 12}, Block C, Civil Lines`,
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110054'
        },
        emergencyContact: {
          name: 'Next of Kin',
          relation: 'Family',
          phone: '+91 99999 88888'
        },
        basicMedicalInformation: {
          bloodGroup: p.blood,
          allergies: i % 4 === 0 ? ['Penicillin'] : [],
          chronicConditions: i % 3 === 0 ? ['Hypertension'] : []
        }
      });

      seededPatients.push({ ...patientDoc.toObject(), user: u });
    }

    logger.info('5. Generating Live Queue Tokens & OPD State...');
    const generalDoc = seededDoctors.find((d) => d.deptCode === 'GEN');
    const cardioDoc = seededDoctors.find((d) => d.deptCode === 'CARD');
    const orthoDoc = seededDoctors.find((d) => d.deptCode === 'ORTHO');

    // 1st patient: Aarav Patel is active in General OPD
    const queueTokens = [
      {
        tokenNumber: 'OPD-GEN-104',
        sequenceNumber: 104,
        patientId: seededPatients[0]._id,
        departmentId: deptMap.GEN._id,
        doctorId: generalDoc._id,
        status: 'in_consultation',
        triageLevel: 'green',
        priorityScore: 10,
        symptoms: 'Mild fever, dry cough, body ache for 3 days',
        estimatedWaitTimeMinutes: 0
      },
      {
        tokenNumber: 'OPD-GEN-105',
        sequenceNumber: 105,
        patientId: seededPatients[1]._id,
        departmentId: deptMap.GEN._id,
        doctorId: generalDoc._id,
        status: 'called',
        triageLevel: 'green',
        priorityScore: 10,
        symptoms: 'Headache and seasonal throat irritation',
        estimatedWaitTimeMinutes: 2
      },
      {
        tokenNumber: 'OPD-GEN-106',
        sequenceNumber: 106,
        patientId: seededPatients[2]._id,
        departmentId: deptMap.GEN._id,
        status: 'waiting',
        triageLevel: 'green',
        priorityScore: 10,
        symptoms: 'Stomach upset and nausea',
        estimatedWaitTimeMinutes: 12
      },
      {
        tokenNumber: 'OPD-GEN-107',
        sequenceNumber: 107,
        patientId: seededPatients[3]._id,
        departmentId: deptMap.GEN._id,
        status: 'waiting',
        triageLevel: 'yellow',
        priorityScore: 50,
        symptoms: 'High grade fever with severe chills',
        estimatedWaitTimeMinutes: 18
      },
      {
        tokenNumber: 'OPD-CARD-021',
        sequenceNumber: 21,
        patientId: seededPatients[4]._id,
        departmentId: deptMap.CARD._id,
        doctorId: cardioDoc._id,
        status: 'waiting',
        triageLevel: 'yellow',
        priorityScore: 50,
        symptoms: 'Palpitations and breathlessness after walking',
        estimatedWaitTimeMinutes: 15
      },
      {
        tokenNumber: 'OPD-ORTHO-042',
        sequenceNumber: 42,
        patientId: seededPatients[5]._id,
        departmentId: deptMap.ORTHO._id,
        doctorId: orthoDoc._id,
        status: 'waiting',
        triageLevel: 'green',
        priorityScore: 10,
        symptoms: 'Left knee pain when climbing stairs',
        estimatedWaitTimeMinutes: 14
      }
    ];

    for (let i = 6; i < 20; i++) {
      const dept = departments[i % departments.length];
      queueTokens.push({
        tokenNumber: `OPD-${dept.code}-${String(110 + i)}`,
        sequenceNumber: 110 + i,
        patientId: seededPatients[i]._id,
        departmentId: dept._id,
        status: i % 5 === 0 ? 'completed' : 'waiting',
        triageLevel: i % 8 === 0 ? 'red' : i % 4 === 0 ? 'yellow' : 'green',
        priorityScore: i % 8 === 0 ? 100 : i % 4 === 0 ? 50 : 10,
        symptoms: 'Routine consultation and checkup',
        estimatedWaitTimeMinutes: 10 + (i % 6) * 6
      });
    }

    const createdQueues = await Queue.insertMany(queueTokens);

    logger.info('6. Creating Completed Consultations, Prescriptions & Downstream Orders...');
    // Seed consultation for patient 0
    const consult1 = await Consultation.create({
      consultationId: 'CNS-2026-00042',
      patientId: seededPatients[0]._id,
      doctorId: generalDoc._id,
      departmentId: deptMap.GEN._id,
      queueId: createdQueues[0]._id,
      chiefComplaints: 'Viral upper respiratory tract infection with low-grade pyrexia.',
      clinicalObservations: 'Chest clear bilaterally, pharynx slightly congested, temperature 99.4 F.',
      diagnosis: 'Acute Viral Pharyngitis',
      vitalSigns: {
        bp: '122/82 mmHg',
        pulse: '76 bpm',
        temperature: '99.4 °F',
        spO2: '98%',
        weight: '68 kg'
      },
      clinicalNotes: 'Adequate hydration, warm saline gargles. Follow up after 5 days if fever persists.'
    });

    const rx1 = await Prescription.create({
      prescriptionNumber: 'RX-2026-00104',
      consultationId: consult1._id,
      patientId: seededPatients[0]._id,
      doctorId: generalDoc._id,
      medications: [
        {
          name: 'Paracetamol 650mg',
          dosage: '650mg',
          frequency: '1-0-1 (SOS for fever)',
          duration: '3 days',
          instructions: 'Take after food',
          isDispensed: true
        },
        {
          name: 'Cetirizine 10mg',
          dosage: '10mg',
          frequency: '0-0-1 (Night only)',
          duration: '5 days',
          instructions: 'Before sleep',
          isDispensed: true
        },
        {
          name: 'Vitamin C + Zinc Chewable',
          dosage: '500mg',
          frequency: '1-0-0 (Morning)',
          duration: '10 days',
          instructions: 'Chew after breakfast',
          isDispensed: false
        }
      ],
      dietaryAdvice: 'Plenty of warm fluids, steam inhalation twice daily.'
    });

    await PharmacyOrder.create({
      orderNumber: 'PHARM-2026-00104',
      prescriptionId: rx1._id,
      patientId: seededPatients[0]._id,
      pharmacistId: pharmacyUser._id,
      items: [
        { medicineName: 'Paracetamol 650mg', quantity: 6, dosage: '650mg', unitPrice: 0, total: 0 },
        { medicineName: 'Cetirizine 10mg', quantity: 5, dosage: '10mg', unitPrice: 0, total: 0 }
      ],
      totalAmount: 0,
      paymentStatus: 'exempt_gov',
      status: 'dispensed',
      dispensedAt: new Date()
    });

    await LabTest.create([
      {
        testRequestId: 'LAB-2026-00088',
        consultationId: consult1._id,
        patientId: seededPatients[0]._id,
        doctorId: generalDoc._id,
        labStaffId: labUser._id,
        testCategory: 'Hematology',
        testName: 'Complete Blood Count (CBC)',
        priority: 'routine',
        status: 'completed',
        sampleCollectedAt: new Date(Date.now() - 3600000),
        resultSummary: 'Normal leukocyte count. Hemoglobin 14.2 g/dL. No thrombocytopenia.',
        resultParameters: [
          { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', status: 'normal' },
          { parameter: 'Total Leukocyte Count (TLC)', value: '7,400', unit: '/mcL', referenceRange: '4,000 - 11,000', status: 'normal' },
          { parameter: 'Platelet Count', value: '2.4', unit: 'lakh/mcL', referenceRange: '1.5 - 4.5', status: 'normal' }
        ],
        completedAt: new Date()
      },
      {
        testRequestId: 'LAB-2026-00089',
        patientId: seededPatients[3]._id,
        doctorId: generalDoc._id,
        testCategory: 'Pathology',
        testName: 'Malaria & Dengue Antigen (NS1)',
        priority: 'urgent',
        status: 'in_progress',
        sampleCollectedAt: new Date()
      }
    ]);

    logger.info('7. Creating Hospital Resources (Beds, ICU, Oxygen)...');
    const resourcesData = [];
    // General Ward A beds
    for (let i = 1; i <= 25; i++) {
      resourcesData.push({
        resourceType: 'bed',
        resourceName: `Bed A-${String(i).padStart(2, '0')}`,
        identifier: `BED-A-${String(i).padStart(2, '0')}`,
        departmentId: deptMap.GEN._id,
        ward: 'General Ward A',
        status: i <= 18 ? 'occupied' : 'available'
      });
    }

    // ICU Beds
    for (let i = 1; i <= 8; i++) {
      resourcesData.push({
        resourceType: 'icu_bed',
        resourceName: `ICU Bed ${i}`,
        identifier: `ICU-BED-${String(i).padStart(2, '0')}`,
        departmentId: deptMap.EMG._id,
        ward: 'Critical Care Unit',
        status: i <= 5 ? 'occupied' : 'available'
      });
    }

    // Oxygen Cylinders
    for (let i = 1; i <= 20; i++) {
      resourcesData.push({
        resourceType: 'oxygen_cylinder',
        resourceName: `Oxygen Cylinder Type D #${i}`,
        identifier: `O2-CYL-${String(i).padStart(3, '0')}`,
        departmentId: deptMap.EMG._id,
        ward: 'Central Gas Plant Depot',
        status: i <= 14 ? 'available' : 'occupied'
      });
    }

    await HospitalResource.insertMany(resourcesData);

    logger.info('8. Creating Patient Feedback & Sentiment Records...');
    await Feedback.create([
      {
        patientId: seededPatients[0]._id,
        departmentId: deptMap.GEN._id,
        doctorId: generalDoc._id,
        rating: 5,
        category: 'doctor_care',
        comments: 'Dr. Rajesh was extremely patient and listened attentively to all my symptoms. Token system saved lots of time!',
        sentimentScore: 0.88,
        sentimentLabel: 'positive'
      },
      {
        patientId: seededPatients[2]._id,
        departmentId: deptMap.GEN._id,
        rating: 4,
        category: 'wait_time',
        comments: 'Digital queue display was helpful, but wait time could be reduced further during morning rush.',
        sentimentScore: 0.35,
        sentimentLabel: 'neutral'
      },
      {
        departmentId: deptMap.CARD._id,
        rating: 5,
        category: 'cleanliness',
        comments: 'Cardiology wing is spotless and very well organized. Good job CareFlow team.',
        sentimentScore: 0.92,
        sentimentLabel: 'positive',
        isAnonymous: true
      }
    ]);

    logger.info('================================================================');
    logger.info('  DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    logger.info('================================================================');
    logger.info('  DEMO ACCOUNTS READY (Password for all: Careflow@2026):');
    logger.info('  - Admin:             admin@careflow.gov.in');
    logger.info('  - Doctor:            doctor@careflow.gov.in');
    logger.info('  - Registration Staff: staff@careflow.gov.in');
    logger.info('  - Lab Staff:         lab@careflow.gov.in');
    logger.info('  - Pharmacy Staff:    pharmacy@careflow.gov.in');
    logger.info('  - Patient:           patient@careflow.gov.in');
    logger.info('================================================================');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    logger.error(`Error during database seeding: ${error.message}`);
    console.error(error);
    await disconnectDB();
    process.exit(1);
  }
};

seedDatabase();
