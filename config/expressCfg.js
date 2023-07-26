const express = require('express');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/auth');

function expressCfg(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(auth);
}

module.exports = expressCfg;
