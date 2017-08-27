// MODULE REQUIREMENTS FOR ROUTING HANDLEBARS
var express = require('express');
var router = express.Router();
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
    db.Breed.findAll({}).then(function(dbUsers) {
        res.json(dbUsers);
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

    // pets
    // app.get('/pets', function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/pets-rescue.html"));

    // });

module.exports = router;