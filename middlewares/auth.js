const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/secret')
const User = require('../models/User');

exports.auth = async (req, res, next) => {

	const token = req.cookies['auth'];

	if (token) {
		try {
			const decodedToken = jwt.verify(token, SECRET);

			let user = await User.findById(decodedToken._id);

			req.user = user;
			req.isAuth = true;
		} catch (error) {
			res.clearCookie('auth');
			req.isAuth = false;
			res.status(401).send({ message: 'Invalid token! ' });
		}
	} else {
		req.isAuth = false;
	}

    next();
};

exports.isAuth = (req, res, next) => {
	console.log('auth middleware')
	if (!req.user) {
		console.log('403')
		res.status(403).send('Unauthorized!');

		return
	}
	next();
};
