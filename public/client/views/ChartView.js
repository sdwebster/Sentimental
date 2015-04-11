var ChartView = Backbone.View.extend({

  defaults: {    
    MARGIN: {top: 20, right: 20, bottom: 20, left: 50},
    WIDTH: 1000,
    HEIGHT: 200
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

    var lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.sale);
    })
    .interpolate("basis");

    this.queriesView.render(this.svg, lineGen);


    return this;
  }

});