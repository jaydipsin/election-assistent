const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests, please try again later.' }
});

router.post('/', chatLimiter, chatController.chat);

module.exports = router;
