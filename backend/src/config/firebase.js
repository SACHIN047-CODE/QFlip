import admin from 'firebase-admin';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

let isInitialized = false;
let storageBucket = null;

try {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

  if (projectId && clientEmail && privateKey && bucketName) {
    // Handle escaped newlines in private key string from .env
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    privateKey = privateKey.replace(/\\n/g, '\n');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        }),
        storageBucket: bucketName
      });
    }

    storageBucket = admin.storage().bucket();
    isInitialized = true;
    logger.info(`✅ Firebase Cloud Storage initialized with bucket: ${bucketName}`);
  } else {
    logger.info('ℹ️ Firebase credentials not fully configured in environment. Local file storage fallback active.');
  }
} catch (error) {
  logger.warn(`⚠️ Firebase Admin initialization failed: ${error.message}. Local storage fallback will be used.`);
}

export const isFirebaseConfigured = () => isInitialized && storageBucket !== null;

/**
 * Upload a file buffer directly to Firebase Cloud Storage.
 * @param {Buffer} fileBuffer - The binary content of the file
 * @param {string} originalName - Original filename
 * @param {string} mimeType - File mimetype
 * @param {string} folder - Destination subfolder (default: 'lab-reports')
 * @returns {Promise<string>} Public HTTPS URL of the uploaded document
 */
export const uploadToFirebase = async (fileBuffer, originalName, mimeType, folder = 'lab-reports') => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase Storage is not configured. Please check environment variables.');
  }

  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${Date.now()}-${sanitizedName}`;
  const file = storageBucket.file(filePath);

  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
      cacheControl: 'public, max-age=31536000'
    },
    public: true
  });

  // Construct public URL
  return `https://storage.googleapis.com/${storageBucket.name}/${filePath}`;
};

export { admin };
export default admin;
