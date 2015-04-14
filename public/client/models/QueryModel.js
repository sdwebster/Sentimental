// Holds one line's worth of data on a multi-line chart 
var QueryModel = Backbone.Model.extend({ 
  // url: '/data',

  // Technically the fetching of data from server should happen in here

  initialize: function(queryObj){
    this.responseData = [];
    this.articles = [];
    this.frequencyCounts = {};
    this.totalSentiments = {};
    this.averages = {};

    this.maxSentiment = 0;
    this.minSentiment = 0;
    this.keyword = queryObj.keyword;
    this.source = queryObj.source;
    this.url =
      '/data?startDate=' + '20101214' +
      '&endDate=' + '20150114' +
      '&source=' + 'newyorktimes' +
      '&keyword=' + 'BP'; 
  },

  react: function(){
    console.log('you clicked my view (im a QueryModel)!');
  },

  queryServer: function(){
    var scope = this;
    $.ajax({  
      // could easily make this depend on keyword, source
      url: scope.url
      // url: "/data?startDate=20101214&endDate=20150114&source=newyorktimes&keyword=BP",
    })
    .done(function( newData  ) {
      console.log('receiving data: ', newData);
      scope.set({
        responseData: newData,

        // data: mockData[scope.keyword]
      });
      // console.log(newData);
      // console.log(scope.data);
    });
    return this;
  },

  handleResponseData: function(){
    // calculate frequency counts and averages
    var scope = this;
    var maxSentiment = 0;
    var minSentiment = 0;

    var frequencyTally = {};
    var totalSentiment = {};
    var averageSentiment = {};
    
    var articles = this.get('responseData').map(function(obj){
      return _.pick(obj, 'published', 'sentiment', 'url');
    });

    // could vary this function if time period is not '1 year'
    // could use a more generic word like 'timeSpan' insted of 'year'
    articles.forEach(function(article){
      // provisionally, convert date formats manually
      var year = article['published'].substring(0, 4);
      article['year'] = year;
    });

    articles.forEach(function(article){
      var year = article['year'];
      var sentiment = article['sentiment'];
      if (sentiment > maxSentiment){
        maxSentiment = sentiment;
      } else if (sentiment < minSentiment){
        minSentiment = sentiment;
      }
      if (!frequencyTally.hasOwnProperty(year)){
        frequencyTally[year] = 0;
        totalSentiment[year] = 0;
      }
      frequencyTally[year] = frequencyTally[year] + 1;
      totalSentiment[year] = totalSentiment[year] + sentiment;
    });

    // put summary data into array format to graph it
    var summaryDataPoints = _.reduce(frequencyTally, function(memo, tally, year){
      var dataPoint = {};
      dataPoint.count = tally;
      dataPoint.year = year;
      dataPoint.averageSentiment = totalSentiment[ year ] / tally;
      return memo.concat( [dataPoint] );
    }, [] );

    this.set('articles', articles);
    this.set('maxSentiment', maxSentiment);
    this.set('minSentiment', minSentiment);
    this.set('summaryDataPoints', summaryDataPoints);
  },


}); 