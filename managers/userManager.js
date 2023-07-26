const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const SECRET = 'test0purposes0secret';

// register

exports.register = (userData) => User.create(userData);

// login

exports.login = async (userData) => {
	const user = await User.findOne({ username: userData.username });

	if (!user) {
		throw new Error('Incorrect credentials!');
	}

	const isCorrectPass = await bcrypt.compare(userData.password, user.password);

	if (!isCorrectPass) {
		throw new Error('Incorrect credentials!');
	}

	const payload = {
		username: user.username,
		_id: user._id,
	};

	const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token
};
