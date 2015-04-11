// Will render a single line onto a multi-line chart

// Something like:

    // vis.append('svg:path')
    // .attr('d', lineGen(data))
    // .attr('stroke', 'green')
    // .attr('stroke-width', 2)
    // .attr('fill', 'none');
// to produce

var QueryView = Backbone.View.extend({

  initialize: function(params) {
    this.color = params.color;
    this.model.on('change', this.displayLine, this);
    this.model.queryServer();
  }, 
 
  events: {
    'click': function() {
      console.log('clicked me (im a QueryView)!');
      this.model.react();
    }
  },

  displayLine: function() {
    console.log('time to display line for model: ', this.model);
    this.el.attr('d', this.lineGen(this.model.get('data')))
      .attr('stroke', this.color)
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  },


  render: function(parentEl, lineGen) {
    console.log('model has keyword', this.model.get('keyword'), ' and source', this.model.get('source'));
    // maybe this code should be under 'initialize'
    this.parent = parentEl;
    this.lineGen = lineGen;
    this.el = parentEl.append('svg:path');
    var el = this.el;
    // $.ajax({
    //   // could easily make this depend on keyword, source
    //   url: "/data",
    // })
    // .done(function( data3 ) {
    //   el.attr('d', lineGen(data3))
    //   .attr('stroke', 'red')
    //   .attr('stroke-width', 2)
    //   .attr('fill', 'none');
    // });
    // return this;
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