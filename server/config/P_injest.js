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

var makeArticle = R.curry(function(source, word, article){
  return constructRow(Article, function(){
    return {
      source: source.get('id'),
      word: word.get('id'),
      published: article.pub_date,
      url: article.web_url,
      headline: article.headline.main,
      // authorFN: article.byline.person.original,
    }
  }())
});


function ingestData (searchTerm, beginDate, endDate, sourceName) {
  // get all the data from an
  // API in the specified 
  // date range and insert 
  // all of the entries into
  // the database
  // 

  bluebird.join(
      getWord({word: searchTerm}), 
      getSource({name: sourceName})
      ).then(ingestPage)

  // return ingestPage(1);
  function ingestPage (data, page) {
    page = 1;
    console.log()
      getResults(searchTerm, beginDate, endDate, page)
        .then(function (results) {
          return insertArticle(results, data[0], data[1]);
        })
      // .catch(function (err) {
      //     errorHandler(err);
      //   });
  }
}

function logger (item) {
  item.get('id').then(function(id) {
    console.log(id);
  });
  return item
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

function sliceArgs (context, start, end) {
  Array.prototype.slice.call(context, start, end);
}

// (* -> Model) -> {} -> Model
function constructRow (modelConstructor, columns) {
  console.log(arguments);
  return modelConstructor.forge(sliceArgs(arguments, 1));
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

function insertArticle (results, word, source) {
  // console.log(results[0].body);
  // console.log(Object.keys(JSON.parse(results)));
  return JSON.parse(results[0].body)['response'].docs.map(
    R.composeP(
      insert,
      makeArticle(source, word)
    ));
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
