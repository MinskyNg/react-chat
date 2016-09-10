var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug');
var ejs = require('ejs');
var xss = require('xss');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevConfig = require('./webpack.dev.config.js');
var compiler = webpack(webpackDevConfig);


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

process.env.NODE_ENV = 'development';

// 初始化环境配置
var port = normalizePort(process.env.PORT || '3000');
var dist = path.join(__dirname, 'dist');
app.set('port', port);
app.set('views', dist);
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// 使用中间件
// webpack
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());



// 仅在开发环境下汇报异常信息
if (app.get('env') === 'development') {
    app.use(errorHandler());
}


// 存储所有在线用户的数组
var userList = ['SEND_TO_ALL'];
// 存储所有socket对象引用，以用于私聊
var sockets = {};


// 请求处理
app.get('/', function(req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});

// 获取在线用户列表
app.get('/userlist', function(req, res) {
    res.send({
        userList
    });
});

// 登陆处理
app.post('/login', function(req, res) {
    var name = req.body.name;
    if (userList.indexOf(name) !== -1) {
        // 当前用户存在，则不允许登陆
        res.send({
            success: false
        });
    } else {
        res.send({
            success: true,
            name
        });
    }
});


// 捕获 404 错误并前往错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理

// 开发环境下将会打印堆栈信息
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}


io.on('connection', function(socket) {
    // 监听用户上线
    socket.on('online', function(data) {
        // 使用用户名标记socket
        socket.name = data.user;
        // userList 中不存在该用户则将其加入，并存储其socket对象引用
        if (userList.indexOf(data.user) === -1) {
            userList.push(data.user);
            sockets[data.user] = socket;
        }
        // 向所有用户广播该用户上线信息
        io.emit('online', {
            user: data.user
        });
    });

    // 监听用户发布聊天信息
    socket.on('send', function(data) {
        data.msgText = xss(data.msgText);
        if (data.receiver == 'SEND_TO_ALL') {
            // 向其他所有用户广播该用户的信息
            socket.broadcast.emit('send', data);
        } else {
            // 向私聊用户发送该用户的信息
            sockets[data.receiver].emit('send', data);

        }
    });

    // 监听用户下线
    socket.on('disconnect', function() {
        // 若 userList 中保存了该用户，则将其从 userList和sockets中删除
        var index = userList.indexOf(socket.name);
        if (index !== -1) {
            userList.splice(index, 1);
            delete sockets[socket.name];
            // 向其他所有用户广播该用户下线信息
            socket.broadcast.emit('offline', {
                user: socket.name
            });
        }
    });

});


// 服务器启动
server.listen(app.get('port'), function() {
    console.log('Server runing at port:' + app.get('port'));
});
server.on('error', onError);
server.on('listening', onListening);


// 规范端口的格式，无效则返回false
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // 命名管道
        return val;
    }

    if (port >= 0) {
        // 端口号
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
