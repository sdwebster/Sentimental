// Note:
// this QueriesView does not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  initialize: function() {
  },

  render: function(el) {
    this.el = el;
    this.collection.each(function(query, i){
      new QueryView({ model: query}).render(el);
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
