// to make yourself an authorized user in Mysql:

// $ mysql.server start
// $ mysql -uroot
// mysql> create database sentimentalDev
// mysql> grant all on sentimentalDev.* to 'myNewUsername' identified by 'myNewPassword';

module.exports.mysqlUser = {
  username: 'myNewUsername',
  password: 'myNewPassword'
}