var db = require('../dbConfig.js');
var Article = require('./articleModel.js');

var Word = db.Model.extend({
  tableName: 'keywords',

  articles: function () {
    return this.belongsToMany(Article);
  },

  initialize: function () {
    this.fetch().then(function (data) {
      console.log('DATA: ' + JSON.stringify(data));
       if(data === undefined) {
        console.log('new!')
        this.save()
       }
    })
  }
  
});

module.exports = Word;
