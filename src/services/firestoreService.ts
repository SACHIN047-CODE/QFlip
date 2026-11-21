import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
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
  }
};

export default firestoreService;
