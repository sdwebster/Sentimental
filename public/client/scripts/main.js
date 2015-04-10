/*global require*/
'use strict';

// require.config({
//     shim: {
//         bootstrap: {
//             deps: ['jquery'],
//             exports: 'jquery'
//         }
//     },
//     paths: {
//         jquery: '../bower_components/jquery/dist/jquery',
//         backbone: '../bower_components/backbone/backbone',
//         underscore: '../bower_components/lodash/dist/lodash',
//         bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
//     }
// });

// require([
//     'backbone'
// ], function (Backbone) {
//     Backbone.history.start();
// });

/***********/
console.log('running main');

var data = [{
    "sale": "202",
    "year": "2000"
}, {
    "sale": "215",
    "year": "2001"
}, {
    "sale": "179",
    "year": "2002"
}, {
    "sale": "199",
    "year": "2003"
}, {
    "sale": "134",
    "year": "2005"
}, {
    "sale": "176",
    "year": "2010"
}];

var data2 = [{
"sale": "152",
"year": "2000"
}, {
    "sale": "189",
    "year": "2002"
}, {
    "sale": "179",
    "year": "2004"
}, {
    "sale": "199",
    "year": "2006"
}, {
    "sale": "134",
    "year": "2008"
}, {
    "sale": "176",
    "year": "2010"
}];

// var data3 = getData();

var vis = d3.select("#visualisation"),
WIDTH = 1000,
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

// vis.append("svg:g")
// .call(xAxis);
vis.append("svg:g")
.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
.attr('class', 'axis')
.call(xAxis);

yAxis = d3.svg.axis()
.scale(yScale)
.orient("left");
vis.append("svg:g")
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

vis.append('svg:path')
.attr('d', lineGen(data))
.attr('stroke', 'green')
.attr('stroke-width', 2)
.attr('fill', 'none');

vis.append('svg:path')
.attr('d', lineGen(data2))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');

// vis.append('svg:path')
// .attr('d', lineGen(getData()))
// .attr('stroke', 'blue')
// .attr('stroke-width', 2)
// .attr('fill', 'none');
