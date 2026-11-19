import { ApiError } from '../utils/ApiError.js';

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Role [${req.user.role}] is not authorized to access this route. Requires one of: [${roles.join(', ')}]`
        )
      );
    }

    next();
  };
};

export default authorizeRoles;
