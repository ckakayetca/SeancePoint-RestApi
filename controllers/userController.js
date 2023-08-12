const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
const {
	register,
	login,
	getInfo,
	editInfo,
} = require('../managers/userManager');

// login

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		debugger;

		const [token, user] = await login({ username, password });

		res.cookie('auth', token, { httpOnly: true });
		res.status(200).json(user);
	} catch (error) {
		res.status(401).send({ message: error.message });
	}
});

// register

router.post('/register', async (req, res) => {
	try {
		const { email, username, password, tel, rePassword } = req.body;

		let user = await register({ email, username, password, tel, rePassword });

		res.status(200).json(user)
	} catch (error) {
		res.send({ message: error.message });
	}
});

// logout

router.get('/logout', (req, res) => {
	try {
		res.clearCookie('auth').status(204).send({ message: 'Logged out!' });
	} catch (error) {
		res.send(error);
	}
});

// get profile info

router.get('/profile', async (req, res) => {
	const id = req.user?._id;

	try {
		let user = await getInfo(id);
		res.status(200).json(user);
	} catch (error) {
		res.send(undefined);
	}
});

// edit profile info

router.put('/profile', isAuth, async (req, res) => {
	const id = req.user._id;
	const { email, username, tel } = req.body;
	console.log('PUT /PROFILE');
	try {
		let newUser = await editInfo(id, { email, username, tel });

		res.status(200).json(newUser);
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
