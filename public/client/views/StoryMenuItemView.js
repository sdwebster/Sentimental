var StoryMenuItemView = Backbone.View.extend({

  tagName: 'li',

  template: _.template('<%= title %>'),

  events: {
    'click': function() {
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});