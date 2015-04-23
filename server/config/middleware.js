
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var indico = require('./indico.js');
var fetchData = require('./fetchData.js');
var fetchKeyword = require('./fetchData.js');

module.exports = function(app, express){

    // var routes = require('./routes/index.js');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true  
    }));

    //http://localhost:8080/data?startDate=20000101&endDate=20010101

    app.use(express.static(path.join(__dirname, '/../../public/client/'), {'dotfiles':'allow'}));
    
    app.get('/data', function (req, res){
        fetchData(req, res);
    });

    // Manual Initiation for sending data to indico.io to retrive a sentiment analysis 
    app.get('/calc', function (req, res){
        indico(req, res);
    });

    // Automatic start and continuous checking the database every 60 seconds for new data to be sent to indico.io API
    // If left running 24 hours per day a call every 60 seconds will result in 1440 calls per day.
    setInterval(function(){indico()}, 60000);  
    
    // indico()
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}
