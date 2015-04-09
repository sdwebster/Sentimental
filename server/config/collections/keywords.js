var db = require('./dbConfig');
var Keyword = require('../models/keywordModel.js');

var Keywords = new db.Collection();

Keywords.model = Keyword;

module.exports = Users;
