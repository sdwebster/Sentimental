// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(chartOptions) {
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        chartOptions: chartOptions
      }).render();
    });
    return this;
  }

});
