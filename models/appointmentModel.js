const mongoose = require("mongoose");


//schema
const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    salong: String,
    date: String,
    time: String
});

//model
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;