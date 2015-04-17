// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(el, lineGen, xMap, yMap, startDate, endDate) {
    // console.log('lineGen:', lineGen);
    var scope = this;
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        parentEl: el,
        lineGen: lineGen,
        xMap: xMap,
        yMap: yMap,
        startDate: startDate,
        endDate: endDate 
      }).render();
    });
    return this;
  }

});
