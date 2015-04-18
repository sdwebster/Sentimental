// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(chartOptions) {
    // console.log('lineGen:', lineGen);
    var scope = this;
    // this.el = el;
    console.log('second chartOptions:', chartOptions);

    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        chartOptions: chartOptions
        // parentEl: el,
        // lineGen: lineGen,
        // xMap: xMap,
        // yMap: yMap,
        // startDate: startDate,
        // endDate: endDate 
      }).render();
    });
    return this;
  }

});
