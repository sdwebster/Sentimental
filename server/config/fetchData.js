var Article = require('./models/articleModel.js');
var Keyword = require('./models/keywordModel.js');
var Source = require('./models/sourceModel.js');
var bluebird = require('bluebird');
var R = require('ramda');

var fetchData = function (req, res){
  // console.log('fetch has req of', req);
  //Parse url queries for us in table lookup
  var startDate = req.query.startDate || 00000000;
  var endDate = req.query.endDate || new Date();
  // Spaces in keyword queries must be percent encoded (e.g Jeb Bush -> Jeb%20Bush)
  var keyword = req.query.keyword;
  var source = req.query.source;

  // Both keywordId and sourceId return promises
  var keywordId = function(){
    return new Keyword({'word': keyword})
    .fetch();
  };

  var sourceId = function(){
    if (source === 'newyorktimes'){
       source = 'New York Times';
    }
    return new Source({'name': source})
    .fetch();
  };
  

  // bluebird is used to resolve promises retured by keywordId and sourceId
  bluebird.join(keywordId(), sourceId())
    .then(function(array){
      return new Article()
        .query('where', 'published', '>', startDate )
        .query('where', 'published', '<', endDate )
        .query('where', 'word', '=', array[0].get('id') )
        .query('where', 'source', '=', array[1].get('id') )
        .fetchAll()
    })
    .then(function(articles) {
      articles.forEach(function(article){
        article.set('sentiment', article.get('sentimentOfSnippet'));
      });
      res.send(articles.toJSON());
    }).catch(function(error) {
      console.log(error);
      res.send('An error occured, please ensure that you request a keyword and source.');
    });
};

function logger(string, x){
  console.log(string, JSON.stringify(x));
  return x;
} 

module.exports = fetchData;
