const { body, validationResult } = require('express-validator');

// ==================== VALIDATION RULES ====================

// User Signup Validation
exports.validateUserSignup = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// User Login Validation
exports.validateUserLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

// Admin Login Validation
exports.validateAdminLogin = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

// Create Lead Validation
exports.validateCreateLead = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('loanType')
    .trim()
    .notEmpty().withMessage('Loan type is required'),
  body('amount')
    .trim()
    .notEmpty().withMessage('Loan amount is required')
];

// Update Lead Validation
exports.validateUpdateLead = [
  body('status')
    .optional()
    .isIn(['new', 'in_progress', 'approved', 'rejected', 'disbursed'])
    .withMessage('Invalid status value'),
  body('notes')
    .optional()
    .isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters')
];

// Create Admin User Validation
exports.validateCreateAdminUser = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
  body('employeeId')
    .trim()
    .notEmpty().withMessage('Employee ID is required'),
  body('band')
    .trim()
    .notEmpty().withMessage('Band is required')
    .isIn(['A', 'B', 'C', 'D']).withMessage('Invalid band value'),
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isIn(['super_admin', 'admin', 'agent']).withMessage('Invalid role'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Create Case Validation
exports.validateCreateCase = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('type')
    .trim()
    .notEmpty().withMessage('Case type is required')
    .isIn(['compliance', 'case']).withMessage('Invalid case type'),
  body('status')
    .optional()
    .isIn(['open', 'in_progress', 'resolved', 'closed']).withMessage('Invalid status'),
  body('assignedTo')
    .trim()
    .notEmpty().withMessage('Assigned user is required')
];

// Update Profile Validation
exports.validateUpdateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
  body('password')
    .optional()
    .trim()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// ==================== VALIDATION RESULT HANDLER ====================

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};
