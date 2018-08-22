'use strict';
let models = require('../models');
let Item = models.item;

var exports = module.exports = {};

exports.dashboard = function (req, res) {
    return Item
        .all()
        .then(items => res.render('dashboard', {
            title: 'ghT Bar',
            username: req.user.username,
            items: items})
            .catch(error => res.status(400).send(error)));


};

exports.addItem = function(req, res) {

    res.render('addItem', { title: 'ghT Bar',
                            username: req.user.username,
                            error: req.flash('error')[0]});

};
