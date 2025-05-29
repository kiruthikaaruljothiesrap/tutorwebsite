const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Courses bought/enrolled by parent
  // other fields...
});

module.exports = mongoose.model('Parent', parentSchema);
