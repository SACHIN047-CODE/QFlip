import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../backend/.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey) {
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, '\n');
}

const app = getApps().length === 0
  ? initializeApp({
      credential: cert({ projectId, clientEmail, privateKey })
    })
  : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export const CUSTOM_DEMO_USERS = [
  {
    id: 1,
    name: 'Sachin Sharma',
    email: 'sachin@example.com',
    password: 'Demo@12345',
    role: 'administrator',
    phone: '+91 98100 12345',
    department: 'Hospital Administration Command'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    password: 'Demo@12346',
    role: 'doctor',
    phone: '+91 98100 12346',
    department: 'General Medicine',
    roomNumber: 'OPD Room 101',
    pin: '7788',
    specialization: 'Senior Consultant Physician'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit@example.com',
    password: 'Demo@12347',
    role: 'patient',
    phone: '+91 98100 12347',
    age: 36,
    gender: 'Male',
    bloodGroup: 'B+',
    abhaId: '91-1001-2002-3001',
    tokenNumber: 'OPD-GEN-201',
    symptoms: ['Fever for 2 days', 'Mild body ache']
  },
  {
    id: 4,
    name: 'Priya Singh',
    email: 'priya@example.com',
    password: 'Demo@12348',
    role: 'doctor',
    phone: '+91 98100 12348',
    department: 'Cardiology',
    roomNumber: 'Room 201',
    pin: '7788',
    specialization: 'Interventional Cardiologist'
  },
  {
    id: 5,
    name: 'Neha Gupta',
    email: 'neha@example.com',
    password: 'Demo@12349',
    role: 'patient',
    phone: '+91 98100 12349',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O+',
    abhaId: '91-1002-2003-3002',
    tokenNumber: 'OPD-CARD-202',
    symptoms: ['Palpitations', 'Exertional fatigue']
  },
  {
    id: 6,
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    password: 'Demo@12350',
    role: 'patient',
    phone: '+91 98100 12350',
    age: 42,
    gender: 'Male',
    bloodGroup: 'A+',
    abhaId: '91-1003-2004-3003',
    tokenNumber: 'OPD-GEN-203',
    symptoms: ['Persistent dry cough', 'Throat irritation']
  },
  {
    id: 7,
    name: 'Dr. Karan Malhotra',
    email: 'karan@example.com',
    password: 'Demo@12351',
    role: 'doctor',
    phone: '+91 98100 12351',
    department: 'Orthopedics',
    roomNumber: 'Room 108',
    pin: '7788',
    specialization: 'Consultant Orthopedic Surgeon'
  },
  {
    id: 8,
    name: 'Anjali Sharma',
    email: 'anjali@example.com',
    password: 'Demo@12352',
    role: 'patient',
    phone: '+91 98100 12352',
    age: 33,
    gender: 'Female',
    bloodGroup: 'AB+',
    abhaId: '91-1004-2005-3004',
    tokenNumber: 'OPD-ORTHO-204',
    symptoms: ['Right knee swelling', 'Difficulty walking']
  },
  {
    id: 9,
    name: 'Rohan Kapoor',
    email: 'rohan@example.com',
    password: 'Demo@12353',
    role: 'administrator',
    phone: '+91 98100 12353',
    department: 'Hospital Administration & IT'
  },
  {
    id: 10,
    name: 'Dr. Simran Kaur',
    email: 'simran@example.com',
    password: 'Demo@12354',
    role: 'doctor',
    phone: '+91 98100 12354',
    department: 'Pediatrics',
    roomNumber: 'Room 301',
    pin: '7788',
    specialization: 'Head of Pediatric Medicine'
  },
  {
    id: 11,
    name: 'Anita Devi (Staff Desk)',
    email: 'staff@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'staff',
    phone: '+91 98100 22002',
    department: 'Central Registration Counter #01'
  },
  {
    id: 12,
    name: 'Suresh Kumar (Lab Tech)',
    email: 'lab@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'lab',
    phone: '+91 98100 33003',
    department: 'Central Clinical Pathology & Imaging'
  },
  {
    id: 13,
    name: 'Mohit Verma (Chemist)',
    email: 'pharmacy@careflow.gov.in',
    password: 'Careflow@2026',
    role: 'pharmacy',
    phone: '+91 98100 44004',
    department: 'OPD Main Chemist & Jan Aushadhi Counter'
  }
];

export async function seedFirebaseDatabase() {
  console.log(`\n======================================================`);
  console.log(`🚀 Seeding 10 Fake Accounts into Firebase: ${projectId}`);
  console.log(`======================================================\n`);

  let firestoreSuccess = 0;
  let authSuccess = 0;

  // 1. Try Writing to Cloud Firestore ('users' collection)
  console.log('--- 1. Writing to Cloud Firestore collection "users" ---');
  for (const user of CUSTOM_DEMO_USERS) {
    try {
      const userDocRef = db.collection('users').doc(user.email);
      await userDocRef.set({
        name: user.name,
        email: user.email,
        password: user.password, // Demo only as specified by user
        role: user.role === 'administrator' ? 'admin' : user.role,
        phone: user.phone,
        department: user.department || null,
        roomNumber: user.roomNumber || null,
        pin: user.pin || null,
        age: user.age || null,
        gender: user.gender || null,
        bloodGroup: user.bloodGroup || null,
        abhaId: user.abhaId || null,
        tokenNumber: user.tokenNumber || null,
        symptoms: user.symptoms || null,
        createdAt: new Date().toISOString()
      }, { merge: true });

      console.log(`✅ [Firestore] Saved user: ${user.name} (${user.email}) -> users/${user.email}`);
      firestoreSuccess++;
    } catch (err) {
      console.warn(`⚠️ [Firestore] Failed for ${user.email}: ${err.message}`);
    }
  }

  // 2. Try Creating in Firebase Authentication
  console.log('\n--- 2. Creating in Firebase Authentication ---');
  for (const user of CUSTOM_DEMO_USERS) {
    try {
      let fUser;
      try {
        fUser = await auth.getUserByEmail(user.email);
        await auth.updateUser(fUser.uid, {
          password: user.password,
          displayName: user.name
        });
        console.log(`ℹ️ [Firebase Auth] User already exists, updated password: ${user.email}`);
        authSuccess++;
      } catch (notFound) {
        if (notFound.code === 'auth/user-not-found') {
          fUser = await auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.name
          });
          console.log(`✅ [Firebase Auth] Created user: ${user.email} (UID: ${fUser.uid})`);
          authSuccess++;
        } else {
          throw notFound;
        }
      }

      await auth.setCustomUserClaims(fUser.uid, {
        role: user.role === 'administrator' ? 'admin' : user.role,
        department: user.department || null,
        pin: user.pin || null
      });
    } catch (err) {
      if (err.code === 'auth/configuration-not-found') {
        console.warn(`⚠️ [Firebase Auth] Authentication service not yet initialized in console for project ${projectId}.`);
        break;
      }
      console.warn(`⚠️ [Firebase Auth] Error for ${user.email}: ${err.message}`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`🎉 Seeding Summary: ${firestoreSuccess}/10 saved to Firestore, ${authSuccess}/10 processed in Firebase Auth.`);
  console.log(`======================================================\n`);
  return { firestoreSuccess, authSuccess };
}

if (process.argv[1]?.endsWith('seedFirebaseData.js')) {
  seedFirebaseDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}
