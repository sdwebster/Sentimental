// routes to correct "keys" file, depending on whether we are in probuction or development environment. When cloning, you need to check the environmental variable names in keysDeploy.js, and create a copy of keysDeploy.js .....

// to make yourself an authorized user in Mysql:

// $ mysql.server start
// $ mysql -uroot
// mysql> create database sentimentalDev;
// mysql> grant all on sentimentalDev.* to 'myNewUsername' identified by 'myNewPassword;
// mysql> flush privileges;

if (process.env.CUSTOMCONNSTR_MYSQL_CONNURL){
  var keysDeploy = require('./keysDeploy.js')
  module.exports = keysDeploy;
} else {
  var keysDevelop = require('./keysDevelop.js')
  module.exports = keysDevelop;
}