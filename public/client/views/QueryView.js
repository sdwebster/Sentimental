// Will render a single line onto a multi-line chart

// Something like:

    // vis.append('svg:path')
    // .attr('d', lineGen(data))
    // .attr('stroke', 'green')
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');
// to produce

var QueryView = Backbone.View.extend({

  initialize: function() {
    // this.model.fetch();
    // this.render();

  },

  render: function(el) {
    console.log('model has keyword', this.model.get('keyword'), ' and source', this.model.get('source'));
    this.parent = el;
    $.ajax({
      url: "/data",
    })
    .done(function( data3 ) {
      el.append('svg:path')
      .attr('d', lineGen(data3))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    });
  }

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