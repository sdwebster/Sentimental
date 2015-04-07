
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');


// var exphbs  = require('express-handlebars');

module.exports = function(app, express){

    // var routes = require('./routes/index.js');
    // var users = require('./routes/user.js');
    
    // view engine setup

    // var env = process.env.NODE_ENV || 'development';
    // app.locals.ENV = env;
    // app.locals.ENV_DEVELOPMENT = env == 'development';

    // // app.use(favicon(__dirname + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    // app.use(cookieParser());
    // console.log('serving static files from' + __dirname + '/../client');
    
    // Check to see if a production file exists, if so use the production version, if not 
      // use the development version.  The dist folder is made with Gruntfile.js 
    fs.exists(__dirname + '/../../public/dist/', function (exists) {
      if (exists){
        console.log("Serving public/dist folder - production");
        app.use(express.static(__dirname + '/../../public/dist'));
      } else {
        console.log("Serving client folder - development");
        app.use(express.static(__dirname + '/../../public/client'));
      }
    });
    // app.engine('.html', require('ejs').renderFile);
    app.get('/', function (req, res){
      console.log('app.get ("/".... was called');
      res.render(__dirname + '/../../public/dist/index.html');
    });
    // app.use('/', routes);
    // app.use('/users', users);

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    // app.use(function(err, req, res, next) {
    //     res.status(err.status || 500);
    //     res.render('error', {
    //         message: err.message,
    //         error: {},
    //         title: 'error'
    //     });
    // });

}
