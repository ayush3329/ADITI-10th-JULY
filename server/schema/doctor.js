const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      specialty: {
        type: String,
        required: true,
      },
      schedule: {
        type: [String], // Assuming schedule will be stored as an array of strings
        required: true,
      },
});
const doctor = mongoose.model("doctor", doctorSchema );
module.exports = doctor;