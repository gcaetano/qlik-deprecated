var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf()
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bridge/index', { title: 'QlikT' });
});

module.exports = router;
