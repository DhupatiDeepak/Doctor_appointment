const express = require('express');
const { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getDoctors).post(protect, admin, createDoctor);
router.route('/:id').get(getDoctorById).put(protect, admin, updateDoctor).delete(protect, admin, deleteDoctor);

module.exports = router;
