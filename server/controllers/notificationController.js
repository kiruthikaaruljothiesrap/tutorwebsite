const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.query.userId });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error getting notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.body.userId }, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating notifications' });
  }
};
