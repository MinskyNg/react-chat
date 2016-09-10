import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, addMsg, clearMsg, addUser, removeUser, fetchUserList,
  changeReceiver, warningVisible } from '../actions';
import ChatContent from '../components/ChatContent';
import ChatInput from '../components/ChatInput';
import ChatSideBar from '../components/ChatSideBar';
import ChatLogin from '../components/ChatLogin';
import io from 'socket.io-client';


const socket = io();

class ChatApp extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUserList());
        // 监听其他用户上线
        socket.on('online', data => {
            let msg;
            // 显示系统消息
            if (data.user !== this.props.user) {
                msg = '<div class="message message-info"><span class="icon icon-info"></span>系统: 用户 ' + data.user + ' 上线了！</div>';
            } else {
                msg = '<div class="message message-info"><span class="icon icon-info"></span>系统: 欢迎进入聊天室！</div>';
            }
            this.props.dispatch(addUser(data.user));
            this.props.dispatch(addMsg(msg));
        });

        socket.on('send', data => {
            let msg;
            // 对所有人
            if (data.receiver === 'SEND_TO_ALL') {
                msg = '<div class="message message-sender">' + data.sender +
                '<span class="message-time"><span class="icon icon-time"></span>' + data.time +
                '</span></div><div class="message message-public">' + data.msgText + '</div>';
            }
            // 对用户私聊
            if (data.receiver === this.props.user) {
                msg = '<div class="message message-sender">' + data.sender +
                ' 对你说:<span class="message-time"><span class="icon icon-time"></span>' + data.time +
                '</span></div><div class="message message-private">' + data.msgText + '</div>';
            }
            this.props.dispatch(addMsg(msg));
        });

        // 监听其他用户下线
        socket.on('offline', data => {
            // 显示系统消息
            const msg = '<div class="message message-info"><span class="icon icon-info"></span>系统: 用户 ' + data.user + '  下线了！</div>';
            this.props.dispatch(addMsg(msg));
            this.props.dispatch(removeUser(data.user));
            // 如果下线用户是私聊对象，改为对 "所有人"
            if (data.user === this.props.receiver) {
                this.props.dispatch(changeReceiver('SEND_TO_ALL'));
            }
        });

        // 服务器关闭或出错
        socket.on('disconnect', () => {
            const msg = '<div class="message message-warn"><span class="icon icon-warn"></span>系统: 连接服务器失败！</div>';
            this.props.dispatch(addMsg(msg));
        });

        // 重新启动服务器
        socket.on('reconnect', () => {
            const msg = '<div class="message message-success"><span class="icon icon-success"></span>系统: 重新连接服务器！</div>';
            this.props.dispatch(addMsg(msg));
            socket.emit('online', {
                user: this.props.user
            });
        });
    }

    render() {
        const { dispatch, user, receiver, userList, chatMsg, warning } = this.props;
        return (
            <div>
              <div className="container">
                <div className="content">
                    <ChatContent
                      chatMsg = { chatMsg }
                    />
                    <ChatInput
                      socket = { socket }
                      user = { user }
                      receiver = { receiver }
                      addMsg = { msg => dispatch(addMsg(msg)) }
                      clearMsg = { () => dispatch(clearMsg()) }
                    />
                </div>
                <ChatSideBar
                  user = { user }
                  receiver = { receiver }
                  userList = { userList }
                  changeReceiver = { name => dispatch(changeReceiver(name)) }
                />
              </div>
              <ChatLogin
                socket = { socket }
                user = { user }
                userList = { userList }
                warning = { warning }
                login = { (websocket, name) => dispatch(login(websocket, name)) }
                warningVisible = { () => dispatch(warningVisible()) }
              />
            </div>
        );
    }
}

ChatApp.propTypes = {
    user: PropTypes.string,
    receiver: PropTypes.string.isRequired,
    userList: PropTypes.arrayOf(PropTypes.string).isRequired,
    chatMsg: PropTypes.string.isRequired,
    warning: PropTypes.bool.isRequired
};

function selector(state) {
    return {
        user: state.user,
        receiver: state.receiver,
        userList: state.userList,
        chatMsg: state.chatMsg,
        warning: state.warning
    };
}

export default connect(selector)(ChatApp);
