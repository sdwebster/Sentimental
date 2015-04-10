
var logger = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejs = require('ejs');
var handlebars = require('express-handlebars');
var Article = require('./models/articleModel.js');
var Articles = require('./collections/articles.js');

module.exports = function(app, express){

    // var routes = require('./routes/index.js');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true  
    }));

    //http://localhost:8080/data?startDate=20000101&endDate=20010101

    app.use(express.static(path.join(__dirname, '/../../public/client/'), {'dotfiles':'allow'}));
    app.get('/data', function(req, res){
        var startDate = req.query.startDate || 00000000;
        var endDate = req.query.endDate || new Date();
        new Article()
            .query('where', 'published', '>', startDate )
            .query('where', 'published', '<', endDate )
            .fetchAll()
            .then(function(articles) {
              res.send(articles.toJSON());
            }).catch(function(error) {
              console.log(error);
              res.send('An error occured');
            });
    });

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}
