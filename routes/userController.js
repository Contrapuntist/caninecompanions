// MODULE REQUIREMENTS FOR ROUTING HANDLEBARS
var express = require('express');
var router = express.Router();
var request = require('request'); 
var db = require("../models");

// NODE MODULE FOR STRINGIFY-ING OBJECT FOR A QUERY
// USED FOR PETFINDER API CALL
const querystring = require('querystring'); 

// MODULE REQUIREMENTS FOR ROUTING HTML FILES
var path = require('path');

var apiResultsObj = {};


// index
router.get('/', function(req, res) {
    console.log('reached app get in html routes file'); 
    res.render("index", apiResultsObj);

});


router.get('/yourmatch', function(req, res) {
    
    res.render("adoptdog", {breed: apiResultsObj.wolframinfo} );
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
        // console.log(dbbreed);
    });
}); 

router.get('/petfinderapi/', function (req, res) { 
        console.log(req.query); 
        var apiQueryStr = "http://api.petfinder.com/pet.find?" + querystring.stringify(req.query, '&', '=');
        // var secondoption = req.params.apicall;
        console.log('*******************************');
        console.log('petfinder get request info');
        console.log(res)        
        console.log(apiQueryStr);     
        
        // res.send(req.query); 
        // res.redirect('/')
    
        var queryStr = "http://api.petfinder.com/pet.find?key=e5b1a397d213021b27e64c70bbd8ee34&animal=dog&breed=Beagle&sex=M&age=baby&size=S&location=60601&output=full&format=json" 
        request(apiQueryStr, function(error, response, body) {
            
            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {
        
                // Then we print out the imdbRating
                console.log("petfinder data: " + JSON.parse(body).petfinder.pets.pet[0].age.$t);
                console.log("petfinder data: " + JSON.parse(body).petfinder.pets.pet[0].size.$t); 
                res.json(body); 
                
                apiResultsObj.dogs = JSON.parse(body).petfinder.pets.pet
                
                // var hbsObject = { 
                //     dog: JSON.parse(body).petfinder.pets.pet,
                // }
                // console.log (hbsObject);
                // res.render("index", hbsObject);
            }
        });
    
});

router.get('/wolframapi/:dogbreed', function (req, res) { 
    
    var wolframBaseUrlStart = 'http://api.wolframalpha.com/v2/query?input=';
    var wolframBaseUrlEnd = '%20dog&appid=2TT3R3-JA5HLQH996&output=json';
     
    // var apiQueryStr = "http://api.wolframalpha.com/v2/query?" + querystring.stringify(req.query, '&', '=');
    console.log('*******************************');
    console.log('Wolfram API get request info');
    console.log(req.params.dogbreed);
    var wolframApiUrl = wolframBaseUrlStart + req.params.dogbreed + wolframBaseUrlEnd;

    console.log(wolframApiUrl); 

    request(wolframApiUrl, function(error, response, body) {
        
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            // console.log(body);
            var results = JSON.parse(body);
            // console.log(results)
            // extractWolframContent(results);
            res.json(results);
            // res.redirect('/yourmatch');
            // res.render('adoptdog'); 
            // var hbsObject = { 
            //     dog: JSON.parse(body).petfinder.pets.pet,
            // }
            // console.log (hbsObject);
            // res.render("index", hbsObject);
            // redirect('/yourmatch');
        } 
    });

});

router.post("/api/newuser", function(req, res) {
        console.log('***************');
        console.log('In new user post route');
        console.log(req.body);
        db.User.create(req.body).then(function(dbUser) {
          res.json(dbUser);
        });
      }); 

// testing querystring node module 

var a = { 
    I: "am",
    thrilled: "this",
    is: "working"
} 
var unifyStr = querystring.stringify(a);
console.log('############');
console.log(unifyStr);

function extractWolframContent(obj) { 
    console.log(obj);
    console.log(obj.queryresult.pods[4].subpods[0].plaintext);
    console.log(obj.queryresult.pods[5].subpods[0].plaintext);
    console.log(obj.queryresult.pods[6].subpods[0].plaintext);

    apiResultsObj.wolframinfo = {
        breedDescription: obj.queryresult.pods[4].subpods[0].plaintext, 
        breedTemperment: obj.queryresult.pods[5].subpods[0].plaintext,
        breedCharacteristics: obj.queryresult.pods[6].subpods[0].plaintext,
        breedHistory: obj.queryresult.pods[6].subpods[0].plaintext
    } 

    console.log("==============================");
    console.log("=== adding results in obj check ======");
    console.log(apiResultsObj.wolframinfo);

// BREED DESCRIPTION (in pod with "title": "Description")
// .queryresult.pods[4].subpods[0].plaintext

// TEMPERAMENT (in pod with "title": "Temperament")
// .queryresult.pods[5].subpods[0].plaintext

// DETAILED LIST OF CHARACTERISTIC TRAITS (in pod with "title": "Properties")
// .queryresult.pods[3].subpods[0].plaintext

// BREED HISTORY (in pod with "title": "History")
// .queryresult.pods[6].subpods[0].plaintext

// ALTERNATE BREED NAMES (in the pod with "title": "Alternate names" )
// .queryresult.pods[1].subpods[0].plaintext
};


module.exports = router; 