module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        }, 
        email: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
                isEmail: true,
            }
        }
    });
    return Users;
};