let authController = require('../controllers/authcontroller.js');
let itemController = require('../controllers/itemController.js');

module.exports = function(app, passport) {

    app.get('/signup', authController.signup);

    app.get('/signin', authController.signin);

    app.get('/', authController.signin);

    app.get('/dashboard', isLoggedIn, itemController.dashboard);

    app.get('/logout',authController.logout);

    app.post('/signup', passport.authenticate('local-signup', {

            successRedirect: '/dashboard',

            failureRedirect: '/signup',

            failureFlash: true
        }

    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/signin',

        failureFlash: true
    }));

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

    app.get('/addItemPage', itemController.addItemPage);

    app.post('/addItem', itemController.addItem);

    app.get('/deleteItem/:id', itemController.deleteItem);

    app.get('/users', itemController.showUsers);

    app.get('/deleteUser/:id', itemController.deleteUser);

    app.post('/searchItems', itemController.searchItems);

    app.post('/searchType', itemController.searchType);

    app.post('/searchCountry', itemController.searchCountry);

    app.post('/searchUser', itemController.searchUser);

    app.get('/orderAsc', itemController.orderAsc);

    app.get('/orderDesc', itemController.orderDesc);

};