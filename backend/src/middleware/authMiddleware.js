import { verifyToken } from '../utils/generateToken.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(ApiError.unauthorized('Not authenticated. Please provide a valid Bearer token.'));
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return next(ApiError.unauthorized('Invalid or expired authentication token.'));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(ApiError.unauthorized('User associated with this token no longer exists.'));
    }

    if (!user.isActive) {
      return next(ApiError.forbidden('This user account has been deactivated.'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (err) {
        // Silently proceed as guest if token is invalid
      }
    }
    next();
  } catch (error) {
    next();
  }
};

export default protect;
