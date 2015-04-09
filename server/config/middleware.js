
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');
var handlebars = require('express-handlebars');

module.exports = function(app, express){

    // var routes = require('./routes/index.js');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true  
    }));

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

    //http://localhost:8080/data?startDate=20000101&endDate=20010101

    app.use(express.static(path.join(__dirname, '/../../public/client/'), {'dotfiles':'allow'}));
    app.get('/data', function(req, res){
        startDate = req.query.startDate;
        endDate = req.query.endDate;
        res.send(testData);
    });

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}
