
var express = require('express');

var app = express();

// // configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

var db = require('./config/dbConfig.js');

// export our app, required by server.js
module.exports.app = app;
module.exports.db = db;
