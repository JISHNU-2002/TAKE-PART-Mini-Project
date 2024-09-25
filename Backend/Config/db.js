const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/TAKEPART', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database: TAKEPART');
    } catch (error) {
        console.error('Connection to Database error -', error);
        process.exit(1);
    }
};

module.exports = connectDB;
