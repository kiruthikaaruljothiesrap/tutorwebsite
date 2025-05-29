const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      sender: String, // 'parent' or 'tutor'
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Chat', chatSchema);
