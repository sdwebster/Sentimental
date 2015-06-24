// to make yourself an authorized user in Mysql:

// $ mysql.server start
// $ mysql -uroot
// mysql> create database sentimentalDev;
// mysql> grant all on sentimentalDev.* to 'myNewUsername' identified by 'myNewPassword';
// mysql> flush privileges;

module.exports.sourceAPIKeys = {
  'nyt': process.env.CUSTOMCONNSTR_NYT_API_KEY,
}

module.exports.indicoAPIKey = {
  key: process.env.CUSTOMCONNSTR_INDICO_API_KEY
}

module.exports.mysqlUser = {};
