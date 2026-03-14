const Message = require('../models/Message');

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({
        name,
        email,
        subject,
        message,
    });

    const createdMessage = await newMessage.save();
    res.status(201).json(createdMessage);
};

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res) => {
    const messages = await Message.find({});
    res.json(messages);
};

module.exports = { createMessage, getMessages };
