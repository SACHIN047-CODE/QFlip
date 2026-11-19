import { body } from 'express-validator';

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn([
      'patient',
      'doctor',
      'registration_staff',
      'admin',
      'lab_staff',
      'pharmacy_staff'
    ])
    .withMessage('Invalid role specified')
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateUpdateRole = [
  body('role')
    .isIn([
      'patient',
      'doctor',
      'registration_staff',
      'admin',
      'lab_staff',
      'pharmacy_staff'
    ])
    .withMessage('Valid role is required')
];
