const express = require('express');
const { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(createAppointment).get(protect, admin, getAppointments);
router.route('/:id').put(protect, admin, updateAppointmentStatus).delete(protect, admin, deleteAppointment);

module.exports = router;
