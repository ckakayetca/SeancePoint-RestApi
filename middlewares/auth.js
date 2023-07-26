const jwt = require('jsonwebtoken');
const { SECRET } = require('../managers/userManager');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
	const token = req.cookies['auth'];

	if (token) {
		try {
			const decodedToken = jwt.verify(token, SECRET);

			let user = await User.findById(decodedToken._id);

			req.user = user;
			req.isAuth = true;
			next();
		} catch (error) {
            req.isAuth = false;
			res.status(401).send({ message: 'Invalid token! ' });
		}
	}
};

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        res.status(403).send('Unauthorized!')
    }
    next();
}
