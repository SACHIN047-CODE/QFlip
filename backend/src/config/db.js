import mongoose from 'mongoose';
import config from './env.js';
import logger from './logger.js';

let mongodInstance = null;

export const connectDB = async () => {
  try {
    // Set Mongoose options
    mongoose.set('strictQuery', false);

    logger.info(`Attempting MongoDB connection to ${config.mongoUri}...`);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 5000,
    });

    logger.info(`MongoDB connected successfully to host: ${mongoose.connection.host}`);
  } catch (error) {
    logger.warn(`Could not connect to external/local MongoDB (${error.message}).`);
    
    // In development or test, automatically fallback to in-memory MongoDB
    if (config.env === 'development' || config.env === 'test') {
      try {
        logger.info('Starting fallback In-Memory MongoDB Server for smooth local development...');
        const path = await import('path');
        process.env.MONGOMS_DOWNLOAD_DIR = path.resolve('backend/.cache/mongodb-binaries');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create({
          binary: {
            downloadDir: path.resolve('backend/.cache/mongodb-binaries')
          }
        });
        const memUri = mongodInstance.getUri();
        
        await mongoose.connect(memUri);
        logger.info(`In-Memory MongoDB Server running and connected at ${memUri}`);
        return;
      } catch (memError) {
        logger.error(`Failed to initialize in-memory MongoDB fallback: ${memError.message}`);
      }
    }

    logger.error(`Critical MongoDB connection failure: ${error.message}`);
    logger.warn('CareFlow backend requires a valid MongoDB instance. Please configure MONGODB_URI in backend/.env');
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
    logger.info('MongoDB disconnected.');
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};

export default connectDB;
