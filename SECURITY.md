# Kashless Security Guide

## Overview

This document outlines all security measures implemented in the Kashless application, both on the frontend and backend.

## Backend Security

### 1. Security Headers (Helmet.js)
- **XSS Protection**: Content-Security-Policy prevents cross-site scripting
- **Clickjacking Prevention**: X-Frame-Options
- **MIME Sniffing Prevention**: X-Content-Type-Options
- **HTTPS Enforcement**: Strict-Transport-Security
- **Browser XSS Filter**: X-XSS-Protection

### 2. Rate Limiting
- **Login Endpoints**: Max 5 attempts per 2 minutes to prevent brute-force attacks
- **General Endpoints**: Max 100 requests per 15 minutes
- **Response**: Clear error messages without exposing sensitive info

### 3. Input Validation (express-validator)
- **Email Validation**: Proper format checking
- **Phone Validation**: Exactly 10 digits
- **Password Requirements**: 
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
- **Name/Text Validation**: Length restrictions, character whitelists

### 4. NoSQL Injection Protection
- **express-mongo-sanitize**: Removes $ and . from inputs
- **Input Sanitization**: Before database operations

### 5. XSS Protection
- **xss-clean**: Sanitizes user inputs
- **xss-clean**: Removes malicious scripts from requests

### 6. HTTP Parameter Pollution Prevention
- **hpp**: Prevents multiple query parameters with same name

### 7. CORS Configuration
- **Development**: Allows localhost:3000
- **Production**: Restricted to specific domains
- **Credentials**: Properly handled

### 8. Password Security
- **bcrypt**: Secure hashing with salt rounds
- **Strong Password Policy**: See above
- **Never Store Plain Text**: Passwords are never stored in readable format

### 9. Authentication & Authorization
- **JWT**: JSON Web Tokens with secret signature
- **Role-Based Access**: Super Admin → Admin → Agent
- **Permission Checks**: Granular control over API access
- **Token Expiry**: 7 days, no refresh tokens for security

### 10. Error Handling
- **Generic Error Messages**: No sensitive system info exposed
- **Proper Logging**: Errors logged, not sent to clients
- **404 Handling**: Proper response for non-existent endpoints

## Frontend Security

### 1. Input Sanitization
- **sanitizeInput**: Removes HTML tags, scripts, and dangerous content
- **safeText**: Escapes special characters for safe display
- **sanitizeHTML**: Allows only safe HTML tags

### 2. Secure Storage
- **secureStorage**: Wrapper around localStorage with:
  - Automatic sanitization
  - Password exclusion from storage
  - Clear all data on logout
  - Safe JSON serialization

### 3. XSS Prevention
- **No innerHTML**: Use textContent for dynamic content
- **Safe Rendering**: Always escape user-generated content
- **createSafeElement**: Helper for DOM creation

### 4. Input Validation
- **isValidEmail**: Email format checking
- **isValidPhone**: 10-digit validation
- **isValidName**: Character restrictions
- **validatePassword**: Password strength checker
- **numbersOnly**, **alphanumericOnly**: Input filters

### 5. API Security
- **Sanitize Before Sending**: All requests sanitized
- **Request Timeout**: 30 seconds to prevent hanging
- **Token Management**: Secure storage and transmission
- **Error Handling**: Safe error messages without system info

### 6. CSRF Protection
- **Token Generation**: Random CSRF tokens
- **Token Storage**: Secure storage implementation
- **Ready for Integration**: Can be added to forms

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Kashless
JWT_SECRET=your_very_secure_random_secret_key_here
NODE_ENV=development
```

**Production Requirements**:
- JWT_SECRET must be at least 32 random characters
- Use MongoDB Atlas with IP whitelisting
- NODE_ENV=production

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Default Credentials

After initializing admin users, these are the defaults:

| Role | Username | Password |
|------|----------|----------|
| Super Admin | superadmin | SuperAdmin@123 |
| Admin | admin | Admin@123 |
| Agent | agent | Agent@123 |

**⚠️ IMPORTANT: CHANGE THESE PASSWORDS IMMEDIATELY AFTER FIRST LOGIN!**

## Deployment Security Checklist

### 1. Production Environment
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS only
- [ ] Configure CORS for production domain
- [ ] Set secure JWT_SECRET (32+ random chars)
- [ ] Use environment variables for all secrets

### 2. Database Security
- [ ] Use MongoDB Atlas or similar managed service
- [ ] Enable IP whitelisting
- [ ] Use strong database password
- [ ] Enable encryption at rest
- [ ] Regular database backups

### 3. Server Security
- [ ] Keep Node.js and dependencies updated
- [ ] Use process manager (PM2)
- [ ] Enable firewall
- [ ] Disable unnecessary services
- [ ] Regular security updates

### 4. Frontend Security
- [ ] Set secure CSP headers
- [ ] Enable HTTPS with HSTS
- [ ] Use secure cookies if implemented
- [ ] Minify and obfuscate production code
- [ ] Disable source maps in production

## Security Best Practices for Developers

### Backend Development
1. Never commit `.env` file to git
2. Always validate and sanitize inputs
3. Use parameterized queries (Mongoose does this)
4. Implement proper error handling
5. Log security events (failed logins, etc.)
6. Use HTTPS in production
7. Keep dependencies updated (`npm audit`)

### Frontend Development
1. Never store passwords or tokens in plain text
2. Always sanitize user inputs
3. Use HTTPS for all API calls
4. Avoid `innerHTML` for user content
5. Validate all data received from API
6. Implement proper session timeouts

## Reporting Security Vulnerabilities

If you discover a security vulnerability:
1. Do NOT create a public GitHub issue
2. Report directly to the security team
3. Provide detailed steps to reproduce
4. Allow time for remediation before disclosure

## Security Features Summary

✅ **Authentication**: JWT-based with secure hashing  
✅ **Authorization**: Role-based with granular permissions  
✅ **Input Validation**: Server and client side  
✅ **XSS Protection**: Multiple layers of defense  
✅ **NoSQL Injection**: Input sanitization  
✅ **Rate Limiting**: Prevent brute-force attacks  
✅ **Security Headers**: Helmet.js protection  
✅ **CORS**: Proper origin restrictions  
✅ **Password Security**: bcrypt with strong policies  
✅ **Secure Storage**: Safe token and user data handling  
✅ **Error Handling**: No sensitive data exposure  

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Mongoose Security](https://mongoosejs.com/docs/security.html)
- [React Security Best Practices](https://reactjs.org/docs/cross-origin-errors.html)

---
**Last Updated**: June 2024
**Version**: 1.0

