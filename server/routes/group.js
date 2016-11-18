/**
 * 群组相关路由
 */


var bodyParser = require('body-parser');
var Group = require('../models/Group');


module.exports = function(router) {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));


    // 获取所有群组
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

    // 获取指定群组
    router.get('/group/:name', function(req, res) {
        Group.findOne({ name: req.params.name }, function(err, doc) {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'internal server error' });
            } else {
                res.json(doc);
            }
        });
    });

    // 创建群组
    router.post('/group', function(req, res) {
        Group.find({ name: req.body.name }, function(err, docs) {
            if (docs.length === 0) {
                var newGroup = new Group(req.body);
                newGroup.save(function(err, doc) {
                    res.json({ success: true, group: doc });
                });
            } else {
                res.json({ success: false, msg: '该群组已存在' });
            }
        });

    });
};
