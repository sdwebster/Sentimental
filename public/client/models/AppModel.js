var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('sidebar', new SidebarModel());
  }
});