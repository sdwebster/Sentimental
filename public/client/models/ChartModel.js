var ChartModel = Backbone.Model.extend({ 
  
  makeQueryList: function(){
    var sources = this.sources;
    var colors = this.colors;
    var queryList = [];
    
    this.keywords.forEach(function(kw, i){
      sources.forEach(function(src, j){
        queryList.push({
          'keyword': kw,
          'source': src,
          'color': /* TODO: improve this */ colors[i % colors.length]});
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
    this.keywords = params.keywords; 
    this.sources = params.sources;  
    this.queryList = [];  
    this.colors = ['red', 'green', 'blue', 'orange'];
    this.makeQueryList();

    // Later there will be more here for the input field to add keywords,
    // or the dropdown to add new news sources to chart,
    // or whatever interface will require.
    // Alternatively, a larger PageModel could contain ChartModel as well as
    // input fields / dropdowns
  }
    //name  : ...
});