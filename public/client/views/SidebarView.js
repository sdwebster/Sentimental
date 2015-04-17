var SidebarView = Backbone.View.extend({
  
  tagName: 'div id=sidebar',

  initialize: function() {
    this.render();
  },

  template: _.template('<h1>SENTIMENTAL</h1><ul><li>BP & Deepwater Horizon</li><li>Diana\'s Death & the Royals</li><li>Jeb Bush & his Family\'s Shadow</li><li>The UK General Election</li></ul>'),

  render: function(){
    return this.$el.html(this.template());
  }
})