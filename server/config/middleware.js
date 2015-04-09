
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');
// var exphbs = require('express3-handlebars');
var handlebars = require('express-handlebars');


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
    // app.set('views', __dirname + '/../../public/client/')
    // app.set('views', __dirname + '/views');
    // app.engine('html', ejs.renderFile);
    // app.set('view engine', 'html');
    // app.set('view engine', 'ejs');
    // app.set('view engine', 'handlebars')
    // Check to see if a production file exists, if so use the production version, if not 
      // use the development version.  The dist folder is made with Gruntfile.js 
    
    // var pathToUse = function(){
    //   var folder = '';
    //   fs.existsSync(path.join(__dirname, '/../../public/dist/'), function (exists) {
    //     if (exists){
    //       folder = '/../../public/dist/';
    //     } else {
    //       folder = '/../../public/client/';
    //     }
    //   });
    //   console.log('folder:', folder);
    //   return path.join(__dirname, folder);     
    // };

    // app.use(express.static(pathToUse(), {'dotfiles':'allow'}));
    var testData = [{
        "sale": "212",
        "year": "2000"
    }, {
        "sale": "225",
        "year": "2001"
    }, {
        "sale": "199",
        "year": "2002"
    }, {
        "sale": "219",
        "year": "2003"
    }, {
        "sale": "154",
        "year": "2005"
    }, {
        "sale": "196",
        "year": "2010"
    }];

    app.use(express.static(path.join(__dirname, '/../../public/client/'), {'dotfiles':'allow'}));
    app.get('/data', function(req, res){
        res.send(testData);
    })


    // var production = false;
    // });
    // production
    // if (production){
    //     console.log("Serving public/dist folder - production");
    //     app.use(express.static(path.join(__dirname, '/../../public/dist/'), {'dotfiles':'allow'}));
    // } else {
    //     console.log("Serving public/client folder - development");
    //     app.use(express.static(path.join(__dirname, '/../../public/client/'), {'dotfiles':'allow'}));
    // }



    // console.log(folderToServe);
    // app.get('/', function(req, res){
    //   res.render(__dirname + '/../../public/client/index');
    // })
    // app.use(express.static(__dirname + '/../../public/client/'));
    // app.engine('.html', require('ejs').renderFile);
 
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

    // if (app.get('env') === 'development') {
    //     app.use(function(err, req, res, next) {
    //         res.status(err.status || 500);
    //         res.render(
    //         //   'error', {
    //         //     message: err.message,
    //         //     error: err,
    //         //     title: 'error'
    //         // }
    //         );
    //     });
    // }
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
