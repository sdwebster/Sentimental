// wait, don't we need to require the db?
var bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
var RateLimiter = require('limiter').RateLimiter;
var R = require('ramda');
var keys = require('./keys.js');


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
      headline: article.headline.main,
      snippet: article.snippet,
      leadParagraph: article.lead_paragraph
    });
});

// make a large query to a news API and insert all entries into the database
function ingestData (searchTerm, beginDate, endDate, sourceName, page) {
  bluebird.join(
    getWord({ word: searchTerm }),
    getSource({name: sourceName})
    ).then(ingestPages)
      .catch(function (err) {
          errorHandler(err);
        });

  function ingestPages (data) {
    var wordModel = data[0];
    var sourceModel = data[1];
    getResults (0);

    function getResults (page) {

      return request(constructURL(
        searchTerm, beginDate, endDate, sourceName, page
      )).then(function (results) {
        console.log(results[0].body);
        var res = JSON.parse(results[0].body).response;
        if (res.meta.hits > (res.meta.offset + 10)) {
          getResults(page + 1);
        }
        res.docs.forEach(makeArticle(sourceModel, wordModel));
      });

      // if (sourceName === 'New York Times'){
        // return request(constructURL(
        //   searchTerm, beginDate, endDate, sourceName, page
        // )).then(function (results) {
        //   console.log(results);
        //   var res = JSON.parse(results[0].body).response;
        //   if (res.meta.hits > (res.meta.offset + 10)) {
        //     getResults(page + 1);
        //   }
        //   res.docs.forEach(makeArticle(sourceModel, wordModel));
        // });    

        // Thought there was a shortcut for Guardian, but there may not be    
  
      // } else if (sourceName === "Guardian"){
      //   return request(constructURL(
      //     searchTerm, beginDate, endDate, sourceName, page
      //   )).then(function (results) {
      //     console.log ("results of first query:", results); 
      //     var res = JSON.parse(results[0].body).response;
      //     var pageCount = res.pages;
      //     console.log("This Guardian request has " + pageCount + " pages.");

      //     var res = JSON.parse(results[0].body).response;
      //     res.results.forEach(makeArticle(sourceModel, wordModel));
      //   });   
      // }

    }
  }
}

// a -> key || undefined -> a
function logger (item, key) {
    if(key !== undefined) {
      logger(item[key])
    } else if (item === null || item === undefined) {
      // console.log(item);
    }else if(
      item.constructor === Object ||
      item.constructor === Array) {
        // console.log(JSON.stringify(item));
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
  if (sourceName === "Guardian"){
    // Reformat dates for Guardian. They are "on or after" / "on or before" (as with NYT?)
    var fromDate = beginDate.substr(0, 4) + '-' + beginDate.substr(4, 2) + '-' + beginDate.substr(6, 2);
    var toDate   = endDate.substr(0, 4) + '-' + endDate.substr(4, 2) + '-' + endDate.substr(6, 2);
    console.log("begin date: ", fromDate);
    console.log("pinging url at: ",
          // Guardian 'q' may be broader than nyt 'headline'. We may need to find a way to sort by Guardian's 'relevance',
          // e.g. we could orderBy relevance, and then only grab the first 10% of pages, a rough approximation
    'http://content.guardianapis.com/search/q=\"' +   searchTerm +
          '\"&orderBy' + 'relevance' + 
          '&from_date=' + fromDate +
          '&to_date=' + endDate +
          '&page-size' + 10 +
          '&current_page=' + page +
          '&show-fields=headline,body' +
          '&api-key=' + keys.sourceAPIKeys.guardian);

            // Guardian 'q' may be broader than nyt 'headline'. We may need to find a way to sort by Guardian's 'relevance',
            // e.g. we could orderBy relevance, and then only grab the first 10% of pages, a rough approximation
    return 'http://content.guardianapis.com/search/q=\"' + encodeURIComponent(searchTerm) +
            '\"&orderBy=' + 'relevance' + 
            '&from_date=' + fromDate +
            '&to_date=' + endDate +
            '&page-size=' + 10 +
            '&current_page=' + page +
            '&show-fields=headline,body' +
            '&api-key=' + keys.sourceAPIKeys.guardian;
    
  } else if (sourceName === "New York Times") {
    return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=' + 
      'headline:\"' + searchTerm +
      '\"&begin_date=' + beginDate +
      '&end_date=' + endDate +
      '&page=' + page +
      '&api-key=' + keys.sourceAPIKeys.nyt;
  }
}


console.log('******************************** calling P_injest ********************************' );
ingestData('Hornblower', '20000001', '20150306', 'New York Times');


module.exports = ingestData;
