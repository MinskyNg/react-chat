var bodyParser = require('body-parser');
var Group = require('../models/Group');


module.exports = function(router) {
    router.use(bodyparser.json());

    router.get('/groups', function(req, res) {
        Group.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            } else {
                res.json(docs);
            }
        });
    });

    router.get('/groups/:name', function(req, res) {
        Group.findOne({ name: req.params.name } function(err, doc) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            } else {
                res.json(doc);
            }
        });
    });

    router.post('/groups/:name', function(req, res) {
        var newGroup = new Group(req.body);
        newGroup.save(function(err, doc) {
            res.json(doc);
        })
    })
};
