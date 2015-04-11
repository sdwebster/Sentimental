// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
    this.colors = ['red', 'green', 'blue', 'orange'];
  },

  render: function(el, lineGen) {
    var scope = this;
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({
        model: query,
        color: scope.colors[i % scope.colors.length]
      }).render(el, lineGen);
    });

    // this.el.append('svg:path')
    // .attr('d', lineGen(data))
    // .attr('stroke', 'green')
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');

    // this.el.append('svg:path')
    // .attr('d', lineGen(data2))
    // .attr('stroke', 'blue')
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');

    return this;
  }

});
