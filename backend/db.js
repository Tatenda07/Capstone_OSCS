const mongoose = require('mongoose');
require('dotenv/config');

const url = `mongodb+srv://Joelson:Joe7MongoDB@initial-cluster.vie6y.mongodb.net/Capstone-OSCMS?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        });
        console.log('Connected to Capstone-OSCMS database successfuly.');
    } catch(err) {
        console.log(err);
        console.log('Closing NodeJS Server');
        process.exit(1);
    }
}

module.exports = connectDB;