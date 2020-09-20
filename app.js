const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose');
const Appointment = require('./models/appointmentModel')

const app = express()
app.set('view engine', 'ejs');

//mongoose database connection

const URI = 'mongodb://localhost:27017/appointmentsDB'

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("ERROR connecting to database => ", err);
});

// express methods for getting json data from POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// make appointment page
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {

    const { name, email,mobile, date, time } = req.body

    const newAppointment = Appointment({
        name: name,
        email: email,
        mobile: mobile,
        date: date,
        time: time
    });

    newAppointment.save(err => {
        if (err) {
            console.error(`Error ${err}`)
        }
    })

    res.render('index');
});


// admin page - view appointments
app.get('/admin', async (req, res) => {
    const foundAppointments = await Appointment.find({})
    res.render('admin', { foundAppointments })
})

app.get('/delete/:id', async (req, res) => {
    await Appointment.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(`${docs.name} appointment was deleted`)
        }
    });

    res.redirect('/admin')
})

const port = 5050
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/admin`)
})

