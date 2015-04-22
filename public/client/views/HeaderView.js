var HeaderView = Backbone.View.extend({
  
  tagName: 'div class=header',

  initialize: function() {
    this.render();
  },

  template: _.template('<h1>BP\'s fall from grace?</h1><p>On April 20, 2010, a British Petroleum (BP) offshore oil rig exploded, killing 11 workers on the rig and spilling tens of thousands of barrels of crude oil into the Gulf of Mexico. BP’s Deepwater Horizon oil well, located 5,000 feet below the ocean’s surface, leaked 5 million barrels (205.8 million gallons) of crude oil into Gulf Coast, with devastating consequences for Gulf Coast communities and the fragile wetlands, bayous, and coastal waters on which they depend. </p>'),

  render: function(){
    return this.$el.html(this.template());
  }
})