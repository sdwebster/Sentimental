// Will render a single line onto a multi-line chart

// Something like:

    // vis.append('svg:path')
    // .attr('d', lineGen(data))
    // .attr('stroke', 'green')
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');
// to produce

var DataLineView = Backbone.View.extend({

  tagName: 'svg:path',

  // template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),

  // events: {
  //   'click': function() {
  //     this.model.enqueue();
  //   }
  // },

  // render: function(){
  //   return this.$el.html(this.template(this.model.attributes));
  // }

});