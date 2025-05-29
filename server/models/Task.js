const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  studentEmail: String,
  date: String, // YYYY-MM-DD
  tasks: [
    {
      text: String,
      completed: Boolean
    }
  ]
});

module.exports = mongoose.model('Task', taskSchema);
