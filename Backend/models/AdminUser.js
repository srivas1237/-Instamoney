const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  band: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'agent'], 
    required: true 
  },
  permissions: { 
    type: [String], 
    default: [] 
  },
  password: { type: String, required: true }
}, { timestamps: true });

adminUserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminUserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('AdminUser', adminUserSchema);
