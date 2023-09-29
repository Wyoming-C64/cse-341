const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');            // Contains actual connection code
var cors = require('cors');
const app = express();

const Port = process.env.Port || 8080;  // If no defined environment port, listen on 8080.

app.use(cors()).use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MongoDB is connected.");
        app.listen(Port, () => console.log("Server is running. Listening on port " + Port + "."));
    }
});



