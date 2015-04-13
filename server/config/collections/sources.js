var db = require('../dbConfig');
var Source = require('../models/sourceModel.js');

var Sources = new db.Collection();

Sources.model = Source;

module.exports = Sources;