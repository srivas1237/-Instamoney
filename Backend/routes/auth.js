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
    
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      // Generic error message to prevent account enumeration
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    let isPasswordValid = await admin.comparePassword(password);

    // Backward compatibility for seeded users created before hashing fix.
    if (!isPasswordValid && admin.password === password) {
      admin.password = password;
      await admin.save();
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
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
    res.status(500).json({ message: 'Internal server error during admin login' });
  }
});

// Initialize default admin users (one-time setup)
router.post('/admin/init', async (req, res) => {
  try {
    const existingAdmins = await AdminUser.countDocuments();
    if (existingAdmins > 0) {
      return res.status(400).json({ message: 'Admin users already initialized' });
    }

    const defaultAdmins = [
      {
        username: 'superadmin',
        name: 'Super Admin',
        email: 'superadmin@instamoney.com',
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
        email: 'admin@instamoney.com',
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
        email: 'agent@instamoney.com',
        phone: '9876543212',
        employeeId: 'EMP003',
        band: 'C',
        role: 'agent',
        permissions: ROLE_PERMISSIONS.agent,
        password: 'Agent@123' // Stronger default password
      }
    ];

    for (const adminData of defaultAdmins) {
      const adminUser = new AdminUser(adminData);
      await adminUser.save();
    }
    res.status(201).json({ message: 'Default admin users created successfully. Please change default passwords immediately!' });
  } catch (error) {
    console.error('Init admin error:', error);
    res.status(500).json({ message: 'Internal server error during admin initialization' });
  }
});

module.exports = router;
