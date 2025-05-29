const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');

router.get('/', getNotifications);
router.post('/mark-read', markAsRead);

module.exports = router;
