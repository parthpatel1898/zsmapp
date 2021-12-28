// Get the packages we need
var express = require('express'),
    router = express.Router(),
    secrets = require('./config/secrets'),
    mysql = require("mysql"),
    path = require("path"),
    bodyParser = require('body-parser');

// Create our Express application
var app = express();

// Use environment defined port or 8080
var port = process.env.PORT || 8080;

// Connect to SQL
const db = mysql.createPool(secrets.sql_connection);
db.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
    }
    if (conn) { 
        console.log("Connected!");
    }
});

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router, db);

// Check if app is running on production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
    console.log("Production mode....");
}

// Start the server
app.listen(port, console.log('Server running on port ' + port));