var FooterView = Backbone.View.extend({
  
  tagName: 'div class="footer"',

  initialize: function() {
    this.render();
  },

  template: _.template('<nav class="navbar navbar-default navbar-fixed-bottom bottomNav"><div class="container"><div class="navbar-footer"></div><p class="navbar-text navbar-right">Created by <a href="https://github.com/OptiBots/"><strong>Optimistic Botanists</strong></a>  © 2015</p></div></nav>'),

  render: function(){
    return this.$el.html(this.template());
  }
})