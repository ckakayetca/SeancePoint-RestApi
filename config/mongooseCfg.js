const mongoose = require('mongoose');

async function connectDb() {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/seancePoint');

        console.log('Database connected');
    } catch (error) {
        console.log("DATABASE ERROR:");
        console.log(error.message);
    }

};

module.exports = connectDb;