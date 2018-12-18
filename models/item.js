module.exports = function(sequelize, Sequelize) {
    let Item = sequelize.define('item', {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },

    name: {
        type: Sequelize.STRING
    },

    strength: {
        type: Sequelize.FLOAT
    },

    type: {
        type: Sequelize.STRING
    },

    countryOrigin: {
        type: Sequelize.STRING
    },

    image: {
        type: Sequelize.STRING
    },

    notes: {
        type: Sequelize.STRING
    },

    user: {
        type: Sequelize.STRING
    },

    code_iso: {
        type: Sequelize.STRING
    }
});
    return Item;
};