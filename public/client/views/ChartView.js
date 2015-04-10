var ChartView = Backbone.View.extend({

  // tagName: "svg",

  defaults: {
    xAttr: "x",
    yAttr: "y",
    margin: {top: 20, right: 20, bottom: 20, left: 50},
  },

  initialize: function(params){
    console.log('params:', params);
    this.queriesView = new QueriesView({collection: this.model.get('queries')});
    this.options = _.extend(this.defaults, params);
    // console.log('options:', this.options);
  },

  render: function(){
    var WIDTH = 1000,
    HEIGHT = 200,
    xScale = d3.scale.linear().range([this.options.margin.left, WIDTH - this.options.margin.right]).domain([2000,2010]),
    yScale = d3.scale.linear().range([HEIGHT - this.options.margin.top, this.options.margin.bottom]).domain([134,215]),
    xAxis = d3.svg.axis()
    .scale(xScale),

    yAxis = d3.svg.axis()
    .scale(yScale);

    this.svg = d3.select(this.el).append("svg")
    .attr('height', HEIGHT)
    .attr('width', WIDTH);

    // this.svg.append("svg:g")
    // .call(xAxis);
    this.svg.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - this.options.margin.bottom) + ")")
    .attr('class', 'axis')
    .call(xAxis);


    yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    this.svg.append("svg:g")
    .attr("transform", "translate(" + (this.options.margin.left) + ",0)")
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

    this.queriesView.render(this.svg);

    return this;
  }

});