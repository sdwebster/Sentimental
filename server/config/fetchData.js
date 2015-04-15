var keys = require('./keys.js');
var Article = require('./models/articleModel.js');
var Articles = require('./collections/articles.js');
var Keyword = require('./models/keywordModel.js');
// var Keywords = require('./collections/keywords.js');
// var Source = require('./models/sourceModel.js');
// var Sources = require('./collections/sources.js');

// new Keyword('id')
//   .query('where', 'word', '=', 'BP')
//   .fetchAll

// // new keywords({word: 'BP'})


var fetchData = function (req, res){
  var startDate = req.query.startDate || 00000000;
  var endDate = req.query.endDate || new Date();
  var timePeriod = req.query.timePeriod;
  // var keyword = fetchID('keywords', req.query.keyword);
  // var source = fetchID('sources', req.query.source);

  new Keyword({'name': 'Jeb Bush'})
    .fetch()
    .then(function(model) {
      console.log(model.get('id'));
    });

  console.log('This should be 2, above us');

  new Article()
    .query('where', 'published', '>', startDate )
    .query('where', 'published', '<', endDate )
    // .query('where', 'source', '=', source )
    // .query('where', 'word', '=', keyword )
    .fetchAll()
    .then(function(articles) {
      res.send(articles.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured, please ensure that you request a keyword and source.');
    });

  // if (timePeriod) {
  //     res.send('We\'ll get to this');
  //     //TODO refactor out
  //     // newyorktimesew Article()
  //     //     .query('count')
  //     //     .query('where', 'published', '>', startDate )
  //     //     .query('where', 'published', '<', endDate )
  //     //     .fetchAll()
  //     //     .then(function(frequencies) {
  //     //         res.send(frequencies.toJSON());
  //     //     }).catch(function(error) {
  //     //         console.log(error);
  //     //         res.send('An error occured');
  //     //     });
  // } else {
  // }
}

var fetchID = function (table, value){
  //TODO refactor with lookup to keyword/source tables
  if (table = 'keywords'){
    new Keywords({word: 'BP'})
  }

  // if (table === 'keywords' && value === 'BP'){
  //     return 1;
  // } else if (table === 'sources' && value === 'newyorktimes'){
  //     return 1;
  // }
};

module.exports = fetchData;
