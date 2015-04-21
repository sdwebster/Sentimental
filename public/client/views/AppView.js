var AppView = Backbone.View.extend({
  
  initialize: function(params){
    this.topNavView = new TopNavView();
    this.headerView = new HeaderView();
    this.chartView = new ChartView({model: this.model.get('chart')});
  },

  render: function(){
    return this.$el.html([
      this.topNavView.$el,
      this.headerView.$el,
      this.chartView.$el
    ]);
  }

});