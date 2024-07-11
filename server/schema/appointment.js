const mongoose = require('mongoose');
  const appointmentSchema = new mongoose.Schema({
    //commented ko uncommented krdo aur type should be ref , woh bas change kiya tha handler  testing ke liye
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      patient_name: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true
      },
      age:{
        type: Number,
        required: true
      },
      gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female']
      },
      description: {
        type: String,
        required: true,
        maxLength: 100
      },
      department: {
        type: String,
        required: true,
        enum: ["Covid-19", "Heart Caring", "Orthopedic", "Obstetrics", "Lungs", "Pediatrics"]
      },
      time: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
      },
  });
  const appointment = mongoose.model("appointment", appointmentSchema );
  module.exports = appointment;