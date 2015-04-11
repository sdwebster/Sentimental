// Each query holds information given in response to a single
// query about one specific keyword-source pair
// A single chart may have several queries
var Queries = Backbone.Collection.extend({ 
  model: QueryModel,  
}); 