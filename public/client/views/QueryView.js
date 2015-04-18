// Will render a single line onto a multi-line chart

var QueryView = Backbone.View.extend({

  initialize: function(params) {
    // console.dir(params);
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

    this.model.handleResponseData();
    
    this.svgPath.attr('d', this.lineGen(this.model.get('summaryDataPoints')))
      .attr('stroke', this.model.get('color'))
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .on("mouseover", function(d){
        d3.select(this).transition()
          .attr("stroke-width", 6)
          .style("opacity", .5);
      })
      .on("mouseout", function(d){
        d3.select(this).transition()
          .attr("stroke-width", 2)
          .style("opacity", 1);
      });

    this.displayDots();
  },

  displayDots: function() {

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 1);

    var dataPoint = this.parent.selectAll(".dot");
    var dataPoints = dataPoint.data(this.model.get('articles'));

    dataPoints.enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", this.xMap)
      .attr("cy", 900)
      .attr("opacity", .1)
      .style("fill", this.model.get('color'))
      .html(function(d){

      })
      .on("mouseover", function(d, i) {
        // Change the published date to a more pleasing format. 
        var date = new Date(d.published).toDateString();

        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        // Add in popup data for each rendered dot represeting an article.
        tooltip.html("<div>" + date + "</div><div>" + d.headline +"</div><div>" + d.sentiment + "</div>")
          .style("text-align", "left")
          .style("left", (d3.event.pageX + 5) + "px")
          .style("top", (d3.event.pageY - 28) + "px");

        d3.select(this).transition()
          .attr("r", 10)
          .style("opacity", .5); 


      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        d3.select(this).transition()
          .attr("r", 4)
          .style("opacity", .1);
        });

    dataPoints.transition().duration(2000).attr("cy", this.yMap)
  }

});