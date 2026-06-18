const express = require('express');
const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const { auth, checkPermission } = require('../middleware/auth');
const { validateCreateLead, validateUpdateLead, handleValidationErrors } = require('../middleware/validation');
const router = express.Router();

// Create a new lead (public endpoint)
router.post('/', validateCreateLead, handleValidationErrors, async (req, res) => {
  try {
    // Sanitize data - remove any sensitive fields
    const { name, phone, email, loanType, amount, notes, userId } = req.body;
    
    const normalizedUserId =
      userId && mongoose.isValidObjectId(userId) ? userId : undefined;

    const leadData = {
      name,
      phone,
      email,
      loanType,
      amount,
      status: 'new',
      notes: notes || '',
      userId: normalizedUserId
    };

    const lead = new Lead(leadData);
    await lead.save();
    
    res.status(201).json(lead);
  } catch (error) {
    console.error('Create lead error:', error);
    if (error && (error.name === 'ValidationError' || error.name === 'CastError')) {
      return res.status(400).json({ message: error.message || 'Invalid lead data' });
    }
    res.status(500).json({ message: 'Internal server error when creating lead' });
  }
});

// Get all leads (admin only)
router.get('/', auth, checkPermission('view_leads'), async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate('assignedTo', 'name email')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ message: 'Internal server error when fetching leads' });
  }
});

// Get leads for specific user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Security check: users can only access their own leads
    const isOwnUser = req.user.userId === req.params.userId;
    
    if (!isOwnUser && !req.user.adminId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const leads = await Lead.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Get user leads error:', error);
    res.status(500).json({ message: 'Internal server error when fetching user leads' });
  }
});

// Update a lead
router.put('/:id', auth, checkPermission('edit_leads'), validateUpdateLead, handleValidationErrors, async (req, res) => {
  try {
    // Only allow specific fields to be updated
    const allowedUpdates = ['status', 'notes', 'assignedTo'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email').populate('userId', 'name email phone');
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.json(lead);
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ message: 'Internal server error when updating lead' });
  }
});

// Delete a lead
router.delete('/:id', auth, checkPermission('delete_leads'), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ message: 'Internal server error when deleting lead' });
  }
});

module.exports = router;
