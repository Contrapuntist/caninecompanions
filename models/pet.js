module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        pet_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
        // Need to determine what variables from pet finder api to store
    });

    Pet.associate = function(models) {
        // allowNull is set to false, which assumes a dog will always belong to a shelter
        // is that a reasonable assumption? 
        Pet.belongsTo(models.Shelter, {
            foreignKey: {
                allowNull: false
            }
        });

        // A pet belongs to a user only if the user has saved the pet
        // If no users have saved the pet, the foreign key would be null, which is OK
        // How does this work if multiple users save the same pet? Are multiple foreign keys stored in the same cell?
        Pet.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Pet;
};
  