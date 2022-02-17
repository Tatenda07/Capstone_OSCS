// NPM Packages
const express = require("express");
const cors = require("cors");
const url = `mongodb+srv://Joelson:Joe7MongoDB@initial-cluster.vie6y.mongodb.net/Capstone-OSCMS?retryWrites=true&w=majority`;
const connectDB = require("./db");
const connectionURL = require("./db");
const autoIncrement = require("mongoose-auto-increment");
const { createConnection } = require("mongoose");

// Initialization of Express Framework
const app = express();

// Connect to MongoDB Atlas Database
connectDB();

// database URI connection required by autoIncrement
const connection = createConnection(url);

// initialize mongoose-auto-increment
autoIncrement.initialize(connection);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handle validation errors within the application
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT || 5000, () => 
    console.log(`Running at port http://localhost:${process.env.PORT || 5000}/`)
);

// Express Routing Table
// http://localhost:5000/complaint/
app.use('/complaint', require('./routes/complaint'));