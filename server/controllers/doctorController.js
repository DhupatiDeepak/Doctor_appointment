const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
    const doctors = await Doctor.find({});
    res.json(doctors);
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

// @desc    Create a doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res) => {
    const { name, specialization, experience, education, description, image, availableDays } = req.body;

    const doctor = new Doctor({
        name,
        specialization,
        experience,
        education,
        description,
        image,
        availableDays,
    });

    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
};

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = async (req, res) => {
    const { name, specialization, experience, education, description, image, availableDays } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.experience = experience || doctor.experience;
        doctor.education = education || doctor.education;
        doctor.description = description || doctor.description;
        doctor.image = image || doctor.image;
        doctor.availableDays = availableDays || doctor.availableDays;

        const updatedDoctor = await doctor.save();
        res.json(updatedDoctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
        await doctor.deleteOne();
        res.json({ message: 'Doctor removed' });
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
