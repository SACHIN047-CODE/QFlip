import { body } from 'express-validator';

export const validatePatientRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Patient name is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Contact phone number is required'),
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),
  body('age')
    .optional()
    .isInt({ min: 0, max: 130 })
    .withMessage('Age must be between 0 and 130'),
  body('departmentId')
    .optional()
    .isMongoId()
    .withMessage('Valid Department ID required')
];

export const validateQueueGeneration = [
  body('patientId')
    .isMongoId()
    .withMessage('Valid patient ObjectId is required'),
  body('departmentId')
    .isMongoId()
    .withMessage('Valid department ObjectId is required'),
  body('triageLevel')
    .optional()
    .isIn(['green', 'yellow', 'red'])
    .withMessage('Triage level must be green, yellow, or red')
];
