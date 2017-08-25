// Creating the breed lookup table:  This table identifies all user dog preference combinations in 
// the survey and links each combination to a recommended breed.

module.exports = function(sequelize, DataTypes) {
    var Breed = sequelize.define("Breed", {
        breedId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        breedName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Breed.associate = function(models) {
        Breed.hasMany(models.User);
    };

    //Inserting rows into breeds table
    // Breed.create({ breedId: "smallhomelightcalm", breedName: "Chihuahua" });
    // Breed.create({ breedId: "smallhomeanycalm", breedName: "Pug" });
    // Breed.create({ breedId: "smallhomelighthighenergy", breedName: "Beagle" });
    // Breed.create({ breedId: "smallhomeanyhighenergy", breedName: "Jack Russell Terrier" });
    // Breed.create({ breedId: "smallapartmentlightcalm", breedName: "Shih Tzu" });
    // Breed.create({ breedId: "smallapartmentanycalm", breedName: "Dachshund" });
    // Breed.create({ breedId: "smallapartmentlighthighenergy", breedName: "Poodle" });
    // Breed.create({ breedId: "smallapartmentanyhighenergy", breedName: "Corgi" });
    // Breed.create({ breedId: "mediumhomelightcalm", breedName: "Chow Chow" });
    // Breed.create({ breedId: "mediumhomeanycalm", breedName: "Hound" });
    // Breed.create({ breedId: "mediumhomelighthighenergy", breedName: "Pit Bull" });
    // Breed.create({ breedId: "mediumhomeanyhighenergy", breedName: "Labrador Retriever" });
    // Breed.create({ breedId: "mediumapartmentlightcalm", breedName: "Bulldog" });
    // Breed.create({ breedId: "mediumapartmentanycalm", breedName: "Shar Pei" });
    // Breed.create({ breedId: "mediumapartmentlighthighenergy", breedName: "Border Collie" });
    // Breed.create({ breedId: "mediumapartmentanyhighenergy", breedName: "Boxer" });
    // Breed.create({ breedId: "largehomelightcalm", breedName: "Mastiff" });
    // Breed.create({ breedId: "largehomeanycalm", breedName: "Great Dane" });
    // Breed.create({ breedId: "largehomelighthighenergy", breedName: "Pit Bull" });
    // Breed.create({ breedId: "largehomeanyhighenergy", breedName: "German Shepherd Dog" });
    // Breed.create({ breedId: "largeapartmentlightcalm", breedName: "American Bulldog" });
    // Breed.create({ breedId: "largeapartmentanycalm", breedName: "Shar Pei" });
    // Breed.create({ breedId: "largeapartmentlighthighenergy", breedName: "Border Collie" });
    // Breed.create({ breedId: "largeapartmentanyhighenergy", breedName: "Greyhound" });

    return Breed;
};