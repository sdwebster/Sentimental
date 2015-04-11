var ChartModel = Backbone.Model.extend({ 

  
  makeQueryList: function(){
    var sources = this.sources;
    var queryList = [];
    
    this.keywords.forEach(function(kw){
      sources.forEach(function(src){
        queryList.push({'keyword': kw, 'source': src})
      });
    });
    // console.log('now the queryList is:', queryList);
    this.set('queries', new Queries (queryList));
  },

  

  initialize: function(params){
    // console.log('params:', params);
    // this.keywords = [];
    // this.sources = [];
    // this.set('keywords', params.keywords);
    // this.set('sources', params.sources);
    this.keywords = params.keywords; 
    this.sources = params.sources; 
    // console.log('keywords:', this.keywords);
    // console.log('sources:', this.sources);
    
    this.makeQueryList();
    
    // Later there will be more here for the input field to add keywords,
    // or the dropdown to add new news sources to chart,
    // or whatever interface will 
    // this.set('keyWordDropdown', new DataLines ());

    // this.get('songQueue').on('play', function(song){
  }
    //name  : ...
});