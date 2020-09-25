var express = require('express');
var router = express.Router();
const Appointment = require('../models/appointmentModel')
// admin page - view appointments
router.get('/', async (req, res) => {
    const foundAppointments = await Appointment.find()
    res.render('admin', { foundAppointments })
})

router.get('/delete/:id', async (req, res) => {
    await Appointment.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(`appointment was deleted`)
        }
    });

    res.redirect('/admin')
})

module.exports = router