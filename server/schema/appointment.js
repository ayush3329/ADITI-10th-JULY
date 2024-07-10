const mongoose = require('mongoose');
  const appointmentSchema = new mongoose.Schema({
    //commented ko uncommented krdo aur type should be ref , woh bas change kiya tha handler  testing ke liye
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      doctor: {
        // type: mongoose.Schema.Types.ObjectId,
        type:String,
        ref: 'Doctor',
        required: true,
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