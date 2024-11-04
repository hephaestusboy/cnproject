const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get chat messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  const message = new Message({
    sender: req.body.senderId,
    content: req.body.content
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;