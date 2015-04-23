var ChartView = Backbone.View.extend({

  defaults: {    
    MARGIN: {top: 20, right: 20, bottom: 25, left: 50},
    WIDTH: 960,
    HEIGHT: 400,
    START_YEAR: 2000,
    END_YEAR: 2015,
    XATTR: 'date',
    // can choose between 'count' and 'averageSentiment'
    YATTR: 'sentiment'
  },

  // currently working
  events: {
    'click': function() {
      console.log('clicked me!');
      this.model.react();
    }
  },

  initialize: function(params){
    // TODO: listen for a change to datasets in this.model.collection
    // so that you can adjust min and max of the axis
    this.options = _.extend(this.defaults, params);
    this.queriesView = new QueriesView({collection: this.model.get('queries')});
    this.render();
  },

  render: function(){
    var 
    xScale = d3.time.scale()
        .range(
        [this.options.MARGIN.left, this.options.WIDTH - this.options.MARGIN.right]
      )
    .domain([this.model.startDate, this.model.endDate])
    .rangeRound(
        [this.options.MARGIN.left, this.options.WIDTH - this.options.MARGIN.right]
      )
    ,

    yScale = d3.scale.linear().range(
      [this.options.HEIGHT - this.options.MARGIN.top, this.options.MARGIN.bottom]

      ).domain([0.0, 1.0]),

    xAttr = this.options.XATTR,
    yAttr = this.options.YATTR,

    xMap = function(d) { return xScale(d[xAttr]);}, // data -> display
    yMap = function(d) { return yScale(d[yAttr]);}, // data -> display

    xAxis = d3.svg.axis()
    .scale(xScale),
    yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    this.svg = d3.select(this.el).append("svg")
    .attr('height', this.options.HEIGHT)
    .attr('width', this.options.WIDTH);

    this.svg.append("svg:g")
        .attr("transform", "translate(0," + (this.options.HEIGHT - this.options.MARGIN.bottom) + ")")
        .attr('class', 'axis')
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .style("text-anchor", "end")
        .attr("x", 100)
        .attr("y", -6)
        .text("Time");

    this.svg.append("svg:g")
        .attr("transform", "translate(" + (this.options.MARGIN.left) + ",0)")
        .attr('class', 'axis')
        .call(yAxis)
      .append('text')
        .attr("class", "label")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .text("Sentiment");

    // TODO: add axis labels

    var lineGen = d3.svg.line()
      .x(xMap)
      .y(yMap)
      .interpolate("basis");

    // TODO: make this depend on timeframe

    var chartOptions = {
      parentEl: this.svg,
      lineGen: lineGen,
      xMap: xMap,
      yMap: yMap,
      // startDate: this.startDate,
      // endDate: this.endDate 
    };

    this.queriesView.render(
      chartOptions
    );

    this.drawLegend();

    return this;
  },

  drawLegend: function(){
    var queryList = this.model.queryList;

    var legendRectSize = 18;
    var legendSpacing = 4;
    var legend = this.svg.selectAll('.legend')
      .data(queryList)
      .enter()
      .append('g')
      // .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * queryList.length / 2;
        var height = 100;
        // var offset = 0;
        // var horz = -2 * legendRectSize;
        var horz = 100;
        var vert = 50;
        return 'translate(' + horz + ',' + vert + ')';
      });

    queryList.forEach(function(q, i){
      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('y', 50 * i)
        .style('fill', q.color)
        .style('stroke', 'black');

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', 50 * i)
        .text(function(d) { return '"' + q.keyword + '" in ' + q.source; });
      }
    );
  }
});