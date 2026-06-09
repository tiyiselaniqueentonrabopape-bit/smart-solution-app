const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect, adminOnly } = require('../middleware/auth');

// @route   POST /api/messages
// @desc    Create new message/request (public or logged in)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message, userId } = req.body;

    if (!phone || !service || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const msg = await Message.create({
      userId: userId || null,
      name: name || 'Guest',
      email: email || '',
      phone,
      service,
      message
    });

    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages
// @desc    Get all messages (admin only)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages/my
// @desc    Get logged-in user's messages
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/messages/:id/status
// @desc    Update message status
// @access  Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/messages/:id/note
// @desc    Add admin note
// @access  Private/Admin
router.put('/:id/note', protect, adminOnly, async (req, res) => {
  try {
    const { adminNote } = req.body;
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { adminNote },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
