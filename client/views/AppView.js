var /*SomeName*/ = Backbone.View.extend({

  tagName: "li",

  className: "document-row",

  template: _.template(/*html in here, look at underscore _.template for more info*/);
  
  events: {
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    
  }

});