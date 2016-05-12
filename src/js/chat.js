(function($) {
    $(document).ready(function() {

        // 刷新用户在线列表
        function flushUsers(users, count) {
            // 显示在线人数
            $('#user-label').text('在线用户 (' + count + ')');
            // 清空之前用户列表，添加 "所有人" 选项并默认为选中
            $('#users-list').empty().append('<li alt="all" title="双击聊天" class="sendto">所有人</li>');
            // 生成在线用户列表
            for (var i in users) {
                $('#users-list').append('<li alt="' + users[i] + '" title="双击聊天">' + users[i] + '</li>');
            }
            // 双击私聊
            $('#users-list  li').dblclick(function() {
                // 防止双击自己
                if ($(this).attr('alt') != sender) {
                    // 设置被双击的用户为私聊对象
                    receiver = $(this).attr('alt');
                    // 清除之前的选中效果
                    $('#users-list  li').removeClass('sendto');
                    // 给被双击的用户添加选中效果
                    $(this).addClass('sendto');
                    // 刷新正在对谁说话
                    showSendTo();
                }
            });
        }

        // 显示正在对谁说话
        function showSendTo() {
            $('#sender').html(sender);
            $('#receiver').html(receiver == 'all' ? '所有人' : receiver);
        }

        // 获取当前时间
        function now() {
            var date = new Date();
            var time = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
            return time;
        }

        // 使消息窗口接到消息时自动向下滚动
        var contentShow = document.getElementById('content-show');
        function scrollDown() {
            contentShow.scrollTop = contentShow.scrollHeight;
        }


        // 从 cookie 中读取用户名，存于变量 sender
        var sender = $.cookie('user');

        // 若用户未登录
        if (sender === undefined) {
            $('.button-login').click(function(ev) {
                var oEvent = ev || event;
                oEvent.preventDefault();
                var name = $('#name').val().replace(/(^\s*)|(\s*$)/g, '');
                if (name === '' || name === null) {
                    alert('用户名未输入!');
                } else {
                    $.ajax({
                        url: '/',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            'name': name
                        },
                        success: function(data) {
                            if (data.success === false) {
                                document.getElementById('warning').style.visibility = '';
                            } else {
                                document.getElementById('warning').style.visibility = 'hidden';
                                window.location.reload();
                            }
                        }
                    });
                }
            });
            document.getElementById('login').style.display = '';
        }


        // 若用户已登录
        if (sender !== undefined) {

            // 设置默认接收对象为"所有人"
            var receiver = 'all';

            // 建立socket.io连接
            var socket = io();

            // 发送用户上线信号
            socket.emit('online', {
                user: sender
            });

            // 显示正在对谁说话
            showSendTo();

            // 监听其他用户上线
            socket.on('online', function(data) {
                // 显示系统消息
                if (data.user != sender) {
                    var sys = '<div class="message message-info"><span class="icon icon-info"></span>系统: 用户 ' + data.user + ' 上线了！</div>';
                } else {
                    var sys = '<div class="message message-info"><span class="icon icon-info"></span>系统: 欢迎进入聊天室！</div>';
                }
                $('#content-show').append(sys);
                scrollDown();
                // 刷新在线用户列表
                flushUsers(data.users, data.count);
            });

            socket.on('send', function(data) {
                // 对所有人
                if (data.receiver == 'all') {
                    $('#content-show').append('<div class="message message-sender">' + data.sender + '<span class="message-time"><span class="icon icon-time"></span>' + now() + '</span></div><div class="message message-public">' + data.msg + '</div>');
                }
                // 对用户私聊
                if (data.receiver == sender) {
                    $('#content-show').append('<div class="message message-sender">' + data.sender + ' 对你说:<span class="message-time"><span class="icon icon-time"></span>' + now() + '</span></div><div class="message message-private">' + data.msg + '</div>');
                }
                scrollDown();
            });


            // F5刷新清除所有聊天记录
            $(window).keydown(function(ev) {
                var oEvent = ev || event;
                if (oEvent.keyCode == 116) {
                    if (!confirm('刷新将会清除所有聊天记录，确定要刷新吗？')) {
                        oEvent.preventDefault();
                    }
                }
            });

            // 为输入框添加placeholder
            $('#input-message').focusout(function() {
                var element = $(this);
                if (!element.text().trim().length) {
                    element.empty();
                }
            });

            // 点击发布聊天信息
            $('.button-send').click(function() {
                // 获取要发送的信息
                var msg = $('#input-message').html();
                if (msg == '') return;
                // 把发送的信息先添加在自己的页面中
                if (receiver == 'all') {
                    $('#content-show').append('<div class="message message-sender">' + sender + '<span class="message-time"><span class="icon icon-time"></span>' + now() + '</span></div><div class="message message-public">' + msg + '</div>');
                } else {
                    $('#content-show').append('<div class="message message-sender">你对 ' + receiver + ' 说:<span class="message-time"><span class="icon icon-time"></span>' + now() + '</span></div><div class="message message-private">' + msg + '</div>');
                }
                scrollDown();
                // 向服务器发送信息
                socket.emit('send', {
                    sender: sender,
                    receiver: receiver,
                    msg: msg
                });
                // 清空输入框并获得焦点
                $('#input-message').html('').focus();
            });

            // 清除屏幕聊天信息
            $('.button-clear').click(function() {
                $('#content-show').empty();
            });


            // 监听其他用户下线
            socket.on('offline', function(data) {
                // 显示系统消息
                var sys = '<div class="message message-info"><span class="icon icon-info"></span>系统: 用户 ' + data.user + '  下线了！</div>';
                $('#content-show').append(sys);
                scrollDown();
                // 刷新在线用户列表
                flushUsers(data.users, data.count);
                // 如果下线用户是私聊对象，改为对 "所有人"
                if (data.user == receiver) {
                    receiver = 'all';
                    showSendTo();
                }
            });

            // 服务器关闭或出错
            socket.on('disconnect', function() {
                var sys = '<div class="message message-warn"><span class="icon icon-warn"></span>系统: 连接服务器失败！</div>';
                $('#content-show').append(sys);
                scrollDown();
                $('#users-list').empty();
            });

            // 重新启动服务器
            socket.on('reconnect', function() {
                var sys = '<div class="message message-success"><span class="icon icon-success"></span>系统: 重新连接服务器！</div>';
                $('#content-show').append(sys);
                scrollDown();
                socket.emit('online', {
                    user: sender
                });
            });
        }

    });
})(jQuery);