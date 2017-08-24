module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Generic column names for responses for up to 5 questions
        q1: {
            type: DataTypes.STRING
        },
        q2: {
            type: DataTypes.STRING
        },
        q3: {
            type: DataTypes.STRING
        },
        q4: {
            type: DataTypes.STRING
        },
        q5: {
            type: DataTypes.STRING
        }
    });

    User.associate = function(models) {
        // Associating a user with pets
        // There's no "onDelete" attribute because deleting a user should not delete pets
        User.hasMany(models.Pet);
    };

    return User;
};