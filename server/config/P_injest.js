var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var RateLimiter = require('limiter').RateLimiter;
var R = require('ramda');

// var keys = require('./keys.js').sourceAPIKeys;

var Article = require('./models/articleModel.js');
var Source = require('./models/sourceModel.js');
var Word = require('./models/keywordModel.js');


var limiter = new RateLimiter(10, 1000);


var retrieveRow = R.curry(function (modelConstructor, identifiers) {
  return new modelConstructor()
    .query({where: identifiers})
    .fetch().then(function (row) {
        return constructRow(modelConstructor, identifiers, row);
    });
});


// (* -> Model) -> {} -> Model
function constructRow (modelConstructor, columns, row) {
  //console.log(arguments);
  if (row === undefined || row === null) {
    console.log('NO ROW!');
    return new modelConstructor(sliceArgs(arguments, 1)).set(columns).save();
  } else {
    return row.fetch()
  }
}


var getSource = retrieveRow(Source);
var getWord = retrieveRow(Word);


var makeArticle = R.curry(function(source, word, article){
  console.log('pub_date: ' + new Date (article.pub_date))
  console.log('web_url: ' + article.web_url)
  console.log('headline: ' + article.headline.main)
  return constructRow(Article, function(){
    return {
      source: source.get('id'),
      word: word.get('id'),
      published: new Date(article.pub_date),
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
    getWord({ word: searchTerm }),
    getSource({name: sourceName})
    ).then(ingestPage);

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
  endDate + '&page=' + page + '&api-key=' + process.env.CUSTOMCONNSTR_NYT_API_KEY/*keys.nyt*/;
}


ingestData('ExxonMobil', '20000101', '20150406', 'New York Times')

module.exports = ingestData;
