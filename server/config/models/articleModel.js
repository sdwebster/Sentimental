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
    this.fetch().then(function (data) {
       if (data ===  null) {
        console.log('new!');
        this.save()
       }
    })
  }
  
});

module.exports = Article;



