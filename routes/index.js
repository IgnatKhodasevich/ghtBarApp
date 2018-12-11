let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render('index', { title: 'GHT Bar' });
});
router.get('/signin', function(req, res, next) {
    res.render('index', { title: 'GHT Bar' });
});
/* GET users listing. */
router.get('/signup', function(req, res) {
    res.render('si', { title: 'GHT Bar' });
});

router.get('/login', function(req, res) {
    res.render('login', { title: 'GHT Bar' });
});

module.exports = router;
