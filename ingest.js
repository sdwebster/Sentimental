var http = require('http');
var keys = require('./server/config/keys.js');

var searchTerm = 'Jeb Bush';
var beginDate = '20000101';
var endDate = '20150406';
var apiKey = keys.sourceApiKeys.nyt;
var articles = [];

var setEndpoint = function(page){
  return 'http://api.nytimes.com/svc/search/v2/articlesearch.json?sort=oldest&fq=headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + endDate + '&page=' + page + '&api-key=' + apiKey;
};

// Gets first page of results and check metadata for further pages

var getResultsPage = function(page, nextPage){
  var nytEndpoint = setEndpoint(page);
  http.get(nytEndpoint, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var nytData = JSON.parse(body).response;
      var pages = Math.floor(nytData.meta.hits / 10);
      
      nytData.docs.forEach(function(obj){
        articles.push(obj);
        console.log(articles.length + ' of ' + nytData.meta.hits + ' articles imported: ' + obj.headline.main + ', ' + obj.pub_date);
      });

      while (nextPage <= pages){
          getResultsPage(nextPage, ++nextPage);
      }

    });

    }).on('error', function(err){
      console.log('Got error: ' + err);
  });
};

getResultsPage(0, 1);
