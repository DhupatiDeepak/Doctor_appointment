const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        patientName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
