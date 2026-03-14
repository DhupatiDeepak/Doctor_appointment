const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        specialization: { type: String, required: true },
        experience: { type: String, required: true },
        education: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String },
        availableDays: [{ type: String }],
    },
    { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
