const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['compliance', 'case'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'resolved', 'closed'], 
    default: 'open' 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AdminUser', 
    required: true 
  },
  assignedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AdminUser', 
    required: true 
  },
  resolution: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
