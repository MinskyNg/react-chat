/**
* 用户相关路由
**/


var bodyParser = require('body-parser');
var User = require('../models/User.js');


module.exports = function(router, onlineUsers) {
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: false }));


    // 登录
    router.post('/signin', function(req, res) {
        User.find({ username: req.body.username }, function(err, docs) {
            if (docs.length === 0) {
                res.json({ success: false, msg: '用户名不存在' });
            } else {
                if (docs[0].validPassword(req.body.password)) {
                    // 防止重复登录
                    for (var i = 0, len = onlineUsers.length; i < len; i++) {
                        if (onlineUsers[i] && onlineUsers[i].username === req.body.username) {
                            res.json({ success: false, msg: '当前用户已登录' });
                            return;
                        }
                    }
                    res.json({ success: true, user: docs[0] });
                } else {
                    res.json({ success: false, msg: '密码错误' });
                }
            }
        });
    });

    // 注册
    router.post('/user', function(req, res) {
        User.find({ username: req.body.username }, function(err, docs) {
            if (docs.length === 0) {
                req.body.password = User.generateHash(req.body.password);
                var newUser = new User(req.body);
                newUser.save(function(err, doc) {
                    res.json({ success: true, user: doc });
                });
            } else {
                res.json({ success: false, msg: '用户名已存在' });
            }
        });
    });

    // 修改用户资料
    router.put('/user', function(req, res) {
        User.update({ username: req.body.username },
            ({ $set: { signature: req.body.signature, avatar: req.body.avatar } }),
            function(err) {
                if (err) {
                    res.json({ success: false });
                } else {
                    res.json({ success: true });
                }
            });
    });

    // 获取用户资料
    router.get('/user/:username', function(req, res) {
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

    // 获取在线用户列表
    router.get('/users', function(req, res) {
        res.json(onlineUsers);
    });
};
