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
    this.xMap = params.xMap;
    this.yMap = params.yMap;

    // console.log('lineGen:', this.lineGen);  
  }, 
 
  // currently unable to register these clicks
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
    console.log(this.model.get('summaryDataPoints'));
    this.model.handleResponseData();
    console.log('bp data: ', this.model.get('summaryDataPoints'));
    this.svgPath.attr('d', this.lineGen(this.model.get('summaryDataPoints')))
      .attr('stroke', this.model.get('color'))
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    this.displayDots();
  },

  displayDots: function() {

     this.parent.selectAll(".dot")
        .data(this.model.get('articles'))
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", this.xMap)
        .attr("cy", this.yMap)
        .style("fill", this.model.get('color')) 
        // .on("mouseover", function(d) {
        //     tooltip.transition()
        //          .duration(200)
        //          .style("opacity", .9);
        //     tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
        //     + ", " + yValue(d) + ")")
        //          .style("left", (d3.event.pageX + 5) + "px")
        //          .style("top", (d3.event.pageY - 28) + "px");
        // })
        // .on("mouseout", function(d) {
        //     tooltip.transition()
        //          .duration(500)
        //          .style("opacity", 0);
        // })
        ;
  }

});