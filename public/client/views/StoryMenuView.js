var StoryMenuView = Backbone.View.extend({
  
  tagName: 'div',

  initialize: function() {
    this.render();
  },

  template: _.template(''),

  render: function(){
    return this.$el.html(this.template());
  }
})