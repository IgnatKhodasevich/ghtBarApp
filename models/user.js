module.exports = function(sequelize, Sequelize) {

    let User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.STRING
        },

        mail: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: true

        }

    });

    return User;

};