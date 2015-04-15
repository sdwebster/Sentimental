var db = require('../dbConfig.js');
var Article = require('./articleModel.js');

var Source = db.Model.extend({
  tableName: 'sources',

  articles: function () {
    return this.hasMany(Article);
  },

  initialize: function () {
    this.fetch().then(function (data) {
       if(data === null) {
        console.log('new!')
        this.save()
       }
    })
  }
});

module.exports = Source;
