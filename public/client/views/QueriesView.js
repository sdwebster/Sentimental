// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
    this.colors = ['red', 'green', 'blue', 'orange'];
  },

  render: function(el, lineGen) {
    console.log('lineGen:', lineGen);
    var scope = this;
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        parentEl: el,
        lineGen: lineGen,
        color: scope.colors[i % scope.colors.length]
      }).render();
    });
    
    return this;
  }

});
