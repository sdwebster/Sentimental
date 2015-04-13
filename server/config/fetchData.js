var keys = require('./keys.js');
var Article = require('./models/articleModel.js');
var Articles = require('./collections/articles.js');

function fetchData(req, res){
    var startDate = req.query.startDate || 00000000;
    var endDate = req.query.endDate || new Date();
    var timePeriod = req.query.timePeriod;
    var keyword = req.query.keyword;
    var source = req.query.source;

    // SELECT YEAR(published), MONTH(published), COUNT(id) FROM sentimentalDev.articles GROUP BY YEAR(published), MONTH(published)

        if (timePeriod) {
            //TODO refactor out
            new Article()
                .query('count')
                .query('where', 'published', '>', startDate )
                .query('where', 'published', '<', endDate )
                .fetchAll()
                .then(function(frequencies) {
                    res.send(frequencies.toJSON());
                }).catch(function(error) {
                    console.log(error);
                    res.send('An error occured');
                });
        } else {
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
        }
}
module.exports = fetchData;