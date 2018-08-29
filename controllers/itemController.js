'use strict';
let models = require('../models');
let Item = models.item;
let Type = models.type;

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

exports.addItemPage = function(req, res) {
    let data = [];
    Type
        .all()
        .then(
        types => data.push(types))
        .catch(error => res.status(400).send(error));

    res.render('addItemPage', {
        title: 'ghT Bar',
        username: req.user.username,
        types: data[0],
        error: req.flash('error')[0]
    })
};

exports.addItem = function (req, res) {
    let data = {
        name: req.body.name,
        type: req.body.type,
        strength: req.body.strength,
        userId: req.body.userId,
        countryOrigin: req.body.countryOrigin,




    };

    return Item.create()
};
