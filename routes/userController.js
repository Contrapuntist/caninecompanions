// MODULE REQUIREMENTS FOR ROUTING HANDLEBARS
var express = require('express');
var router = express.Router();
var request = require('request'); 
var db = require("../models");

// MODULE REQUIREMENTS FOR ROUTING HTML FILES
var path = require('path');
    
        // index
router.get('/', function(req, res) {
    console.log('reached app get in html routes file'); 
    res.render("index");

    // RENDER INDEX HANDLEBARS FILE
    // router.get("/", function(req, res) {
        
    //     MODEL CALL 
    //     cat.all(function(data) {
    //       var hbsObject = {
    //         cats: data
    //       };
    //     console.log(hbsObject);
    //     });       
    // });

});

router.get("/api/pets", function(req, res) {
    var query = {};
    // post is model
    db.Breed.findAll({}).then(function(dbbreeds) {
        res.json(dbbreeds);
    });
});


router.get('/api/pets/:lookupvar', function(req, res) {
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

router.get('/petfinderapi', function (req, res) { 
        // var querystring = req.body  
        console.log(req.body); 

        var queryStr = "http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=Beagle&sex=M&age=baby&size=S&location=60601&output=full&format=json" 
        request(queryStr, function(error, response, body) {
            
            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {
        
                // Then we print out the imdbRating
                console.log("petfinder data: " + JSON.parse(body).petfinder.pets.pet[0].age.$t);
                console.log("petfinder data: " + JSON.parse(body).petfinder.pets.pet[0].size.$t); 
                res.json(body);
            }
        });
    });

module.exports = router; 