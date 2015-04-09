var Chart = Backbone.Model.extend({ 

  initialize: function(params){
    this.set('dataLines', new DataLines ());
    // Later there will be more here for the input field to add keywords,
    // or the dropdown to add new news sources to chart,
    // or whatever interface will 
    // this.set('keyWordDropdown', new DataLines ());

    // this.get('songQueue').on('play', function(song){
  }
    //name  : ...
});