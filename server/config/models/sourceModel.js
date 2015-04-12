var db = require('../dbConfig.js');
var Article = require('./articleModel.js');

var Source = db.Model.extend({
  tableName: 'sources',

  articles: function () {
    return this.hasMany(Article);
  },

  initialize: function () {
    if (this.isNew()) {
      this.save()
    }
  }
});

module.exports = Source;
