var http = require('http');
var keys = require('./server/config/keys.js');

var searchTerm = 'BP';
var beginDate = '20000101';
var endDate = '20150406';
var apiKey = keys.sourceApiKeys.nyt;
var articles = [];
var nytEndpoint;

var setEndpoint = function(page){
  nytEndpoint = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + endDate + '&page=' + page + '&api-key=' + apiKey;
};

console.log('Before call' + nytEndpoint);

// Gets first page of results and check metadata for further pages

var getFirstPage = function(){
  setEndpoint(0);
  console.log('After call' + nytEndpoint);
  http.get(nytEndpoint, function(res) {
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
      console.log('chunked');
    });

    res.on('end', function() {
      var nytData = JSON.parse(body).response;
      console.log('Got response: ' + nytData);
      var pages = Math.floor(nytData.meta.hits / 10);
      console.log('Pages: ' + pages);
      nytData.docs.forEach(function(obj){
        articles.push(obj);
      });
      // if (pages > 0){
      //   // getAllPages(pages);
      // }
      // for(key in nytData.meta){
      //   console.log(key);
      // }
    });

    }).on('error', function(err){
      console.log('Got error: ' + err);
  });
};

// var getAllPages = function(pages){
//   http.get(nytEndpoint, function(res) {
//   var body = '';

//   res.on('data', function(chunk) {
//     body += chunk;
//   });

//   res.on('end', function() {
//     var nytData = JSON.parse(body).response;
//     console.log('Got response: ' + nytData);
//     var pages = Math.floor(nytData.meta.hits / 10);
//     console.log(pages);
//     nytData.docs.forEach(function(obj){
//       articles.push(obj);
//     });
//     if (pages > 0){
//       getAllPages(pages);
//     }
//     // for(key in nytData.meta){
//     //   console.log(key);
//     // }
//   });

//   }).on('error', function(err){
//     console.log('Got error: ' + err);
//   });
// };

getFirstPage();