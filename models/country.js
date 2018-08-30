module.exports = function(sequelize, Sequelize) {
    let Country = sequelize.define('country', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        code_iso: {
            type: Sequelize.STRING
        },

        name: {
            type: Sequelize.STRING
        }



    });
    return Country;
};