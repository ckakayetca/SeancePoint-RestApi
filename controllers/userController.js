const router = require('express').Router();
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

		const token = await login({ username, password });

		res.cookie('auth', token, { httpOnly: true });
	} catch (error) {
		res.send(error);
	}
});

// register

router.post('/register', async (req, res) => {
	try {
		const { email, username, password, tel, rePassword } = req.body;

		await register({ email, username, password, tel, rePassword });
	} catch (error) {
		res.send(error);
	}
});

// logout

router.get('/logout', isAuth, (req, res) => {
	try {
		res.clearCookie('auth');
	} catch (error) {
		res.send(error);
	}
});

// get profile info

router.get('/profile', isAuth, async (req, res) => {
	const id = req.user._id;

	try {
		let user = await getInfo(id);
		res.status(200).json(user);
	} catch (error) {
		res.send(error);
	}
});

// edit profile info

router.put('/profile', isAuth, async (req, res) => {
	const id = req.user._id;
	const { email, username, tel } = req.body;

	try {
		await editInfo(id, { email, username, tel });
	} catch (error) {
		res.send(error);
	}
});
