// Each DataLine corresponds to a particular keyword and source
// One chart may have several DataLines
var Queries = Backbone.Collection.extend({ 
  model: QueryModel,
  url: '/data' 
}); 