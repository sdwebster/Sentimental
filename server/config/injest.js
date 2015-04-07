var http = require('http');

var searchTerm = 'BP';
var beginDate = '20000101';
var endDate = '20150406';
var page = 0;
var apiKey = '';

var nytEndpoint = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:\"' + searchTerm + '\"&begin_date=' + beginDate + '&end_date=' + endDate + '&page=' + page + '&api-key=' + apiKey;

console.log(nytEndpoint);

// Gets first page of results and check metadata for further pages

http.get(nytEndpoint, function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    var nytData = JSON.parse(body).response;
    console.log('Got response: ' + nytData);
    for(key in nytData.meta){
      console.log(key);
    }
  });

}).on('error', function(err){
  console.log("Got error: " + err);
});