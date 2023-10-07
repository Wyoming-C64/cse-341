const About = require('./about');
const express = require("express");
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');            // Contains actual connection code

const cors = require('cors');

const app = express();

const Port = process.env.Port || 8080;  // If no defined environment port, listen on 8080.

// I'm told to make sure this is placed before I handle any routes.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const corsSettings = {
    origin: [
        'http://localhost',
        'https://cse341-contacts-frontend.netlify.app/',
        'https://contacts-week-04.onrender.com/'
    ],
    methods: [
        'GET','POST','PUT','DELETE','UPDATE','PATCH'
    ]
};

app .use(cors(corsSettings))
    .use('/', require('./routes'));

console.log('\n');
console.log(About.name + ' v' + About.version + ' by ' + About.author);

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MongoDB is connected.");
        app.listen(Port, () => console.log("Server is running. Listening on port " + Port + ".\n"));
    }
});



