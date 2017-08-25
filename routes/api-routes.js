var db = require('../models');

module.exports = function(app) {

    // @@ might not be able to have two gets with /api/pets
    app.get("/api/pets", function(req, res) {
        var query = {};
        // if (req.query.author_id) {
        //     query.AuthorId = req.query.author_id;
        // }

        // post is model
        db.Post.findAll({
            where: query
            //, include: [db.breed]
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    app.get('/api/pets', function(req, res) {
        db.Post.findAll({
        }).then(function(dbPost) {
            res.json(db.Post);
        });
    });

}