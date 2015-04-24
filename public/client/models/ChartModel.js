var ChartModel = Backbone.Model.extend({ 

  defaults: {    
    START_YEAR: 2002,
    END_YEAR: 2011,
  },
  
  makeQueryList: function(){
    var sources = this.sources;
    var colors = this.colors;
    var queryList = [];
    var scope = this;
    
    this.keywords.forEach(function(kw, i){
      sources.forEach(function(src, j){
        queryList.push({
          'startDate': scope.startDate,
          'endDate': scope.endDate,
          'keyword': kw,
          'source': src,
          'color': /* TODO: improve this */ colors[i % colors.length]
        });
      });
    });
    this.queryList = queryList;
    this.set('queries', new Queries (queryList));
  },

  // currently working
  react: function(){
    console.log('you clicked my view!');
  },

  initialize: function(params){
    this.options = _.extend(this.defaults, params);
    this.startDate = new Date(this.options.START_YEAR + "-01-01");
    this.endDate = new Date(Math.min(new Date(), new Date(this.options.END_YEAR + "-12-31")));
    console.log('Showing data from', this.startDate, 'through', this.endDate);

    this.keywords = params.keywords; 
    this.sources = params.sources;  
    this.queryList = [];  
    this.colors = ['#00C599', '#FF001F', '#F4C900', '#A900D4'];
    this.makeQueryList();

    // Later there will be more here for the input field to add keywords,
    // or the dropdown to add new news sources to chart,
    // or whatever interface will require.
    // Alternatively, a larger PageModel could contain ChartModel as well as
    // input fields / dropdowns
  }
    //name  : ...
});