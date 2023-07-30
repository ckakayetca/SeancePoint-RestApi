const router = require('express').Router();
const seances = require('./controllers/seanceController');
const users = require('./controllers/userController');
const myAppointments = require('./controllers/appointmentController');
// controllers

router.use('/seances', seances);
router.use('/users', users);
router.use('/my-appointments', myAppointments)

module.exports = router;
