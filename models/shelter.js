module.exports = function(sequelize, DataTypes) {
    var Shelter = sequelize.define("Shelter", {
        shelter_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
        // Need to determine what variables from pet finder api to store
    });
             
    Shelter.associate = function(models) {
        // Associating a shelter with pets
        // When a shelter is deleted, also delete any associated pets--is that reasonable?
        Shelter.hasMany(models.Pet, {
            onDelete: "cascade"
        });
    };

    return Shelter;
};

