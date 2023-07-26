const router = require('express').Router();
const seances = require('./controllers/seanceController');
const users = require('./controllers/userController');
// controllers

router.use('/seances', seances);
router.use('/users', users);

module.exports = router;
