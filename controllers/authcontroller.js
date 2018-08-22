'use strict';

var exports = module.exports = {};

exports.signup = function(req, res) {

    res.render('signup', { title: 'ghT Bar', error: req.flash('error')[0]});

};
exports.signin = function(req, res) {
    res.render('signin', { title: 'ghT Bar', error: req.flash('error')[0]});

};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');

    });

};