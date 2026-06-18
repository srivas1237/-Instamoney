const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SECURITY MIDDLEWARE ====================

// 1. Helmet - Set security HTTP headers
app.use(helmet());

// 2. CORS - Configure cross-origin resource sharing
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://yourdomain.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 3. Rate Limiting - Prevent brute force attacks
const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 5, // 5 requests
  message: { message: 'Too many login attempts, please try again after 2 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { message: 'Too many requests from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/admin/login', loginLimiter);
app.use('/api/auth/user/login', loginLimiter);
app.use('/api/auth/user/signup', loginLimiter);
app.use('/', generalLimiter);

// 4. Body parser - Parse JSON requests with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. NoSQL Injection Protection - Sanitize user input
const sanitizeObject = (value) => {
  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    value.forEach((item) => sanitizeObject(item));
    return;
  }

  Object.keys(value).forEach((key) => {
    const sanitizedKey = key.replace(/\$/g, '').replace(/\./g, '');

    if (sanitizedKey !== key) {
      value[sanitizedKey] = value[key];
      delete value[key];
    }

    sanitizeObject(value[sanitizedKey]);
  });
};

// 6. XSS Protection - Sanitize user input to prevent cross-site scripting
const sanitizeStrings = (value) => {
  if (typeof value === 'string') {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeStrings(item));
  }

  if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      value[key] = sanitizeStrings(value[key]);
    });
  }

  return value;
};

app.use((req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeStrings(req.body);
  sanitizeStrings(req.params);
  next();
});

// 7. HPP - Prevent HTTP Parameter Pollution
app.use(hpp({
  whitelist: [] // Add parameters that can be duplicated if needed
}));

// ==================== END SECURITY MIDDLEWARE ====================

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/instamoney')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'InstaMoney API Server is running!' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
