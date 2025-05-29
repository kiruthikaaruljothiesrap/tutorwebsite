const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'student', 'tutor'], required: true },
  name: { type: String, default: 'Parent User' } // optional
});
module.exports = mongoose.model('User', userSchema);
