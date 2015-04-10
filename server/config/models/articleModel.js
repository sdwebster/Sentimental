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

});

module.exports = Article;



