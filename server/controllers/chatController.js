const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  const { parentId, tutorId, sender, content } = req.body;

  try {
    let chat = await Chat.findOne({ parentId, tutorId });

    if (!chat) {
      chat = new Chat({ parentId, tutorId, messages: [] });
    }

    chat.messages.push({ sender, content });
    await chat.save();

    res.json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
};

exports.getChat = async (req, res) => {
  const { parentId, tutorId } = req.query;

  try {
    const chat = await Chat.findOne({ parentId, tutorId });
    res.json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching chat' });
  }
};
