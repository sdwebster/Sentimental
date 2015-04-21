var TopNavView = Backbone.View.extend({
  
  tagName: 'div class=topNav',

  initialize: function() {
    this.render();
  },

  template: _.template('<nav class="navbar navbar-default navbar-fixed-top"><div class="container"><div class="navbar-header"><a class="navbar-brand" href="#">SENTIMENTAL</a></div><p class="navbar-text navbar-right"><a href="#" class="navbar-link">Sandbox</a></p><p class="navbar-text navbar-right"><a href="#" class="navbar-link">About Us</a></p><p class="navbar-text navbar-right"><a href="#" class="navbar-link">Stories</a></p></div></nav>'),

  render: function(){
    return this.$el.html(this.template());
  }
})