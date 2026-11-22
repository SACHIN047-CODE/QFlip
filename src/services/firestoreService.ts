import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface FirestoreEntity {
  id?: string;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any;
}

/**
 * Reusable Firestore Database Service
 * Implements full Create, Read, Update, Delete (CRUD) operations.
 */
export const firestoreService = {
  /**
   * 1. CREATE: Insert a new document with an auto-generated unique ID.
   * Uses collection() and addDoc().
   */
  async addRecord<T extends Record<string, any>>(collectionName: string, data: T): Promise<string> {
    try {
      const colRef = collection(db, collectionName);
      const docRef = await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      console.error(`Error adding document to "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * 2. READ: Fetch all documents from a collection.
   * Uses collection() and getDocs().
   */
  async getRecords<T = any>(collectionName: string): Promise<(T & { id: string })[]> {
    try {
      const colRef = collection(db, collectionName);
      let snapshot;
      try {
        const q = query(colRef, orderBy('createdAt', 'desc'));
        snapshot = await getDocs(q);
      } catch {
        // Fallback if index or timestamp doesn't exist
        snapshot = await getDocs(colRef);
      }

      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      })) as (T & { id: string })[];
    } catch (error: any) {
      console.error(`Error fetching documents from "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * 2b. READ SINGLE: Fetch one document by ID.
   * Uses doc() and getDoc().
   */
  async getRecordById<T = any>(collectionName: string, docId: string): Promise<(T & { id: string }) | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() } as (T & { id: string });
    } catch (error: any) {
      console.error(`Error fetching document "${docId}" from "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * 3. UPDATE: Modify an existing document by its ID.
   * Uses doc() and updateDoc().
   */
  async updateRecord<T extends Record<string, any>>(collectionName: string, docId: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error(`Error updating document "${docId}" in "${collectionName}":`, error);
      throw error;
    }
  },

  /**
   * 4. DELETE: Remove a document by its ID.
   * Uses doc() and deleteDoc().
   */
  async deleteRecord(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error: any) {
      console.error(`Error deleting document "${docId}" from "${collectionName}":`, error);
      throw error;
    }
  },

  // --------------------------------------------------------------------------
  // Application-Specific Domain Helpers
  // --------------------------------------------------------------------------

  // Patient Records (Collection: "patients")
  async savePatient(patient: {
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    bloodGroup?: string;
    abhaId?: string;
    allergies?: string[];
    chronicConditions?: string[];
  }) {
    return this.addRecord('patients', patient);
  },

  async getPatients() {
    return this.getRecords('patients');
  },

  async updatePatient(id: string, updates: Record<string, any>) {
    return this.updateRecord('patients', id, updates);
  },

  async deletePatient(id: string) {
    return this.deleteRecord('patients', id);
  },

  // Queue Tokens (Collection: "queue_tokens")
  async saveQueueToken(token: {
    tokenNumber: string;
    patientName: string;
    phone: string;
    department: string;
    status: string;
    priority?: string;
    symptoms?: string[];
  }) {
    return this.addRecord('queue_tokens', token);
  },

  async getQueueTokens() {
    return this.getRecords('queue_tokens');
  },

  async updateTokenStatus(id: string, status: string) {
    return this.updateRecord('queue_tokens', id, { status });
  },

  async deleteQueueToken(id: string) {
    return this.deleteRecord('queue_tokens', id);
  },

  // --------------------------------------------------------------------------
  // Users & Authentication Verification (Collection: "users")
  // --------------------------------------------------------------------------
  async getUserByEmail(email: string): Promise<any | null> {
    try {
      const normalizedEmail = email.toLowerCase().trim();
      const userDocRef = doc(db, 'users', normalizedEmail);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      }
      return null;
    } catch (err: any) {
      console.warn('Firestore getUserByEmail note:', err.message);
      return null;
    }
  },

  async registerPatient(userData: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    abhaId?: string;
  }): Promise<void> {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const userDocRef = doc(db, 'users', normalizedEmail);
    await setDoc(userDocRef, {
      name: userData.name,
      email: normalizedEmail,
      password: userData.password || 'Careflow@2026',
      role: 'patient',
      phone: userData.phone,
      abhaId: userData.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    }, { merge: true });
  },

  /**
   * Doctor Registration (Collection: "users" & "doctors"):
   * Saves a doctor with role="doctor" directly into Firebase Firestore.
   */
  async registerDoctor(doctorData: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    pin?: string;
    department?: string;
    specialty?: string;
    qualification?: string;
    room?: string;
    shift?: string;
  }): Promise<void> {
    const normalizedEmail = doctorData.email.toLowerCase().trim();
    const userDocRef = doc(db, 'users', normalizedEmail);
    
    // 1. Save to 'users' collection with role="doctor"
    await setDoc(userDocRef, {
      name: doctorData.name,
      email: normalizedEmail,
      password: doctorData.password || 'Demo@12346',
      role: 'doctor',
      phone: doctorData.phone || '+91 98765 43210',
      pin: doctorData.pin || '7788',
      department: doctorData.specialty || doctorData.department || 'General Medicine',
      specialty: doctorData.specialty || doctorData.department || 'General Medicine',
      qualification: doctorData.qualification || 'MBBS, MD',
      roomNumber: doctorData.room || 'OPD-14',
      room: doctorData.room || 'OPD-14',
      shift: doctorData.shift || '08:30 - 14:00',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // 2. Also save to 'doctors' collection for roster listing
    try {
      const docId = `doc-${normalizedEmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const doctorDocRef = doc(db, 'doctors', docId);
      await setDoc(doctorDocRef, {
        id: docId,
        name: doctorData.name,
        email: normalizedEmail,
        specialty: doctorData.specialty || doctorData.department || 'General Medicine',
        qualification: doctorData.qualification || 'MBBS, MD',
        room: doctorData.room || 'OPD-14',
        shift: doctorData.shift || '08:30 - 14:00',
        phone: doctorData.phone || '+91 98765 43210',
        status: 'Active',
        load: '0 Patients',
        role: 'doctor',
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Could not mirror to doctors collection:', e);
    }
  },

  async getDoctors(): Promise<any[]> {
    try {
      const doctorsCol = collection(db, 'doctors');
      const snapshot = await getDocs(doctorsCol);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (e) {
      console.warn('Error fetching doctors from firestore:', e);
    }
    return [];
  }
};

export default firestoreService;
