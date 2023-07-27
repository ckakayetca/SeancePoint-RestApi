const router = require('express').Router();
const manager = require('../managers/seanceManager');
const { isAuth } = require('../middlewares/auth');

// get all seances

router.get('/', async (req, res) => {

    try {
        let seances = await manager.getAll();

        res.status(200).json(seances)
    } catch (error) {
        res.send(error)
    }
})

// get one seance

router.get('/:id', async (req, res) => {

})

// edit seance

router.put('/:id', async (req, res) => {

})

// delete seance

router.delete('/:id', async (req, res) => {

})

// create seance

router.post('/create', isAuth, async (req, res) => {

});

module.exports = router
