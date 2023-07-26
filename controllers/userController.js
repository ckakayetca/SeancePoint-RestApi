const router = require('express').Router();
const { register, login } = require('../managers/userManager');

// login

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		const token = await login({ username, password });

        res.cookie('auth', token, { httpOnly: true });
	} catch (error) {
        res.send(error)
    }
});

// register

router.post('/register', async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            tel,
            rePassword,
        } = req.body

        await register({email, username, password, tel, rePassword});

    } catch (error) {
        res.send(error)
    }
})

// logout

// get profile info

// edit profile info
