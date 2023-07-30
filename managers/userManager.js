const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SECRET } = require('../config/secret')

// register

exports.register = (userData) => User.create(userData);

// login

exports.login = async (userData) => {
	let user = await User.findOne({ username: userData.username });

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

    user = JSON.parse(JSON.stringify(user))
    const { password, __v, ...userDetails} = user
	const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

	return [token, userDetails];
};

// get profile info

exports.getInfo = async (id) => {
	let user = await User.findOne({ _id: id }, { password: 0, __v: 0 }).populate('appointments');
	if (!user) {
	    throw new Error('No such user!');
	}
    return user;
};

// edit profile info

exports.editInfo = async (id, data) => User.findByIdAndUpdate(id, data).then((user) => {
	return user
})
