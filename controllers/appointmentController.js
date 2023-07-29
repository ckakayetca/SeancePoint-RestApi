const { isAuth } = require('../middlewares/auth');
const router = require('express').Router();
const manager = require('../managers/seanceManager');

// get my appointments
router.get('/my-appointments', isAuth, (req, res) => {
    const myId = req.user._id;

    try {
        const apps = manager.getMyAppointments(myId)

        res.status(200).json(apps)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

// cancel appointment
router.delete('/:id', isAuth, (req, res) => {
    const myId = req.user._id;
    const appId = req.params.id;

    try {
        const resp = manager.cancelApp(id)
        res.status(200).json(resp)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})
module.exports = router