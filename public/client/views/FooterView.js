var FooterView = Backbone.View.extend({
  
  tagName: 'div',

  initialize: function() {
    this.render();
  },

  template: _.template('<nav class="navbar navbar-default navbar-fixed-bottom bottomNav"><div class="container"><div class="navbar-footer"></div><p class="navbar-text navbar-right">Created by Optimistic Botanists  © 2015</p></div></nav>'),

  render: function(){
    return this.$el.html(this.template());
  }
})