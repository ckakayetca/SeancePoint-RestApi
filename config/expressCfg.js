const express = require('express');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/auth');
const cors = require('cors');

function expressCfg(app) {
    app.use(cors({
        origin: true,
        credentials: true,
    }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(auth);
}

module.exports = expressCfg;
