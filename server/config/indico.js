var indico = require('indico.io');
// var keys = require('./keys.js');
var RateLimiter = require('limiter');
var db = require('./dbConfig.js');

var Article = require('./models/articleModel.js');
var Articles = require('./collections/articles.js');

indico.apiKey = (process.env.CUSTOMCONNSTR_INDICO_API_KEY/* || keys.indicoAPIKey.key*/);

function calcData(req, res){
	console.log('calcData run ', new Date());
	var fromDataBase= [];
	// Get the data from the database - initial search will be headlines.

	new Article()
	// Search only for values that have not yet been calculated.
		.query('whereNotNull', 'headline')
		.query('whereNull', 'sentiment')
	  .fetchAll()
	  .then(function(articles) {
	    var temp = toIndico(articles, res);
			// Send to indico for calculation
			// Indico.io batch requests allow you to process larger volumes of data more efficiently 
			// by grouping many examples into a single request. Simply call the batch method 
			// that corresponds to the API you'd like to use, and ensure your data is wrapped in an array. 
			
			indico
			  .batchSentiment(temp)
			  .then(function(sentiments){
					updateDataBase(sentiments, articles);
			  })
			  .catch(function(err){
			    console.log('err: ', err);
			});

	  }).catch(function(error) {
	    console.log(error);
	  });

	db.knex
		.raw('delete from articles where headline is null')
		.then( function (value){
			console.log('Null Rows should be deleted');
		});
}


// Extract the Data from the object and place it into an array to send to indico.io
	function toIndico (value, res){
		// Use JSON to remove any functions returned with the query
		value = JSON.parse(JSON.stringify(value));

		var sentiment = [];
		value.map(function(value){
			// console.log('value: ', value.headline, ' is a ', typeof value.headline);
			sentiment.push(value.headline);
			console.log(sentiment);
		});
		return sentiment;
	}

// Take the response from the array, for each row, insert into corresponding sentiment row.
	function updateDataBase (sentiment, articles){
		// Use JSON to remove any functions returned with the query
		var articles = JSON.parse(JSON.stringify(articles));
		articles.map(function(value, index){
			new Article({'id': value.id})
				.save({'sentiment':logger(sentiment[index])});
		});
	}
	
function logger (val) {
	// console.log(val);
	return val;
}
module.exports = calcData;