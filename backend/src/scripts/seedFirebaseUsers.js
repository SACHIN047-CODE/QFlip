import dotenv from 'dotenv';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import logger from '../config/logger.js';

dotenv.config();

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

const auth = getAuth(app);

export const SEED_USERS = [
  // 3 REAL DOCTORS
  {
    email: 'doctor@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Dr. Rajesh Sharma, MD',
    role: 'doctor',
    department: 'General Medicine',
    roomNumber: 'Room 101',
    phoneNumber: '+919876543210',
    pin: '7788'
  },
  {
    email: 'dr.priya@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Dr. Priya Nair, MD, DM',
    role: 'doctor',
    department: 'Cardiology',
    roomNumber: 'Room 201',
    phoneNumber: '+919876543211',
    pin: '7788'
  },
  {
    email: 'dr.vikram@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Dr. Vikram Mehta, MS',
    role: 'doctor',
    department: 'Orthopedics',
    roomNumber: 'Room 108',
    phoneNumber: '+919876543212',
    pin: '7788'
  },

  // 9 REAL PATIENTS
  {
    email: 'patient@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Aarav Patel',
    role: 'patient',
    phoneNumber: '+919820111221',
    abhaId: '91-8274-1049-9812',
    gender: 'Male',
    age: 34,
    bloodGroup: 'B+'
  },
  {
    email: 'kavita.singh@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Kavita Singh',
    role: 'patient',
    phoneNumber: '+919820111222',
    abhaId: '91-5521-3901-4412',
    gender: 'Female',
    age: 28,
    bloodGroup: 'O+'
  },
  {
    email: 'rohan.verma@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Rohan Verma',
    role: 'patient',
    phoneNumber: '+919820111223',
    abhaId: '91-6632-8819-7721',
    gender: 'Male',
    age: 45,
    bloodGroup: 'A+'
  },
  {
    email: 'sunita.mehra@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Sunita Mehra',
    role: 'patient',
    phoneNumber: '+919820111224',
    abhaId: '91-7743-9920-8832',
    gender: 'Female',
    age: 52,
    bloodGroup: 'B-'
  },
  {
    email: 'vikas.dubey@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Vikas Dubey',
    role: 'patient',
    phoneNumber: '+919820111225',
    abhaId: '91-1188-4455-6677',
    gender: 'Male',
    age: 39,
    bloodGroup: 'AB+'
  },
  {
    email: 'pooja.iyer@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Pooja Iyer',
    role: 'patient',
    phoneNumber: '+919820111226',
    abhaId: '91-2299-5566-7788',
    gender: 'Female',
    age: 31,
    bloodGroup: 'O-'
  },
  {
    email: 'amitabh.sen@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Amitabh Sen',
    role: 'patient',
    phoneNumber: '+919820111227',
    abhaId: '91-3311-6677-8899',
    gender: 'Male',
    age: 64,
    bloodGroup: 'B+'
  },
  {
    email: 'meena.kumari@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Meena Kumari',
    role: 'patient',
    phoneNumber: '+919820111228',
    abhaId: '91-4422-7788-9900',
    gender: 'Female',
    age: 41,
    bloodGroup: 'A-'
  },
  {
    email: 'harpreet.singh@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Harpreet Singh',
    role: 'patient',
    phoneNumber: '+919820111229',
    abhaId: '91-5533-8899-0011',
    gender: 'Male',
    age: 50,
    bloodGroup: 'O+'
  },

  // STAFF & ADMIN ACCOUNTS
  {
    email: 'admin@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Dr. Sunita Rao (CMS Admin)',
    role: 'admin',
    phoneNumber: '+919810011001'
  },
  {
    email: 'staff@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Anita Devi (Staff Desk)',
    role: 'staff',
    phoneNumber: '+919810022002'
  },
  {
    email: 'lab@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Suresh Kumar (Lab Tech)',
    role: 'lab',
    phoneNumber: '+919810033003'
  },
  {
    email: 'pharmacy@careflow.gov.in',
    password: 'Careflow@2026',
    displayName: 'Mohit Verma (Chemist)',
    role: 'pharmacy',
    phoneNumber: '+919810044004'
  }
];

export async function seedFirebaseUsers() {
  console.log('🚀 Starting Firebase Authentication seed...');
  console.log(`Target Firebase Project: ${projectId}`);

  let successCount = 0;
  let skippedCount = 0;

  for (const u of SEED_USERS) {
    try {
      let firebaseUser;
      try {
        firebaseUser = await auth.getUserByEmail(u.email);
        console.log(`ℹ️ User already exists in Firebase Auth: ${u.email} (${firebaseUser.uid})`);
        skippedCount++;
      } catch (notFoundErr) {
        if (notFoundErr.code === 'auth/user-not-found') {
          firebaseUser = await auth.createUser({
            email: u.email,
            password: u.password,
            displayName: u.displayName,
            phoneNumber: u.phoneNumber
          });
          console.log(`✅ Created user in Firebase Auth: ${u.email} -> UID: ${firebaseUser.uid}`);
          successCount++;
        } else {
          throw notFoundErr;
        }
      }

      // Set custom claims for role-based access
      await auth.setCustomUserClaims(firebaseUser.uid, {
        role: u.role,
        department: u.department || null,
        roomNumber: u.roomNumber || null,
        abhaId: u.abhaId || null,
        pin: u.pin || null
      });
    } catch (err) {
      if (err.code === 'auth/configuration-not-found') {
        console.error('\n⚠️ FIREBASE AUTHENTICATION NOT YET ACTIVATED IN CONSOLE:');
        console.error('Please visit your Firebase Console to activate Authentication:');
        console.error(`👉 https://console.firebase.google.com/project/${projectId}/authentication`);
        console.error('1. Click "Get started"');
        console.error('2. Under "Sign-in method", enable "Email/Password"');
        console.error('3. Run `npm run seed:firebase` again to automatically provision all 12 users!\n');
        return { success: false, reason: 'configuration-not-found' };
      }
      console.error(`❌ Failed to create ${u.email}:`, err.message);
    }
  }

  console.log(`\n🎉 Firebase Seeding Finished: ${successCount} created, ${skippedCount} already existed.`);
  return { success: true, successCount, skippedCount };
}

// Execute if called directly from CLI
if (process.argv[1]?.endsWith('seedFirebaseUsers.js')) {
  seedFirebaseUsers()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Fatal seeding error:', err);
      process.exit(1);
    });
}
