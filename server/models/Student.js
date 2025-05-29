const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' }, // Reference to Parent
  // other fields...
});

module.exports = mongoose.model('Student', studentSchema);
