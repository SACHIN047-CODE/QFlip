import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/careflow',
  jwtSecret: process.env.JWT_SECRET || 'careflow_super_secure_jwt_secret_key_2026_dev',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  corsOrigin: process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  doctorPasskey: process.env.DOCTOR_PASSKEY || '7788',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || ''
  }
};

export default config;
