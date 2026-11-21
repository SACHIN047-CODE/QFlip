import admin from 'firebase-admin';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

let isInitialized = false;
let firestoreDb = null;
let realtimeDb = null;
let storageBucket = null;

try {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const databaseURL = process.env.FIREBASE_DATABASE_URL;
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

  if (projectId && clientEmail && privateKey) {
    // Handle escaped newlines in private key string from .env
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    if (!admin.apps.length) {
      const config = {
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        })
      };

      if (databaseURL) {
        config.databaseURL = databaseURL;
      }
      if (bucketName) {
        config.storageBucket = bucketName;
      }

      admin.initializeApp(config);
    }

    try {
      firestoreDb = admin.firestore();
      logger.info(`✅ Firebase Firestore initialized successfully for project: ${projectId}`);
    } catch (fsErr) {
      logger.warn(`⚠️ Firebase Firestore initialization note: ${fsErr.message}`);
    }

    if (databaseURL) {
      try {
        realtimeDb = admin.database();
        logger.info(`✅ Firebase Realtime Database initialized with URL: ${databaseURL}`);
      } catch (rtErr) {
        logger.warn(`⚠️ Firebase Realtime Database initialization note: ${rtErr.message}`);
      }
    }

    if (bucketName) {
      try {
        storageBucket = admin.storage().bucket();
        logger.info(`✅ Firebase Cloud Storage initialized with bucket: ${bucketName}`);
      } catch (stErr) {
        logger.warn(`⚠️ Firebase Cloud Storage initialization note: ${stErr.message}`);
      }
    }

    isInitialized = true;
  } else {
    logger.info(
      'ℹ️ Firebase credentials not fully configured in environment (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). Database fallback active.'
    );
  }
} catch (error) {
  logger.warn(`⚠️ Firebase Admin initialization failed: ${error.message}. Local database fallback active.`);
}

export const isFirebaseConfigured = () => isInitialized && firestoreDb !== null;

export const getFirestoreDb = () => firestoreDb;
export const getRealtimeDb = () => realtimeDb;
export const getStorageBucket = () => storageBucket;

/**
 * Persist or update a support ticket document in Firebase Firestore
 * Collection: 'support_tickets', Document ID: ticketId
 */
export const saveTicketToFirestore = async (ticket) => {
  if (!isFirebaseConfigured()) return null;
  try {
    const docRef = firestoreDb.collection('support_tickets').doc(ticket.ticketId);
    const dataToSave = {
      ...ticket,
      updatedAt: new Date().toISOString()
    };
    await docRef.set(dataToSave, { merge: true });
    logger.info(`[Firebase] Ticket ${ticket.ticketId} saved to Firestore`);
    return dataToSave;
  } catch (err) {
    logger.error(`[Firebase] Failed to save ticket ${ticket.ticketId} to Firestore: ${err.message}`);
    return null;
  }
};

/**
 * Retrieve a support ticket from Firebase Firestore by ticket ID
 */
export const getTicketFromFirestore = async (ticketId) => {
  if (!isFirebaseConfigured()) return null;
  try {
    const docRef = firestoreDb.collection('support_tickets').doc(ticketId.toUpperCase());
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    return doc.data();
  } catch (err) {
    logger.error(`[Firebase] Failed to get ticket ${ticketId} from Firestore: ${err.message}`);
    return null;
  }
};

/**
 * Retrieve all support tickets from Firebase Firestore
 */
export const getAllTicketsFromFirestore = async () => {
  if (!isFirebaseConfigured()) return null;
  try {
    const snapshot = await firestoreDb.collection('support_tickets').orderBy('createdAt', 'desc').get();
    const tickets = [];
    snapshot.forEach((doc) => {
      tickets.push(doc.data());
    });
    return tickets;
  } catch (err) {
    logger.error(`[Firebase] Failed to query tickets from Firestore: ${err.message}`);
    return null;
  }
};

/**
 * Update a support ticket in Firebase Firestore
 */
export const updateTicketInFirestore = async (ticketId, updates) => {
  if (!isFirebaseConfigured()) return null;
  try {
    const docRef = firestoreDb.collection('support_tickets').doc(ticketId.toUpperCase());
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    const updatePayload = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await docRef.update(updatePayload);
    logger.info(`[Firebase] Ticket ${ticketId} updated in Firestore`);
    return { ...doc.data(), ...updatePayload };
  } catch (err) {
    logger.error(`[Firebase] Failed to update ticket ${ticketId} in Firestore: ${err.message}`);
    return null;
  }
};

export { admin };
export default admin;
