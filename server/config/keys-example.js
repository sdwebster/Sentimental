// to make yourself an authorized user in Mysql:

// $ mysql.server start
// $ mysql -uroot
// mysql> create database sentimentalDev;
// mysql> grant all on sentimentalDev.* to 'myNewUsername' identified by 'myNewPassword';
// mysql> flush privileges;

module.exports.mysqlUser = {
  username: 'myNewUsername',
  password: 'myNewPassword'
}

module.exports.sourceKeys = {
  // [news source name *exactly as it appears in database*]
  'New York Times': {
    // [keys]
    'password':
    'AOEUDHTNS'
  }
}