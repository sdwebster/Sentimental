var SubBarView = Backbone.View.extend({
  
  tagName: 'div class=row',

  initialize: function() {
    this.storyMenuView = new StoryMenuView();
    this.headerView = new HeaderView();
    this.render();
  },

  render: function(){
    return this.$el.html([
      this.storyMenuView.$el,
      this.headerView.$el,
    ]);
  }
});