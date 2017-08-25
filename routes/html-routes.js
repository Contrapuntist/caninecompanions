// MODULE REQUIREMENTS FOR ROUTING HANDLEBARS
var express = require('express');
var router = express.Router();

// MODULE REQUIREMENTS FOR ROUTING HTML FILES
var path = require('path');


module.exports = function(app) {

    // index
    app.get('/', function(req, res) {
        console.log('reached app get in html routes file'); 
        res.sendFile(path.join(__dirname, "../public/testing.html"));
    });

    // pets
    app.get('/pets', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/pets-rescue.html"));

    });
};