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
    console.log('model has keyword', this.model.get('keyword'), ' and source', this.model.get('source'));
    this.parent = params.parentEl;
    this.lineGen = params.lineGen;
    // console.log('lineGen:', this.lineGen);  
  }, 
 
  events: {
    'click': function() {
      console.log('clicked me (im a QueryView)!');
      this.model.react();
    }
  },

  render: function() {
    this.svgPath = this.parent.append('svg:path');

    this.model.on('change:responseData', this.displayData, this);
    this.model.queryServer();
  },

  // handleResponseData: function() {

  // },

  displayData: function() {
    // console.log('time to display line for model: ', this.model);
    this.model.handleResponseData();
    this.svgPath.attr('d', this.lineGen(this.model.get('summaryDataPoints')))
      .attr('stroke', this.model.get('color'))
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  },

});