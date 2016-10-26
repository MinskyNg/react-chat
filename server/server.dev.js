var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');
var logger = require('morgan');
var debug = require('debug');
var ejs = require('ejs');
var errorHandler = require('errorhandler');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevConfig = require('../webpack.dev.config.js');
var compiler = webpack(webpackDevConfig);


var app = express();
process.env.NODE_ENV = 'development';


/**
* 初始化环境配置
**/
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/chat');
var port = normalizePort(process.env.PORT || '3000');
var dist = path.join(__dirname, '../dist');
app.set('port', port);
app.set('views', dist);
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


/**
* 使用中间件
**/
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(cors());
app.use(logger('dev'));
app.use(express.static(dist));
if (app.get('env') === 'development') {
    app.use(errorHandler());
}


app.get('/', function(req, res) {
    res.sendFile(path.join(dist, 'index.html'));
});


/**
* 加载路由
**/
// 在线用户列表
var onlineUsers = [];
var usersRouter = express.Router();
var groupRouter = express.Router();
require('./routes/group')(groupRouter);
require('./routes/user')(usersRouter, onlineUsers);
app.use(usersRouter);
app.use(groupRouter);


/**
* 错误处理
**/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}


/**
* 服务器启动
**/
// 用户socket引用
var sockets = {};
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('./socketEvents')(io, sockets, onlineUsers);
server.listen(app.get('port'), function() {
    console.log('Server runing at port:' + app.get('port'));
});
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize port.
 */
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
