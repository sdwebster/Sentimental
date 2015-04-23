var StoryMenuView = Backbone.View.extend({
  
  tagName: 'div class="col-md-3"',

  initialize: function() {
    this.render();
  },

  template: _.template('<ul><li>BP + Deepwater Horizon</li><li class="lowlight">Diana\'s Death + The Royals</li><li class="lowlight">Jeb Bush + Bush Family Shadow</li><li class="lowlight">UK General Election</li></ul>'),

  render: function(){
    return this.$el.html(this.template());
  }
})