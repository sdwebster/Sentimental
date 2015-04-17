// Will render a single line onto a multi-line chart

var QueryView = Backbone.View.extend({

  initialize: function(params) {
    console.dir(params);
    this.parent = params.parentEl;
    this.lineGen = params.lineGen;
    this.xMap = params.xMap;
    this.yMap = params.yMap;
  }, 
 
  render: function() {
    this.svgPath = this.parent.append('svg:path');

    this.model.on('change:responseData', this.displayData, this);
    this.model.queryServer();
  },

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

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1);

    console.log("Possible jQuery trans: ", this.parent.selectAll(".dot").transition);
    console.log("Possible D3 trans: ", tooltip.transition);
    var dataPoint = this.parent.selectAll(".dot");

    var dataPoints = dataPoint.data(this.model.get('articles'));

      dataPoints.enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", this.xMap)
      .attr("cy", 900)
      .attr("opacity", 0.1)
      .style("fill", this.model.get('color')) 
      .on("mouseover", function(d) {
        console.log(d);
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d["url"])
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        dataPoints.transition()
          .attr("r", 7);
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        dataPoints.transition()
          .attr("r", 3.5);
        });

      dataPoints.transition().duration(2000).attr("cy", this.yMap)
  }

});