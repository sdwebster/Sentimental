var db = require('../dbConfig.js');
var Source = require('./sourceModel.js');
var Keyword = require('./keywordModel.js');

var Article = db.Model.extend({
  tableName: 'articles',
  
  //  Setup relationship between tables
  sources: function () { 
  	return this.belongsTo(Source)
  },
  
  keywords: function () {
  	return this.hasOne(Keyword)
  },

  initialize: function () {
    if (this.isNew()) {
      this.save()
    }
  }
  
});

module.exports = Article;



