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



// router.post('/register', function (req, res) {
//    let email = req.body.email;
//    let username = req.body.username;
//    let password = req.body.password;
//    let rePassword = req.body.rePassword;
//
//     req.checkBody('email', "Email is not valid").isEmail();
//     req.checkBody('email', "Email field is required").notEmpty();
//     req.checkBody('username', 'Username field is required').notEmpty();
//     req.checkBody('password', 'Password field is required').notEmpty();
//     req.checkBody('rePassword', 'Passwords do not match').equals(req.body.password);
//
//
//    let errors = req.validationErrors();
//
//    if (errors) {
//        // res.render('register', {
//        //     message: req.flash(errors)
//        // });
//        console.log('Errors');
//        console.log(errors);
//    } else {
//        console.log('No errors');
//    }
//
//
// });

module.exports = router;
