const express = require('express');
const bodyParser = require('body-parser');
const routeSearch = require('./app/routes/search');
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8081"
  };

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

app.use("/",routeSearch);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect("mongodb+srv://dhruva:9427892397@cluster0-e8e2r.mongodb.net/GOT?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});