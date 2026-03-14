const express = require('express');
const { createMessage, getMessages } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(createMessage).get(protect, admin, getMessages);

module.exports = router;
