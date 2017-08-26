var db = require('./models');
var request = require('request'); 

module.exports = function(app) {

    // @@ might not be able to have two gets with /api/pets
    app.get("/api/pets", function(req, res) {
        var query = {};
        // if (req.query.author_id) {
        //     query.AuthorId = req.query.author_id;
        // }

        // post is model
        db.Users.findAll({
            where: query
            //, include: [db.breed]
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    app.get('/api/pets', function(req, res) {
        db.Breed.findAll({
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    app.get('/api/pets/:lookupvar', function(req, res) {
        console.log(req.params.lookupvar); 
        var getBreed = req.params.lookupvar;
        db.Breed.findOne({
            where: {
                // look-up variable      id: ex: req.params.id
                breedId: getBreed
            }
        }).then(function(dbbreed) {
            res.json(dbbreed);
        });
    });

    // app.get('/petfinder', function (req, res) { 
    //     var querystring = req.body.??  
    //     $.ajax
    // });

    // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        
    //       // If there were no errors and the response code was 200 (i.e. the request was successful)...
    //       if (!error && response.statusCode === 200) {
        
    //         // Then we print out the imdbRating
    //         console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    //       }
    //     });

}