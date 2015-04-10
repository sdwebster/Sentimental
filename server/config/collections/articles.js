var db = require('../dbConfig');
var Article = require('../models/articleModel.js');

var Articles = new db.Collection();

Articles.model = Article;

module.exports = Articles;
