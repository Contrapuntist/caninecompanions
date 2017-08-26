module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        firstName: {
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        dogSex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogAge: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogHome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogHair: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dogEnergy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        // Associating a user with a recommended breed (based on user responses to survey questions)
        User.belongsTo(models.Breed, {
            foreignKey: {
                allowNull: false
            }
        });   
    };

    return User;
};