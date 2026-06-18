const express = require('express');
const AdminUser = require('../models/AdminUser');
const Lead = require('../models/Lead');
const Case = require('../models/Case');
const { auth, checkPermission } = require('../middleware/auth');
const router = express.Router();

const ROLE_PERMISSIONS = {
  super_admin: ['view_leads', 'edit_leads', 'delete_leads', 'manage_users', 'view_reports'],
  admin: ['view_leads', 'edit_leads', 'view_reports'],
  agent: ['view_leads', 'edit_leads']
};

// Get dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const inProgressLeads = await Lead.countDocuments({ status: 'in_progress' });
    const approvedLeads = await Lead.countDocuments({ status: 'approved' });
    
    const recentLeads = await Lead.find()
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const totalCases = await Case.countDocuments();
    const openCases = await Case.countDocuments({ status: 'open' });

    res.json({
      totalLeads,
      newLeads,
      inProgressLeads,
      approvedLeads,
      recentLeads,
      totalCases,
      openCases
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cases
router.get('/cases', auth, async (req, res) => {
  try {
    const cases = await Case.find()
      .populate('assignedTo', 'name email')
      .populate('assignedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a case
router.post('/cases', auth, async (req, res) => {
  try {
    const caseData = { ...req.body, assignedBy: req.user.adminId };
    const newCase = new Case(caseData);
    await newCase.save();
    await newCase.populate('assignedTo assignedBy', 'name email');
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a case
router.put('/cases/:id', auth, async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('assignedTo assignedBy', 'name email');
    
    if (!updatedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports
router.get('/reports', auth, async (req, res) => {
  try {
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const leadsByType = await Lead.aggregate([
      { $group: { _id: '$loanType', count: { $sum: 1 } } }
    ]);

    const casesByStatus = await Case.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      leadsByStatus,
      leadsByType,
      casesByStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
