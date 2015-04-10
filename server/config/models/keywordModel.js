var db = require('../dbConfig.js');
var Article = require('./articleModel.js');

var Word = db.Model.extend({
  tableName: 'keywords',

  articles: function () {
    return this.belongsToMany(Article);
  }
});

module.exports = Word;
