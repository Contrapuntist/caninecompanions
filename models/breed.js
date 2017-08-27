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

    // Inserting rows into breeds table 
    // Run this code only if creating the table for the database for the first time
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

    // Attempting to replace the code above with the code below, but it's not working yet (think it is an asynch problem)
    // Breed.findOrCreate({where: {breedId: "smallhomelightcalm"}, defaults: {breedName: "Chihuahua" }});
    // Breed.findOrCreate({where: {breedId: "smallhomeanycalm"}, defaults: {breedName: "Pug" }});
    // Breed.findOrCreate({where: {breedId: "smallhomelighthighenergy"}, defaults: {breedName: "Beagle" }});
    // Breed.findOrCreate({where: {breedId: "smallhomeanyhighenergy"}, defaults: {breedName: "Jack Russell Terrier" }});
    // Breed.findOrCreate({where: {breedId: "smallapartmentlightcalm"}, defaults: {breedName: "Shih Tzu" }});
    // Breed.findOrCreate({where: {breedId: "smallapartmentanycalm"}, defaults: {breedName: "Dachshund" }});
    // Breed.findOrCreate({where: {breedId: "smallapartmentlighthighenergy"}, defaults: {breedName: "Poodle" }});
    // Breed.findOrCreate({where: {breedId: "smallapartmentanyhighenergy"}, defaults: {breedName: "Corgi" }});
    // Breed.findOrCreate({where: {breedId: "mediumhomelightcalm"}, defaults: {breedName: "Chow Chow" }});
    // Breed.findOrCreate({where: {breedId: "mediumhomeanycalm"}, defaults: {breedName: "Hound" }});
    // Breed.findOrCreate({where: {breedId: "mediumhomelighthighenergy"}, defaults: {breedName: "Pit Bull" }});
    // Breed.findOrCreate({where: {breedId: "mediumhomeanyhighenergy"}, defaults: {breedName: "Labrador Retriever" }});
    // Breed.findOrCreate({where: {breedId: "mediumapartmentlightcalm"}, defaults: {breedName: "Bulldog" }});
    // Breed.findOrCreate({where: {breedId: "mediumapartmentanycalm"}, defaults: {breedName: "Shar Pei" }});
    // Breed.findOrCreate({where: {breedId: "mediumapartmentlighthighenergy"}, defaults: {breedName: "Border Collie" }});
    // Breed.findOrCreate({where: {breedId: "mediumapartmentanyhighenergy"}, defaults: {breedName: "Boxer" }});
    // Breed.findOrCreate({where: {breedId: "largehomelightcalm"}, defaults: {breedName: "Mastiff" }});
    // Breed.findOrCreate({where: {breedId: "largehomeanycalm"}, defaults: {breedName: "Great Dane" }});
    // Breed.findOrCreate({where: {breedId: "largehomelighthighenergy"}, defaults: {breedName: "Pit Bull" }});
    // Breed.findOrCreate({where: {breedId: "largehomeanyhighenergy"}, defaults: {breedName: "German Shepherd Dog" }});
    // Breed.findOrCreate({where: {breedId: "largeapartmentlightcalm"}, defaults: {breedName: "American Bulldog" }});
    // Breed.findOrCreate({where: {breedId: "largeapartmentanycalm"}, defaults: {breedName: "Shar Pei" }});
    // Breed.findOrCreate({where: {breedId: "largeapartmentlighthighenergy"}, defaults: {breedName: "Border Collie" }});
    // Breed.findOrCreate({where: {breedId: "largeapartmentanyhighenergy"}, defaults: {breedName: "Greyhound" }});

    return Breed;
};