var AppView = Backbone.View.extend({
  
  initialize: function(params){
    this.sidebarView = new SidebarView();
    this.headerView = new HeaderView();
    this.chartView = new ChartView({model: this.model.get('chart')});
  },

  render: function(){
    return this.$el.html([
      this.sidebarView.$el,
      this.headerView.$el,
      this.chartView.$el
    ]);
  }

});