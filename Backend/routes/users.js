const express = require('express');
const AdminUser = require('../models/AdminUser');
const User = require('../models/User');
const { auth, checkPermission } = require('../middleware/auth');
const router = express.Router();

const ROLE_PERMISSIONS = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads', 'edit_leads']
};

// Get all admin users
router.get('/admin', auth, async (req, res) => {
  try {
    const users = await AdminUser.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create admin user
router.post('/admin', auth, async (req, res) => {
  try {
    const { permissions, ...userData } = req.body;
    const userPermissions = permissions || ROLE_PERMISSIONS[userData.role];
    
    const user = new AdminUser({
      ...userData,
      permissions: userPermissions
    });
    
    await user.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update admin user
router.put('/admin/:id', auth, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const updateQuery = { ...updateData };
    
    if (password) {
      const user = await AdminUser.findById(req.params.id);
      if (user) {
        user.password = password;
        await user.save();
      }
    }
    
    const updatedUser = await AdminUser.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete admin user
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    const user = await AdminUser.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current admin user profile
router.get('/admin/profile', auth, async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user.adminId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userWithPermissions = {
      ...user.toObject(),
      permissions: user.permissions.length > 0 ? user.permissions : ROLE_PERMISSIONS[user.role]
    };
    
    res.json(userWithPermissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update current admin user profile
router.put('/admin/profile', auth, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const user = await AdminUser.findById(req.user.adminId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (password) {
      user.password = password;
    }
    
    Object.assign(user, updateData);
    await user.save();
    
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all regular users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current regular user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update current regular user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (password) {
      user.password = password;
    }
    
    Object.assign(user, updateData);
    await user.save();
    
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
