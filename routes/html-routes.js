var path = require('path');

module.exports = function(app) {

    // index
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // pets
    app.get('/dogs', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/pets.html"));
    });
    
};