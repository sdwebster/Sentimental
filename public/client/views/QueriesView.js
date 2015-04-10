var QueriesView = Backbone.View.extend({

  // tagName: "table",

  initialize: function() {
    this.collection.fetch();
    // this.render();
    console.log('collection is:', this.collection);
  },

  render: function(el) {
    // this.$el.children().detach();

    // return this.$el.html('<th>Library</th>').append(
    //   this.collection.map(function(song){
    //     return new LibraryEntryView({model: song}).render();
    //   })
    // );
    this.el = el;
    this.el.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    this.el.append('svg:path')
    .attr('d', lineGen(data2))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

    var vis = this.el;

    $.ajax({
      url: "/data",
    })
    .done(function( data3 ) {
      vis.append('svg:path')
      .attr('d', lineGen(data3))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
    });
  }

});
