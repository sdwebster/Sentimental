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

    this.max = 0;
    this.min = 0;
    this.keyword = queryObj.keyword;
    this.source = queryObj.source;
  },

  react: function(){
    console.log('you clicked my view (im a QueryModel)!');
  },

  queryServer: function(){
    var scope = this;
    $.ajax({  
      // could easily make this depend on keyword, source
      url: "/data?startDate=20101214&endDate=20150114",
    })
    .done(function( newData  ) {
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

    var frequencyTally = {};
    var totalSentiments = {};
    var averageSentiments = {};
    console.log('freq counts:', frequencyTally);
    
    var articles = this.get('responseData').map(function(obj){
      return _.pick(obj, 'published', 'sentiment', 'url');
    });

    // could vary this function if time period is not '1 year'
    // could use a more generic word like 'timeSpan' insted of 'year'
    articles.forEach(function(article){
      // provisionally, convert dates manually
      var year = article['published'].substring(0, 4);
      article['year'] = year;
    });

    console.log('all the articles:', articles);
    articles.forEach(function(article){
      var year = article['year'];
      console.log('year:', year);
      if (!frequencyTally.hasOwnProperty(year)){
        frequencyTally[year] = 0;
      }
      // console.log('this year: ', year, frequencyTally[year]);
      frequencyTally[year] = frequencyTally[year] + 1;
      // console.log('this year: ', year, frequencyTally[year]);
    });
    console.log(frequencyTally);
    // console.log('final freq counts:', frequencyTally);
    //   scope.get('frequencyTally').set({year:
    //     scope.get('frequencyTally').get(year) + 1});
    // });
    // console.log(frequencyTally);
    // this.displayLine();
    
    // put the object in a slightly different format to graph it

    var frequencyDataPoints = _.reduce(frequencyTally, function(memo, tally, year){
      var dataPoint = {};
      dataPoint.count = tally;
      dataPoint.year = year;
      return memo.concat([dataPoint]);
    },[]);

    console.log('frequencyDataPoints', frequencyDataPoints);
    this.set('frequencyDataPoints', frequencyDataPoints);
  },


}); 