
var express = require('express');
var mongoose = require('mongoose');

var app = express();

// mongoose.connect('mongodb://localhost/sentimental01'); // connect to mongo database named shortly

// // configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app, required by server.js
module.exports.app = app;