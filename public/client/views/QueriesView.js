// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(el, lineGen, xMap, yMap) {
    // console.log('lineGen:', lineGen);
    var scope = this;
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        parentEl: el,
        lineGen: lineGen,
        xScale: xMap,
        yScale: yMap
      }).render();
    });
    return this;
  }

});
