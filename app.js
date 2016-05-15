var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var debug = require('debug');
var ejs = require('ejs');
var xss = require('xss');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// process.env.NODE_ENV = 'production';

process.env.NODE_ENV = 'development';

// 初始化环境配置
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// 使用中间件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 仅在开发环境下汇报异常信息
if (app.get('env') === 'development') {
    app.use(errorHandler());
}


// 请求处理
app.get('/', function(req, res) {
    res.render(path.join(__dirname, 'views', 'index.html'));
});

// 登陆处理
app.post('/', function(req, res) {
        req.body.name = req.body.name.replace(/alert/g, 'alSAFEert');
        req.body.name = req.body.name.replace(/<\/script>/g, 'scrSAFEipt');
        req.body.name = req.body.name.replace(/<script>/g, 'scrSAFEipt');
        req.body.name = req.body.name.replace(/<object>/g, 'objSAFEct');
        req.body.name = req.body.name.replace(/<object>/g, 'obSAFEct');
        req.body.name = req.body.name.replace(/javascript/g, 'javaSAFEscript');
        req.body.name = req.body.name.replace(/onabort/g, 'onSAFEabort');
        req.body.name = req.body.name.replace(/onblur/g, 'onSAFEblur');
        req.body.name = req.body.name.replace(/onchange/g, 'onSAFEchange');
        req.body.name = req.body.name.replace(/onclick/g, 'onSAFEclick');
        req.body.name = req.body.name.replace(/ondblclick/g, 'onSAFEdblclick');
        req.body.name = req.body.name.replace(/onerror/g, 'onSAFEerror');
        req.body.name = req.body.name.replace(/onfocus/g, 'onSAFEfocus');
        req.body.name = req.body.name.replace(/onkeydown/g, 'onSAFEkeydown');
        req.body.name = req.body.name.replace(/onkeypress/g, 'onSAFEkeypress');
        req.body.name = req.body.name.replace(/onkeyup/g, 'onSAFEkeyup');
        req.body.name = req.body.name.replace(/onload/g, 'onSAFEload');
        req.body.name = req.body.name.replace(/onmousedown/g, 'onSAFEmousedown');
        req.body.name = req.body.name.replace(/onmousemove/g, 'onSAFEmousemove');
        req.body.name = req.body.name.replace(/onmouseout/g, 'onSAFEmouseout');
        req.body.name = req.body.name.replace(/onmouseup/g, 'onSAFEmouseup');
        req.body.name = req.body.name.replace(/onmouseup/g, 'onSAFEmouseup');
        req.body.name = req.body.name.replace(/onreset/g, 'onSAFEresetK');
        req.body.name = req.body.name.replace(/onresize/g, 'onSAFEresize');
        req.body.name = req.body.name.replace(/onselect/g, 'onSAFEselect');
        req.body.name = req.body.name.replace(/onsubmit/g, 'onSAFEsubmit');
        req.body.name = req.body.name.replace(/onunload/g, 'onSAFEunload');
    if (users[req.body.name]) {
        // 当前用户存在，则不允许登陆
        res.send({
            success: false
        });
    } else {
        // 不存在，把用户名存入 cookie
        res.cookie("user", req.body.name, {
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        res.send({
            success: true
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

// 生产环境
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});



// 存储所有在线用户的对象
var users = {};
var usersCount = 0;
// 存储所有socket对象引用，以用于私聊
var sockets = {};

io.on('connection', function(socket) {
    // 监听用户上线
    socket.on('online', function(data) {
        data.user = data.user.replace(/alert/g, 'alSAFEert');
        data.user = data.user.replace(/<\/script>/g, 'scrSAFEipt');
        data.user = data.user.replace(/<script>/g, 'scrSAFEipt');
        data.user = data.user.replace(/<object>/g, 'objSAFEct');
        data.user = data.user.replace(/<object>/g, 'obSAFEct');
        data.user = data.user.replace(/javascript/g, 'javaSAFEscript');
        data.user = data.user.replace(/onabort/g, 'onSAFEabort');
        data.user = data.user.replace(/onblur/g, 'onSAFEblur');
        data.user = data.user.replace(/onchange/g, 'onSAFEchange');
        data.user = data.user.replace(/onclick/g, 'onSAFEclick');
        data.user = data.user.replace(/ondblclick/g, 'onSAFEdblclick');
        data.user = data.user.replace(/onerror/g, 'onSAFEerror');
        data.user = data.user.replace(/onfocus/g, 'onSAFEfocus');
        data.user = data.user.replace(/onkeydown/g, 'onSAFEkeydown');
        data.user = data.user.replace(/onkeypress/g, 'onSAFEkeypress');
        data.user = data.user.replace(/onkeyup/g, 'onSAFEkeyup');
        data.user = data.user.replace(/onload/g, 'onSAFEload');
        data.user = data.user.replace(/onmousedown/g, 'onSAFEmousedown');
        data.user = data.user.replace(/onmousemove/g, 'onSAFEmousemove');
        data.user = data.user.replace(/onmouseout/g, 'onSAFEmouseout');
        data.user = data.user.replace(/onmouseup/g, 'onSAFEmouseup');
        data.user = data.user.replace(/onmouseup/g, 'onSAFEmouseup');
        data.user = data.user.replace(/onreset/g, 'onSAFEresetK');
        data.user = data.user.replace(/onresize/g, 'onSAFEresize');
        data.user = data.user.replace(/onselect/g, 'onSAFEselect');
        data.user = data.user.replace(/onsubmit/g, 'onSAFEsubmit');
        data.user = data.user.replace(/onunload/g, 'onSAFEunload');
        // 使用用户名标记socket
        socket.name = data.user;
        // users 中不存在该用户则将其加入，并存储其socket对象引用
        if (!users[data.user]) {
            users[data.user] = data.user;
            sockets[data.user] = socket;
            usersCount++;
        }
        // 向所有用户广播该用户上线信息
        io.emit('online', {
            users: users,
            user: data.user,
            count: usersCount
        });
    });

    // 监听用户发布聊天信息
    socket.on('send', function(data) {
        data.msg = xss(data.msg);
        if (data.receiver == 'all') {
            // 向其他所有用户广播该用户的信息
            socket.broadcast.emit('send', data);
        } else {
            // 向私聊用户发送该用户的信息
            sockets[data.receiver].emit('send', data);

        }
    });

    // 监听用户下线
    socket.on('disconnect', function() {
        // 若 users 中保存了该用户，则将其从 users和sockets中删除
        if (users[socket.name]) {
            delete users[socket.name];
            delete sockets[socket.name];
            usersCount--;
            // 向其他所有用户广播该用户下线信息
            socket.broadcast.emit('offline', {
                users: users,
                user: socket.name,
                count: usersCount
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