import { v2 as cloudinary } from 'cloudinary';
import config from './env.js';
import logger from './logger.js';

if (config.cloudinary.cloudName && config.cloudinary.apiKey) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  });
  logger.info('Cloudinary initialized for cloud media storage.');
} else {
  logger.info('Cloudinary credentials not set. Using local file storage for uploads.');
}

export default cloudinary;
