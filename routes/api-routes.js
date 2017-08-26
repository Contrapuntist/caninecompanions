var db = require('../models');

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
        db.Users.findAll({
        }).then(function(dbUsers) {
            res.json(db.Users);
        });
    });

    app.get('/api/pets/:lookupvar', function(req, res) {
        console.log(req.params.lookupvar);
        db.breeds.findOne({
            where: {
                // look-up variable      id: ex: req.params.id
                breedId: req.params.lookupvar
            }
        }).then(function(dbbreed) {
            res.json(dbbreed);
        });
    });

}