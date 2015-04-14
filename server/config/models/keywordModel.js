var db = require('../dbConfig.js');
var Article = require('./articleModel.js');

var Word = db.Model.extend({
  tableName: 'keywords',

  articles: function () {
    return this.belongsToMany(Article);
  },

  initialize: function () {
    console.log('THIS: ' + JSON.stringify(this));
    this.fetch().then(function (data) {
      console.log('DATA: ' + data);
       if(data === undefined) {
        console.log('new!')
        this.save()
       }
    })
  }
  
});

module.exports = Word;
