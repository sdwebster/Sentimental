var keys = require('./keys.js');
var path = require('path');
var knex = require('knex').initialize({
  client: 'mysql',
  connection: process.env.CUSTOMCONNSTR_MYSQL_CONNURL || {
    host     : 'localhost',
    user     : keys.mysqlUser.username,
    password : keys.mysqlUser.password,
    database : 'sentimentalDev',
    charset  : 'utf8'
  }
});

var db = require('bookshelf')(knex);


db.knex.schema.hasTable('keywords').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('keywords', function (key) {
      key.increments('id').primary();
      key.string('word', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sources').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('sources', function (source) {
      source.increments('id').primary();
      source.string('name', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('articles').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('articles', function (article) {
      article.increments('id').primary();
      article.integer('source').unsigned().references('id').inTable('sources');
      article.integer('word').unsigned().references('id').inTable('keywords');
      article.date('published');
      article.string('url', 225);
      article.string('headline', 225);
      article.float('sentiment', 4, 4);
      article.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//we may not need this due to the way relations are set up in the models.
db.knex.schema.hasTable('keywordSources').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('keywordSources', function (wordSource) {
      wordSource.integer('source').unsigned().references('id').inTable('sources');
      wordSource.integer('words').unsigned().references('id').inTable('keywords');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
