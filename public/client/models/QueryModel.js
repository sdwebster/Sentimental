// Holds one line's worth of data on a multi-line chart 
var QueryModel = Backbone.Model.extend({ 
  // url: '/data',

  // Technically the fetching of data from server should happen in here

  initialize: function(queryObj){
    this.data = {};
    this.articles = {};
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
      url: "/data",
    })
    .done(function( newData  ) {
      scope.set({
        // data: newData,
        data: mockData
      });
    });
    return this;
  }
}); 