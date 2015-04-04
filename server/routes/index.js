var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('../../client/app/index.html', function(req, res, next){
    res.end(200);
  });
});

module.exports = router;
