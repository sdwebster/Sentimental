var AppView = Backbone.View.extend({

  initialize: function(params){
    this.sidebarView = new SidebarView();
    this.headerView = new HeaderView();
  },

  render: function(){
    return this.$el.html([
      this.sidebarView.$el,
      this.headerView.$el
    ]);
  }

});