// Note: we may not even have a QueriesView, because it does
// not correspond to any particular DOM element
var QueriesView = Backbone.View.extend({

  // tagName: "table",

  initialize: function() {
    // this.collection.fetch();
    // this.render();
    // console.log('collection is:', this.collection);
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
