'use strict';

var exports = module.exports = {};

exports.signup = function(req, res) {

    res.render('signup', { title: 'GHT Bar' });

};
exports.signin = function(req, res) {

    res.render('signin', { title: 'GHT Bar' });

};

exports.dashboard = function (req, res) {
    res.render('dashboard', { title: 'GHT Bar' } )
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');

    });

};

