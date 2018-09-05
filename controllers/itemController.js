'use strict';
let path = require('path');
let models = require('../models');
let Item = models.item;
let Type = models.type;
let User = models.user;
let Country = models.country;

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
    Type.all().then(function (types) {
        User.all().then(function (users) {
            Country.all().then(function (countries) {
                let data = {
                    types: types,
                    users: users,
                    countries: countries
                };
                res.render('addItemPage', {
                    title: 'ghT Bar',
                    username: req.user.username,
                    types: data.types,
                    users: data.users,
                    countries: data.countries,
                    error: req.flash('error')[0]
                })
            })
            }
        )
    }).catch(function (error) {
        res.status(400).send(error);
    });

};

exports.addItem = function (req, res) {
    Type.all().then(function (types) {
        User.all().then(function (users) {
                Country.all().then(function (countries) {
                    let data = {
                        types: types,
                        users: users,
                        countries: countries
                    };
                    let imageFile = req.files.image;
                    let fileName = req.body.name + '.png';
                    imageFile.mv(path.join(__dirname, '..', 'public/images/', fileName), function (err) {
                        if (err){
                            console.log(err.toString());
                        }
                            // return res.status(500).send(err);
                    });
                    let itemData = {
                        name: req.body.name,
                        type: req.body.type,
                        strength: req.body.strength,
                        userId: req.body.userId,
                        countryOrigin: req.body.countryOrigin,
                        image: fileName



                    };

                    Item.create(itemData).then(function (newItem) {
                        if (newItem) {
                            console.log(newItem.toString());
                            let success = 'The bottle ' + newItem.name + ' was created'
                        }


                    });
                    res.render('addItemPage', {
                        title: 'ghT Bar',
                        username: req.user.username,
                        types: data.types,
                        users: data.users,
                        countries: data.countries,
                        success: false,
                        error: req.flash('error')[0]
                    })
                })
            }
        )
    }).catch(function (error) {
        res.status(400).send(error);
    });
};
