var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var RateLimiter = require('limiter').RateLimiter;
var R = require('ramda');

var keys = require('./keys.js').sourceAPIKeys;

var Article = require('./models/articleModel.js');
var Source = require('./models/sourceModel.js');
var Word = require('./models/keywordModel.js');


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


  return ingestPage(1);
  function logger (item) {
    item.get('id').then(function(id) {
      console.log(id);
    });
    return item
  }
  function ingestPage (page) {
    bluebird.join(
      getResults(searchTerm, beginDate, endDate, page),
      logger(getWord({word: searchTerm}).fetch()), 
      getSource({name: sourceName}).fetch()
    ).then(function (results, word, source) {
        return insertArticle(results, word, source);
      }).catch(function (err) {
        errorHandler(err);
      });
  }
}

function errorHandler (err) {
  // do a bunch of super complex error handling stuff...
  console.log(
    'ERROR!!!!!____________________________________________________________\n');
  console.log(err);
  console.log(
    '______________________________________________________________________\n');
  return err;
}

function constructRow (modelConstructor, columns) {
  return modelConstructor.forge(columns);
}


function retrieveRow (modelConstructor, identifiers) {
  // create an instance of
  // a given model from DB
  // selected based on the
  // given identifiers
  // argument
  // 
  return modelConstructor.forge(identifiers);
};

function insertArticle (results, word, src) {
  console.log('results', word, src);
  var article = makeArticle({})
  return insert(article);
}

function insert (row) {
  //insert a row into it's table
  return row.save();
}

function getResults (searchTerm, beginDate, endDate, page) {
  return request(constructURL(searchTerm, beginDate, endDate, page));
}

function constructURL (searchTerm, beginDate, endDate, page) {
  return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=' + 
  'headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + 
  endDate + '&page=' + page + '&api-key=' + keys.nyt;
}


ingestData('Al Gore', '20000101', '20150406', 'New York Times')

module.exports = ingestData;
