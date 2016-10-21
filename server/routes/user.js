var bodyParser = require('body-parser');
var User = require('../models/User.js');


module.exports = function(router) {
    router.use(bodyParser.json());

    router.post('/signin', function(req, res) {
        User.find({ username: req.body.username }, function(err, docs) {
            if (docs.length === 0) {
                res.json({ success: false, msg: '用户名不存在' });
            } else {
                if (docs[0].validPassword(req.body.password)) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false, msg: '密码错误' });
                }
            }
        });
    });

    router.post('/signup', function(req, res) {
        User.find({ username: req.body.username }, function(err, docs) {
            if (docs.length === 0) {
                req.body.password = User.generateHash(req.body.password);
                var newUser = new User(req.body);
                newUser.save(function(err, doc) {
                    res.json({ sucess: true });
                });
            } else {
                res.json({ success: false, msg: '用户名已存在' });
            }
        });
    });

    router.get('/users', function(req, res) {
        User.find({}, ['username', 'signature', 'avatar'], function(err, docs) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            } else {
                res.json(docs);
            }
        });
    });

    router.get('/users/:username', function(req, res) {
        User.findOne({ username: req.params.username },
            ['username', 'signature', 'avatar', 'date'],
            function(err, doc) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            } else {
                res.json(doc);
            }
        });
    });
};
