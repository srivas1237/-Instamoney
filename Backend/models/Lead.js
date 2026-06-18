const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  loanType: { type: String, required: true },
  amount: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'in_progress', 'approved', 'rejected', 'disbursed'], 
    default: 'new' 
  },
  notes: { type: String },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AdminUser' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
