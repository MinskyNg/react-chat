/**
* Socket.io事件
**/


var User = require('models/User.js');

exports = module.exports = function(io, onlineUsers) {
    io.on('connection', function(socket) {
        // 用户socket引用
        var sockets = {};


        // 用户上线
        socket.on('online', function(data) {
            socket.name = data.username;
            onlineUsers.push(data);
            sockets[data.username] = socket;
            socket.join('Group');
            io.emit('online', data);
        });


        // 加入群组
        socket.on('join group', function(data) {
            var name = data.name;
            socket.join(name);
            socket.broadcast.to(name).emit('join group', { username: socket.name });
        });


        // 离开群组
        socket.on('leave group', function(data) {
            var name = data.name;
            socket.leave(name);
            socket.broadcast.to(name).emit('leave group', { username: socket.name });
        });


        // 创建群组
        socket.on('new group', function(data){
            socket.broadcast.emit('new group', data);
        });


        // 发送信息
        socket.on('new message', function(data) {
            if (!data.private) {
                io.to(data.target).emit('new message', data);
            } else {
                if (sockets[data.target]) {
                    sockets[data.target].emit('new message', data);
                }
            }
        });


        // 用户下线
        socket.on('offline', function() {
            for (var i = 0, len = onlineUsers.length; i < len; i++) {
                if (onlineUsers[i].username === socket.name) {
                    onlineUsers.splice(i, 1);
                    delete sockets[socket.name];
                    socket.broadcast.emit('offline', {
                        username: socket.name
                    });
                }
            }
        });


        // 用户断开连接
        socket.on('disconnect', function() {
            for (var i = 0, len = onlineUsers.length; i < len; i++) {
                if (onlineUsers[i].username === socket.name) {
                    onlineUsers.splice(i, 1);
                    delete sockets[socket.name];
                    socket.broadcast.emit('offline', {
                        username: socket.name
                    });
                }
            }
        });
    });
};
