var bluebird = require('bluebird');
var request = bluebird.promisifyAll(require('request'));
var RateLimiter = require('limiter');
var R = require('ramda');

var keys = require('./server/config/keys.js').sourceKeys;

var Article = require('./server/config/models/articleModel.js');
var Source = require('./server/config/models/sourceModel.js');
var Word = require('./server/config/models/keywordModel.js');


var limiter = new RateLimiter(10, 1000);


var getSource = R.curry(retrieveRow)(Source);
var getWord = R.curry(retrieveRow)(Word);

var makeArticle = R.curry(constructRow)(Article);


function ingestData (searchTerm, beginDate, endDate, sourceName) {
  // get all the data from an
  // API in the specified 
  // date range and insert 
  // all of the entries into
  // the database
  // 


  

  function ingestPage (page) {
    bluebird.all([getWord({word: searchTerm}), getSource({name: sourceName})])
      .then(function (args) {
        return {
          word: args[0],
          source: args[1],
          results: getResults(searchTerm, beginDate, endDate, page)
        };
      })
      .then(function (resolved) {
        return insert(resolved.word, resolved.source, resolved.results);
      }).catch(function (err) {
        errorHandler(err);
      });
  }
}

function errorHandler (err) {
  // do a bunch of super complex error handling stuff...
  console.log(err);
  return err;
}

function constructRow (modelConstructor, columns) {
  return new modelConstructor(columns);
}


function retrieveRow (modelConstructor, identifiers) {
  // create an instance of
  // a given model from DB
  // selected based on the
  // given identifiers
  // argument
  // 
  return new modelConstructor(identifiers).fetch();
};

function insert (row) {
  //insert a row into it's table
  return row.save();
}

function getResults = function (searchTerm, beginDate, endDate, page) {
  return requestAsync(
    constructURL(searchTerm, beginDate, endDate, page));
}

function constructURL (searchTerm, beginDate, endDate, page) {
  'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=' + 
  'headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + 
  endDate + '&page=' + page + '&api-key=' + keys['New York Times'];
}


module.exports = ingestData;
