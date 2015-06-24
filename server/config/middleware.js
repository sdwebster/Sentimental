
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var indico = require('./indico.js');
var fetchData = require('./fetchData.js');
var fetchKeyword = require('./fetchData.js');
var injest = require('./P_injest');
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

    app.get('/newsapi', function (req, res){
      console.log(req.query);
      // Send the data to parsed with options to P_injest to start the data gathering process 
      // Below is the minimum format for the request from the client, please note the date format.
      // localhost:8080/newsapi?keyword=microsoft&startDate=20130101&endDate=20150101
      var startDate = req.query.startDate || "00000000";
      var endDate = req.query.endDate || dateParse(new Date());
      // Spaces in keyword queries must be percent encoded (e.g Jeb Bush -> Jeb%20Bush)
      var keyword = req.query.keyword;
      var source = req.query.source;
      injest(keyword, startDate, endDate, 'New York Times');
      res.send('request sent');
    });
    // Automatic start and continuous checking the database every 60 seconds for new data to be sent to indico.io API
    // If left running 24 hours per day a call every 60 seconds will result in 1440 calls per day.
    setInterval(function(){indico()}, 60000);  
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    function dateParse (dateObj){
      var time = dateObj;
      time = time.toJSON().split('T')[0].split('-');
      return time[0]+time[1]+time[2]+"";
    }



}

function logger(string, x){
  console.log(string);
  console.log(JSON.stringify(x));
  return x;
} 
