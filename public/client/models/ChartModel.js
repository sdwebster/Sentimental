var ChartModel = Backbone.Model.extend({ 
  
  makeQueryList: function(){
    var sources = this.sources;
    var queryList = [];
    
    this.keywords.forEach(function(kw){
      sources.forEach(function(src){
        queryList.push({'keyword': kw, 'source': src});
      });
    });
    this.set('queries', new Queries (queryList));
  },

  react: function(){
    console.log('you clicked my view!');
  },

  initialize: function(params){
    this.keywords = params.keywords; 
    this.sources = params.sources;    
    this.makeQueryList();
    
    // Later there will be more here for the input field to add keywords,
    // or the dropdown to add new news sources to chart,
    // or whatever interface will require.
    // Alternatively, a larger PageModel could contain ChartModel as well as
    // input fields / dropdowns
  }
    //name  : ...
});