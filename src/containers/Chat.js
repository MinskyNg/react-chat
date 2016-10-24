/*
聊天室
*/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { socket, fetchUsers, fetchGroups, signout, joinGroup, privateChat,
    sendMsg, initUsers, addUser, removeUser, addGroup, addMsg, changeModal,
    toggleReceive, toggleSound, toggleNotice, toggleScreen } from '../actions';


class Chat extends React.PureComponent {
    componentDidMount() {
        const { dispatch, user, target } = this.props;
        const addMsg = msg => dispatch(addMsg(msg));

        dispatch(fetchUsers());
        dispatch(fetchGroups());

        socket.emit('online', {
            username: user.username,
            avatar: user.avatar,
            signature: user.signature,
            msg: []
        });

        // 用户上线
        socket.on('online', data => {
            if (data.username === this.props.user.username) {
                addMsg({
                    parivate: target.private,
                    target: target.name,
                    type: 'system',
                    text: '欢迎进入聊天室'
                });
            } else {
                addMsg({
                    parivate: target.private,
                    target: target.name,
                    type: 'system',
                    text: `用户 ${data.username} 上线`
                });
                dispatch(addUser(data));
            }
        });

        // 加入群组
        socket.on('join group', data => {
            addMsg({
                private: target.private,
                target: target.name,
                type: 'system',
                text: `用户 ${data.username} 加入了群组`
            });
        });

        // 离开群组
        socket.on('leave group', data => {
            addMsg({
                private: target.private,
                target: target.name,
                type: 'system',
                text: `用户 ${data.username} 离开了群组`
            });
        });

        // 新建群组
        socket.on('new group', data => {
            dispatch(addGroup(data));
        });

        // 接收信息
        socket.on('new message', data => {
            addMsg(data);
        });

        // 用户下线
        socket.on('offline', data => {
            addMsg({
                private: target.private,
                target: target.name,
                type: 'system',
                text: '用户 ${data.username} 下线'
            });
            dispatch(removeUser(data.username));
        });

        // 断开连接
        socket.on('disconnect', () => {
            addMsg({
                private: target.private,
                target: target.name,
                type: 'system',
                text: '连接服务器失败'
            });
            dispatch(initUsers([]));
        });

        // 重新连接
        socket.on('reconnect', () => {
            addMsg({
                private: target.private,
                target: target.name,
                type: 'system',
                text: '重新连接服务器'
            });
            dispatch(fetchUsers());
            socket.emit('online', {
                username: user.username,
                avatar: user.avatar,
                signature: user.signature,
                msg: []
            });
        });
    }

    render() {
        const { dispatch, user, target, users, groups, sets } = this.props;

        let msg = [];
        if (target.private) {
            for (let i = 0, len = users.length; i < len; i++) {
                if (users[i].username === target.name) {
                    msg = users[i].msg;
                    break;
                }
            }
        } else {
            for (let i = 0, len = groups.length; i < len; i++) {
                if (groups[i].name === target.name) {
                    msg = groups[i].msg;
                    break;
                }
            }
        }

        return (
            <div className="container">
                <Sidebar
                  user={user}
                  users={users}
                  groups={groups}
                  sets={sets}
                  signout={() => dispatch(signout())}
                  joinGroup={name => dispatch(joinGroup(name))}
                  privateChat={name => dispatch(privateChat(name))}
                  changeModal={modal => dispatch(changeModal(modal))}
                  toggleReceive={() => dispatch(toggleReceive())}
                  toggleSound={() => dispatch(toggleSound())}
                  toggleNotice={() => dispatch(toggleNotice())}
                  toggleScreen={() => dispatch(toggleScreen())}
                />
                <Main
                  target={target}
                  msg={msg}
                  sendMsg={newMsg => dispatch(sendMsg(newMsg))}
                />
            </div>
        );
    }
}


Chat.propTypes = {
    user: PropTypes.object.isRequired,
    target: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        signature: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        msg: PropTypes.array
    })).isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        signature: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        msg: PropTypes.array
    })).isRequired,
    sets: PropTypes.shape({
        receive: PropTypes.bool.isRequired,
        sound: PropTypes.bool.isRequired,
        notice: PropTypes.bool.isRequired,
        screen: PropTypes.bool.isRequired
    }).isRequired
};


function selector(state) {
    return {
        user: state.get('user').toJS(),
        target: state.get('target').toJS(),
        users: state.get('users').toJS(),
        groups: state.get('groups').toJS(),
        sets: state.get('sets').toJS()
    };
}

export default connect(selector)(Chat);
