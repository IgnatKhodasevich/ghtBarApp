module.exports = function(sequelize, Sequelize) {
    let Type = sequelize.define('type', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        type: {
            type: Sequelize.STRING
        },



    });
    return Type;
};