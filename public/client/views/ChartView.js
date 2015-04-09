var ChartView = Backbone.View.extend({

  // tagName: "svg",

  initialize: function(params){
    this.dataLinesView = new DataLinesView({model: this.model.get('dataLines')});
  },

  render: function(){
    console.log('rendering chart');
    this.svg = d3.select(this.el).append("svg");
    var WIDTH = 1000,
    HEIGHT = 200,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000,2010]),
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134,215]),
    xAxis = d3.svg.axis()
    .scale(xScale),

    yAxis = d3.svg.axis()
    .scale(yScale);

    console.log('this.svg:', this.svg);
    // this.svg.append("svg:g")
    // .call(xAxis);
    this.svg.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .attr('class', 'axis')
    .call(xAxis);

    console.log('this.svg:', this.svg);

    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    this.svg.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .attr('class', 'axis')
    .call(yAxis);

    var lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.sale);
    })
    .interpolate("basis");

    this.svg.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    this.svg.append('svg:path')
    .attr('d', lineGen(data2))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    return this;
    // return this.$el.html(

    // //   [
    // //   this.playerView.$el,
    // //   this.libraryView.$el,
    // //   this.songQueueView.$el
    // // ]
    // );
  }

});