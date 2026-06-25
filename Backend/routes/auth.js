const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminUser = require('../models/AdminUser');
const auth = require('../middleware/auth');
const {
  validateUserSignup,
  validateUserLogin,
  validateAdminLogin,
  handleValidationErrors
} = require('../middleware/validation');
const router = express.Router();

const ROLE_PERMISSIONS = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads', 'edit_leads']
};

// User signup
router.post('/user/signup', validateUserSignup, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone 
      } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error during signup' });
  }
});

// User login
router.post('/user/login', validateUserLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      // Generic error message to prevent account enumeration
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

// Admin login
router.post('/admin/login', validateAdminLogin, handleValidationErrors, async (req, res) => {
  try {
    const { username, password } = req.body;
    const traceId = req.headers['x-trace-id'] || `admin-login-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    // #region debug-point B:backend-admin-login-received
    (()=>{const fs=require('fs'),p='.dbg/admin-login-fails.env';let u=process.env.DEBUG_SERVER_URL||'http://127.0.0.1:7778/event',s='admin-login-fails';try{const e=fs.readFileSync(p,'utf8');u=e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]||u;s=e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]||s}catch{}fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s,runId:process.env.DEBUG_RUN_ID||'pre-fix',hypothesisId:'B',traceId,location:'Backend/routes/auth.js:/admin/login',msg:'[DEBUG] Backend admin login received',data:{username,hasPassword:typeof password==='string'&&password.length>0,passwordLen:typeof password==='string'?password.length:0},ts:Date.now()})}).catch(()=>{})})();
    // #endregion
    
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      // Generic error message to prevent account enumeration
      // #region debug-point B:backend-admin-not-found
      (()=>{const fs=require('fs'),p='.dbg/admin-login-fails.env';let u=process.env.DEBUG_SERVER_URL||'http://127.0.0.1:7778/event',s='admin-login-fails';try{const e=fs.readFileSync(p,'utf8');u=e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]||u;s=e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]||s}catch{}fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s,runId:process.env.DEBUG_RUN_ID||'pre-fix',hypothesisId:'B',traceId,location:'Backend/routes/auth.js:/admin/login',msg:'[DEBUG] Backend admin not found',data:{username},ts:Date.now()})}).catch(()=>{})})();
      // #endregion
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    let isPasswordValid = await admin.comparePassword(password);

    // Backward compatibility for seeded users created before hashing fix.
    if (!isPasswordValid && admin.password === password) {
      // #region debug-point B:backend-password-backcompat
      (()=>{const fs=require('fs'),p='.dbg/admin-login-fails.env';let u=process.env.DEBUG_SERVER_URL||'http://127.0.0.1:7778/event',s='admin-login-fails';try{const e=fs.readFileSync(p,'utf8');u=e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]||u;s=e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]||s}catch{}fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s,runId:process.env.DEBUG_RUN_ID||'pre-fix',hypothesisId:'B',traceId,location:'Backend/routes/auth.js:/admin/login',msg:'[DEBUG] Backend password back-compat triggered',data:{username},ts:Date.now()})}).catch(()=>{})})();
      // #endregion
      admin.password = password;
      await admin.save();
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      // #region debug-point B:backend-invalid-password
      (()=>{const fs=require('fs'),p='.dbg/admin-login-fails.env';let u=process.env.DEBUG_SERVER_URL||'http://127.0.0.1:7778/event',s='admin-login-fails';try{const e=fs.readFileSync(p,'utf8');u=e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]||u;s=e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]||s}catch{}fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s,runId:process.env.DEBUG_RUN_ID||'pre-fix',hypothesisId:'B',traceId,location:'Backend/routes/auth.js:/admin/login',msg:'[DEBUG] Backend invalid password',data:{username},ts:Date.now()})}).catch(()=>{})})();
      // #endregion
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        employeeId: admin.employeeId,
        band: admin.band,
        role: admin.role,
        permissions: admin.permissions.length > 0 ? admin.permissions : ROLE_PERMISSIONS[admin.role]
      } 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    // #region debug-point B:backend-admin-login-exception
    (()=>{const fs=require('fs'),p='.dbg/admin-login-fails.env';let u=process.env.DEBUG_SERVER_URL||'http://127.0.0.1:7778/event',s='admin-login-fails';const traceId=req.headers['x-trace-id']||null;try{const e=fs.readFileSync(p,'utf8');u=e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]||u;s=e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]||s}catch{}fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:s,runId:process.env.DEBUG_RUN_ID||'pre-fix',hypothesisId:'B',traceId,location:'Backend/routes/auth.js:/admin/login',msg:'[DEBUG] Backend admin login exception',data:{error:String(error&&error.message?error.message:error)},ts:Date.now()})}).catch(()=>{})})();
    // #endregion
    res.status(500).json({ message: 'Internal server error during admin login' });
  }
});

// Initialize default admin users (one-time setup)
router.post('/admin/init', async (req, res) => {
  try {
    const existingAdmins = await AdminUser.countDocuments();
    if (existingAdmins > 0 && process.env.ALLOW_ADMIN_INIT !== 'true') {
      return res.status(400).json({ message: 'Admin users already initialized' });
    }

    const requestedAdmin =
      req.body &&
      typeof req.body === 'object' &&
      typeof req.body.username === 'string' &&
      typeof req.body.password === 'string'
        ? {
            username: req.body.username,
            name: typeof req.body.name === 'string' ? req.body.name : 'Super Admin',
            email:
              typeof req.body.email === 'string'
                ? req.body.email
                : req.body.username.includes('@')
                  ? req.body.username
                  : 'care@kashless.in',
            phone: typeof req.body.phone === 'string' ? req.body.phone : '8167478979',
            employeeId: typeof req.body.employeeId === 'string' ? req.body.employeeId : 'EMP001',
            band: req.body.band === 'A' || req.body.band === 'B' || req.body.band === 'C' || req.body.band === 'D' ? req.body.band : 'A',
            role: req.body.role === 'super_admin' || req.body.role === 'admin' || req.body.role === 'agent' ? req.body.role : 'super_admin',
            permissions:
              Array.isArray(req.body.permissions) && req.body.permissions.length > 0
                ? req.body.permissions
                : ROLE_PERMISSIONS.super_admin,
            password: req.body.password
          }
        : null;

    const envAdmin =
      typeof process.env.DEFAULT_ADMIN_USERNAME === 'string' &&
      process.env.DEFAULT_ADMIN_USERNAME &&
      typeof process.env.DEFAULT_ADMIN_PASSWORD === 'string' &&
      process.env.DEFAULT_ADMIN_PASSWORD
        ? {
            username: process.env.DEFAULT_ADMIN_USERNAME,
            name: process.env.DEFAULT_ADMIN_NAME || 'Super Admin',
            email: process.env.DEFAULT_ADMIN_EMAIL || (process.env.DEFAULT_ADMIN_USERNAME.includes('@') ? process.env.DEFAULT_ADMIN_USERNAME : 'care@kashless.in'),
            phone: process.env.DEFAULT_ADMIN_PHONE || '8167478979',
            employeeId: process.env.DEFAULT_ADMIN_EMPLOYEE_ID || 'EMP001',
            band: process.env.DEFAULT_ADMIN_BAND || 'A',
            role: process.env.DEFAULT_ADMIN_ROLE || 'super_admin',
            permissions: ROLE_PERMISSIONS.super_admin,
            password: process.env.DEFAULT_ADMIN_PASSWORD
          }
        : null;

    const defaultAdmins = [
      {
        username: 'superadmin',
        name: 'Super Admin',
        email: 'superadmin@kashless.com',
        phone: '9876543210',
        employeeId: 'EMP001',
        band: 'A',
        role: 'super_admin',
        permissions: ROLE_PERMISSIONS.super_admin,
        password: 'SuperAdmin@123' // Stronger default password
      },
      {
        username: 'admin',
        name: 'Admin User',
        email: 'admin@kashless.com',
        phone: '9876543211',
        employeeId: 'EMP002',
        band: 'B',
        role: 'admin',
        permissions: ROLE_PERMISSIONS.admin,
        password: 'Admin@123' // Stronger default password
      },
      {
        username: 'agent',
        name: 'Agent User',
        email: 'agent@kashless.com',
        phone: '9876543212',
        employeeId: 'EMP003',
        band: 'C',
        role: 'agent',
        permissions: ROLE_PERMISSIONS.agent,
        password: 'Agent@123' // Stronger default password
      }
    ];

    const adminsToEnsure = requestedAdmin ? [requestedAdmin] : envAdmin ? [envAdmin] : defaultAdmins;
    const results = [];

    for (const adminData of adminsToEnsure) {
      const existing = await AdminUser.findOne({ username: adminData.username });
      if (existing) {
        existing.name = adminData.name;
        existing.email = adminData.email;
        existing.phone = adminData.phone;
        existing.employeeId = adminData.employeeId;
        existing.band = adminData.band;
        existing.role = adminData.role;
        existing.permissions = adminData.permissions;
        if (adminData.password) {
          existing.password = adminData.password;
        }
        await existing.save();
        results.push({ username: adminData.username, action: 'updated' });
        continue;
      }

      const adminUser = new AdminUser(adminData);
      await adminUser.save();
      results.push({ username: adminData.username, action: 'created' });
    }

    res.status(201).json({
      message: requestedAdmin || envAdmin ? 'Admin user ensured successfully' : 'Default admin users created successfully. Please change default passwords immediately!',
      results
    });
  } catch (error) {
    console.error('Init admin error:', error);
    res.status(500).json({ message: 'Internal server error during admin initialization' });
  }
});

module.exports = router;
