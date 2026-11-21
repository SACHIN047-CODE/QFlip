import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ApiError } from '../utils/ApiError.js';

// Ensure local uploads directory exists for fallback
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory storage keeps file buffer in memory for streaming to Firebase Cloud Storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        'Invalid file type. Only JPG, PNG, WEBP, PDF, and DOC files are permitted.'
      ),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * Fallback helper to save buffer to local uploads directory when Firebase is not active.
 */
export const saveBufferToLocalDisk = async (buffer, originalname) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname);
  const fileName = `report-${uniqueSuffix}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
};

export default upload;
