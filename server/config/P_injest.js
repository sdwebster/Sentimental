var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var RateLimiter = require('limiter').RateLimiter;
var R = require('ramda');

var keys = require('./keys.js').sourceAPIKeys;

var Article = require('./models/articleModel.js');
var Source = require('./models/sourceModel.js');
var Word = require('./models/keywordModel.js');


var limiter = new RateLimiter(10, 1000);



var retrieveRow = R.curry(function (modelConstructor, identifiers) {
  return new modelConstructor()
    .query({where: identifiers})
    .fetch().then(function (row) {
      if (row === undefined || row === null) {
        console.log('row does not exist');
        return constructRow(modelConstructor, identifiers);
      }
      return row;
    });
});

var getSource = retrieveRow(Source);
var getWord = retrieveRow(Word);


var makeArticle = R.curry(function(source, word, article){
  console.log('pub_date: ' + article.pub_date)
  console.log('web_url: ' + article.web_url)
  console.log('headline: ' + article.headline.main)
  return constructRow(Article, function(){
    return {
      source: source.get('id'),
      word: word.get('id'),
      published: article.pub_date,
      url: article.web_url,
      headline: article.headline.main,
    }
  }())
});



function ingestData (searchTerm, beginDate, endDate, sourceName, page) {
  // get all the data from an
  // API in the specified 
  // date range and insert 
  // all of the entries into
  // the database
  // 
  page = page || 0;

  bluebird.join(
      (function(){
        return logger(getWord({ word: searchTerm }))
       })(), 
       (function(){
          console.log('making sourceModel: ')
          return logger(getSource({name: sourceName}))
        })()
      ).then(ingestPage)

  // return ingestPage(1);
  function ingestPage (data) {
      getResults(searchTerm, beginDate, endDate, sourceName, page)
        .then(function (results) {
          return insertArticle(results, data[0], data[1]);
        })
      // .catch(function (err) {
      //     errorHandler(err);
      //   });
  }
}

// a -> key || undefined -> a
function logger (item, key) {
    if(key !== undefined) {
      logger(item[key])
    } else if (item === null || item === undefined) {
      console.log(item);
    }else if(
      item.constructor === Object ||
      item.constructor === Array) {
        console.log(JSON.stringify(item));
      }
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
  //console.log(arguments);
  return new modelConstructor(sliceArgs(arguments, 1)).set(columns);
}


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
  return row.save()
}

function getResults (searchTerm, beginDate, endDate, source, page) {
  return request(constructURL(searchTerm, beginDate, endDate, page))
  .then(function (results) {
    var res = JSON.parse(results[0].body).response;
    if (res.meta.hits > (res.meta.offset + 10)) {
      ingestData(searchTerm, beginDate, endDate, source, (page + 1));
    }
    return results;
  });
}

function constructURL (searchTerm, beginDate, endDate, page) {
  return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=' + 
  'headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + 
  endDate + '&page=' + page + '&api-key=' + keys.nyt;
}


ingestData('BP', '20000101', '20150406', 'New York Times')

module.exports = ingestData;
