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
  console.log('identifiers:', JSON.stringify(identifiers));
  return modelConstructor
    .query({where: identifiers})
    .fetch()
    .then(function (row) {
      if (row === null){
        row = new modelConstructor(identifiers);
      }
      // console.log('row is ', row);
      return row.save();
        // return constructRow(modelConstructor, identifiers, logger(row));
    });
});

// (* -> Model) -> {} -> Model
function constructRow (modelConstructor, columns, row) {
  if (row === undefined || row === null) {
    return new modelConstructor(sliceArgs(arguments, 1)).set(columns).save();
  } else {
    return row.fetch();
  }
}

var getSource = retrieveRow(Source);
var getWord = retrieveRow(Word);

var makeArticle = R.curry(function(source, word, article){
  return constructRow(Article, {
      source: source.get('id'),
      word: word.get('id'),
      published: new Date(article.pub_date),
      url: article.web_url,
      headline: article.headline.main
    });
});

// make a large query to a news API and insert all entries into the database
function ingestData (searchTerm, beginDate, endDate, sourceName, page) {
  bluebird.join(
    getWord({ word: searchTerm }),
    getSource({name: sourceName})
    ).then(ingestPages);

  function ingestPages (data) {
    var wordModel = data[0];
    var sourceModel = data[1];
    getResults (0);

    function getResults (page) {
      return request(constructURL(
        searchTerm, beginDate, endDate, sourceName, page
      )).then(function (results) {
        var res = JSON.parse(results[0].body).response;
        if (res.meta.hits > (res.meta.offset + 10)) {
          getResults(page + 1);
        }
        res.docs.forEach(makeArticle(sourceModel, wordModel));
      // .catch(function (err) {
      //     errorHandler(err);
      //   });
      });
    }
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

function constructURL (searchTerm, beginDate, endDate, sourceName, page) {
  return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=' + 
    'headline:\"' + searchTerm +
    '\"&begin_date=' + beginDate +
    '&end_date=' + endDate +
    '&page=' + page +
    '&api-key=' + (process.env.CUSTOMCONNSTR_NYT_API_KEY || keys.nyt);
}

ingestData('Gazprom', '20000101', '20150406', 'New York Times')

module.exports = ingestData;
