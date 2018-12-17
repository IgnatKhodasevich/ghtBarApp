"use strict";

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let env = process.env.NODE_ENV || "production";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};
let UserModel = require(__dirname + '/user');
let ItemModel = require(__dirname + '/item');
let TypeModel = require(__dirname + '/type');
let CountryModel = require(__dirname + '/country');


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, Sequelize);
const Item = ItemModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);
const Country = CountryModel(sequelize, Sequelize);


module.exports = db;