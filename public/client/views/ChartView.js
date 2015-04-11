var ChartView = Backbone.View.extend({

  defaults: {    
    MARGIN: {top: 20, right: 20, bottom: 20, left: 50},
    WIDTH: 1000,
    HEIGHT: 200,
    XATTR: 'year',
    YATTR: 'sale'
  },

  events: {
    'click': function() {
      console.log('clicked me!');
      this.model.react();
    }
  },

  initialize: function(params){
    // TODO: listen for a change to datasets in this.model.collection
    // so that you can adjust min and max of the axis
    this.queriesView = new QueriesView({collection: this.model.get('queries')});
    this.options = _.extend(this.defaults, params);
  },

  render: function(){
    var 
    xScale = d3.scale.linear().range(
      [this.options.MARGIN.left, this.options.WIDTH - this.options.MARGIN.right]
      ).domain([2000,2010]),
    yScale = d3.scale.linear().range(
      [this.options.HEIGHT - this.options.MARGIN.top, this.options.MARGIN.bottom]
      ).domain([134,215]),

    xAxis = d3.svg.axis()
    .scale(xScale),
    yAxis = d3.svg.axis()
    .scale(yScale);

    this.svg = d3.select(this.el).append("svg")
    .attr('height', this.options.HEIGHT)
    .attr('width', this.options.WIDTH);

    this.svg.append("svg:g")
    .attr("transform", "translate(0," + (this.options.HEIGHT - this.options.MARGIN.bottom) + ")")
    .attr('class', 'axis')
    .call(xAxis);

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    this.svg.append("svg:g")
    .attr("transform", "translate(" + (this.options.MARGIN.left) + ",0)")
    .attr('class', 'axis')
    .call(yAxis);

    var xAttr = this.options.XATTR;
    var yAttr = this.options.YATTR;

    // TODO: add axis labels


    var lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d[xAttr]);
    })
    .y(function(d) {
      return yScale(d[yAttr]);
    })
    .interpolate("basis");

    this.queriesView.render(this.svg, lineGen);

    this.drawLegend();

    return this;
  },

  drawLegend: function(){
    var legendRectSize = 18;
    var legendSpacing = 4;
    var legend = this.svg.selectAll('.legend')
      .data(['red'])
      .enter()
      .append('g')
      // .attr('class', 'legend')
      .attr('transform', function(d, i) {
        // var height = legendRectSize + legendSpacing;
        // var offset =  height * color.domain().length / 2;
        var height = 100;
        var offset = 0;
        // var horz = -2 * legendRectSize;
        var horz = 100;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', 'red')
      .style('stroke', 'black');

    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function(d) { return d /*.toUpperCase()*/; });




    // this.legend = this.el.append()

    // // /**********/
    // d3.legend = function(g) {
    //   g.each(function() {
    //     var g= d3.select(this),
    //         items = {},
    //         svg = d3.select(g.property("nearestViewportElement")),
    //         legendPadding = g.attr("data-style-padding") || 5,
    //         lb = g.selectAll(".legend-box").data([true]),
    //         li = g.selectAll(".legend-items").data([true])

    //     lb.enter().append("rect").classed("legend-box",true)
    //     li.enter().append("g").classed("legend-items",true)

    //     svg.selectAll("[data-legend]").each(function() {
    //         var self = d3.select(this)
    //         items[self.attr("data-legend")] = {
    //           pos : self.attr("data-legend-pos") || this.getBBox().y,
    //           color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
    //         }
    //       })

    //     items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

        
    //     li.selectAll("text")
    //         .data(items,function(d) { return d.key})
    //         .call(function(d) { d.enter().append("text")})
    //         .call(function(d) { d.exit().remove()})
    //         .attr("y",function(d,i) { return i+"em"})
    //         .attr("x","1em")
    //         .text(function(d) { ;return d.key})
        
    //     li.selectAll("circle")
    //         .data(items,function(d) { return d.key})
    //         .call(function(d) { d.enter().append("circle")})
    //         .call(function(d) { d.exit().remove()})
    //         .attr("cy",function(d,i) { return i-0.25+"em"})
    //         .attr("cx",0)
    //         .attr("r","0.4em")
    //         .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
        
    //     // Reposition and resize the box
    //     var lbbox = li[0][0].getBBox()  
    //     lb.attr("x",(lbbox.x-legendPadding))
    //         .attr("y",(lbbox.y-legendPadding))
    //         .attr("height",(lbbox.height+2*legendPadding))
    //         .attr("width",(lbbox.width+2*legendPadding))
    //   })
    //   return g
    // }

    // /*********/
    // legend = this.svg.append("g")
    //   .attr("class","legend")
    //   .attr("transform","translate(50,30)")
    //   .style("font-size","12px")
    //   .call(d3.legend);

    // setTimeout(function() { 
    //   legend
    //     .style("font-size","20px")
    //     .attr("data-style-padding",10)
    //     .call(d3.legend)
    // },1000);
  }

});