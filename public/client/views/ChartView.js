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

    setTimeout(this.drawLegend.bind(this), 500);

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