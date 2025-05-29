const express = require('express');
const router = express.Router();
const { sendMessage, getChat } = require('../controllers/chatController');

router.post('/send', sendMessage);
router.get('/fetch', getChat);

module.exports = router;
