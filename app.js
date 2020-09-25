const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose');
const Appointment = require('./models/appointmentModel')

const app = express()
app.set('view engine', 'ejs');

//mongoose database connection

const localURI = 'mongodb://localhost:27017/appointmentsDB'
const remoteURI = 'mongodb+srv://admin:Admin@cluster0.p4ksv.gcp.mongodb.net/appointmentsDB?retryWrites=true&w=majority'

mongoose.connect(remoteURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("ERROR connecting to database => ", err);
});

// express methods for getting json data from POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admin', require('./routes/admin'))

// make appointment page
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', (req, res) => {

    const { name, email, mobile, salong, date, hour, minute } = req.body

    const time = `${hour}:${minute}`

    const newAppointment = Appointment({
        name: name,
        email: email,
        mobile: mobile,
        salong: salong,
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

// http://localhost:5050

const port = process.env.PORT || 5050
app.listen(port, () => { console.log(`Port is :${port}`) })

