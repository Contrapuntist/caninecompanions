// MODULE REQUIREMENTS FOR ROUTING HANDLEBARS
var express = require('express');
var router = express.Router();

// MODULE REQUIREMENTS FOR ROUTING HTML FILES
var path = require('path');


module.exports = function(app) {

    // index
    app.get('/', function(req, res) {
        console.log('reached app get in html routes file'); 
        // USE FOR HTML ROUTING 
        // res.sendFile(path.join(__dirname, "../public/testing.html"));

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
        res.render("index");
    });

    // pets
    app.get('/pets', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/pets-rescue.html"));
    });
    
};