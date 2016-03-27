
// set up ======================================================================
// get all the tools we need
var express  	= require('express');
var app      	= express();
var port     	= process.env.PORT || 8080;
var morgan   	= require('morgan');
var bodyParser  = require('body-parser');
var http 	 	= require('http');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating


// Set /static as our static content dir
app.use("/", express.static(__dirname + "/static"));

var io = null;

// middleware to pass on the io:
app.use(function(req, res, next) {
    req.io = io;
    next();
});


// routes ======================================================================
require('./routes.js')(app); // load our routes and pass in our app

// launch ======================================================================
var server = http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});
