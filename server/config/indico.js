var indico = require('indico.io');
var keys = require('./keys.js');
var RateLimiter = require('limiter');

var Article = require('./models/articleModel.js');
var Articles = require('./collections/articles.js');

indico.apiKey = keys.indicoAPIKey.key;

function calcData(req, res){
	console.log('calcData run ', new Date());
	var fromDataBase= [];
	// Get the data from the database - initial search will be headlines.
	new Article()
	// Search only for values that have not yet been calculated.
		.query('whereNull', 'sentiment')
	  .fetchAll()
	  .then(function(articles) {
	    var temp = toIndico(articles, res);
	    console.log('Got to this point.');
	    // console.log(articles);
			// Send to indico for calculation
			// Indico.io batch requests allow you to process larger volumes of data more efficiently 
			// by grouping many examples into a single request. Simply call the batch method 
			// that corresponds to the API you'd like to use, and ensure your data is wrapped in an array. 
			indico
			  .batchSentiment(temp)
			  .then(function(sentiments){
					updateDataBase(sentiments, articles);
			  });
			  // .catch(function(err){
			  //   console.log('err: ', err);
			});






	  // }).catch(function(error) {
	  //   console.log(error);
	  // });


// Extract the Data from the object and place it into an array to send to indico.io
	function toIndico (value, res){
		// Use JSON to remove any functions returned with the query
		value = JSON.parse(JSON.stringify(value));

		var sentiment = [];
		value.map(function(value){
			sentiment.push(value.headline);
		});
		return sentiment;
	}

// Take the response from the array, for each row, insert into corresponding sentiment row.
	function updateDataBase (sentiment, articles){
		// Use JSON to remove any functions returned with the query
		var articles = JSON.parse(JSON.stringify(articles));
		articles.map(function(value, index){
			new Article({'id': value.id})
				.save({'sentiment':sentiment[index]});
		})
	}
}
module.exports = calcData;