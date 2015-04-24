// Holds one line's worth of data on a multi-line chart 
var QueryModel = Backbone.Model.extend({ 
  // url: '/data',

  // Technically the fetching of data from server should happen in here

  initialize: function(queryObj){
    this.startDate = queryObj.startDate;
    this.endDate = queryObj.endDate;
    this.source = queryObj.source;
    this.keyword = queryObj.keyword;

    console.log('the start is ', this.startDate);


    // declare some variables that will be used when
    // we handleResponseData below
    this.responseData = [];
    this.articles = [];
    this.frequencyCounts = {};
    this.totalSentiments = {};
    this.averages = {};
    this.maxSentiment = 0;
    this.minSentiment = 0;

    // figure out what url to ping
    // example url:
    // "/data?startDate=20101214&endDate=20150114&source=newyorktimes&keyword=BP",
    var startDateURLFormat = this.startDate.getFullYear() + '' +
      this.startDate.getMonth() + '' +
      this.startDate.getDate();
    var endDateURLFormat = this.endDate.getFullYear() + '' +
      this.endDate.getMonth() + '' +
      this.endDate.getDate();
    var sourceURLFormat = this.source.replace(/\s+/g, '').toLowerCase();
    var keywordURLFormat = this.keyword.replace(/\s+/g, '') //.toLowerCase();

    this.url =
      '/data?startDate=' + startDateURLFormat +
      '&endDate=' + endDateURLFormat +
      '&source=' + sourceURLFormat +
      '&keyword=' + keywordURLFormat; 
    console.log(this.url);
  },

  queryServer: function(){
    var scope = this;
    $.ajax({  
      url: scope.url
    })
    .done(function( newData  ) {
      console.log('receiving data: ', newData);
      scope.set({
        responseData: newData,
      });
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
    var sentiment = {};
    
    console.log(this.get('responseData').constructor);
    var articles = this.get('responseData').map(function(obj){
      return _.pick(obj, 'published', 'sentiment', 'url', 'headline');
    });

    // could vary this function if time period is not '1 year'
    // could use a more generic word like 'timeSpan' insted of 'year'
    articles.forEach(function(article){
      var date = new Date(article['published']);
      article['displayDate'] = date.toDateString();
      article['year'] = date.getFullYear();
      article['month'] = date.getMonth();
      // article['year'] = year;
      // console.log('date:', date);
      article['date'] = date;
    });

    articles.forEach(function(article){
      var year = article['year'];
      var month = article['month'];
      var sentiment = article['sentiment'];
      // if (sentiment > maxSentiment){
      //   maxSentiment = sentiment;
      // } else if (sentiment < minSentiment){
      //   minSentiment = sentiment;
      // }
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
      var midPeriodDate = new Date(year + "-07-01");
      dataPoint.date = new Date(Math.min(scope.endDate, midPeriodDate));
      dataPoint.sentiment = totalSentiment[ year ] / tally;
      return memo.concat( [dataPoint] );
    }, [] );

    this.set('articles', articles);
    this.set('maxSentiment', maxSentiment);
    this.set('minSentiment', minSentiment);
    this.set('summaryDataPoints', summaryDataPoints);
  },


}); 