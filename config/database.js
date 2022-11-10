const mongoose = require('mongoose');
require('../models/User');
const connectionString = 'mongodb://localhost:27017/sweetLife'

module.exports = async (app) => { 
    try {
        mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
        await mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connectiong to database');
        process.exit(1);
    }

};