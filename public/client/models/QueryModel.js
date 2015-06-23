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

    var timeBucket = 'quarter';

    console.log('averaging data points by ' + timeBucket)
    
    var articles = this.get('responseData').map(function(obj){
      return _.pick(obj, 'published', 'sentiment', 'url', 'headline');
    });

    articles.forEach(function(article){
      var date = new Date(article['published']);
      article['displayDate'] = date.toDateString();
      var year = date.getFullYear();
      if (timeBucket === 'year'){
        article['timeBucket'] = year + "-07-01";
      } else if (timeBucket === 'quarter'){
        var month = (Math.floor(date.getMonth()/3)) * 3 + 1; 
        if (month.length === 1){
          month = '0' + month;
        }
        console.log('month:', month);
        article['timeBucket'] = year + '-' + month + '-' + '15';
      } else if (timeBucket === 'month'){
        var month = (date.getMonth() + 1) + '';
        if (month.length === 1){
          month = '0' + month;
        }
        console.log('month:', month);
        article['timeBucket'] = year + '-' + month + '-' + '15';
      }
      // date.getMonth();
      // article['year'] = year;
      // console.log('date:', date);
      article['date'] = date;
    });

    articles.forEach(function(article){
      var tBucket = article['timeBucket'];
      // var month = article['month'];
      var sentiment = article['sentiment'];
      // if (sentiment > maxSentiment){
      //   maxSentiment = sentiment;
      // } else if (sentiment < minSentiment){
      //   minSentiment = sentiment;
      // }
      if (!frequencyTally.hasOwnProperty(tBucket)){
        frequencyTally[tBucket] = 0;
        totalSentiment[tBucket] = 0;
      }
      frequencyTally[tBucket] = frequencyTally[tBucket] + 1;
      totalSentiment[tBucket] = totalSentiment[tBucket] + sentiment;

    });

    // put summary data into array format to graph it
    var summaryDataPoints = _.reduce(frequencyTally, function(memo, tally, tBucket){
      var dataPoint = {};
      dataPoint.count = tally;
      dataPoint.tBucket = tBucket;
      var midPeriodDate;
      // if (timeBucket === 'year'){
        midPeriodDate = new Date(tBucket);
      // } 
      dataPoint.date = new Date(Math.min(scope.endDate, midPeriodDate));
      dataPoint.sentiment = totalSentiment[ tBucket ] / tally;
      return memo.concat( [dataPoint] );
    }, [] );

    this.set('articles', articles);
    this.set('maxSentiment', maxSentiment);
    this.set('minSentiment', minSentiment);
    this.set('summaryDataPoints', summaryDataPoints);
  },


}); 