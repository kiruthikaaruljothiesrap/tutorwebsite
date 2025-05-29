const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  language: String,
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Course', courseSchema);
