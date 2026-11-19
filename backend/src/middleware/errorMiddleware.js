import { ApiError } from '../utils/ApiError.js';
import config from '../config/env.js';
import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    error = new ApiError(400, `Resource not found with id of ${err.value}`);
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    error = new ApiError(409, `Duplicate value entered for ${field}. Please use another value.`);
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new ApiError(400, message);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid authentication token');
  }
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Authentication token expired');
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`, { stack: err.stack });
  } else {
    logger.warn(`[${req.method}] ${req.originalUrl} - ${statusCode} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: error.errors || [],
    ...(config.env === 'development' && { stack: err.stack })
  });
};

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: [${req.method}] ${req.originalUrl}`));
};

export default errorHandler;
