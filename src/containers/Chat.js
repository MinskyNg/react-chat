/**
* 聊天室
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Model from '../components/Model';
import { socket, fetchUsers, fetchGroups, signout, updateUser, createGroup,
    joinGroup, privateChat, sendMsg, initUsers, addUser, removeUser, addGroup,
    addGroupMsg, addUserMsg, changeWarning, changeModal,
    toggleReceive, toggleSound, toggleNotice, toggleScreen } from '../actions';


class Chat extends React.PureComponent {
    componentDidMount() {
        this.target = this.props.target;
        const { dispatch, user } = this.props;
        const addGroupMsgA = msg => dispatch(addGroupMsg(msg));
        const addUserMsgA = msg => dispatch(addUserMsg(msg));

        // 获取用户列表、群组列表
        dispatch(fetchUsers());
        dispatch(fetchGroups());


        // 用户上线
        socket.on('online', data => {
            if (data.username === this.props.user.username) {
                if (this.target.private) {
                    addUserMsgA({
                        target: this.target.name,
                        type: 'system',
                        text: '欢迎进入聊天室'
                    });
                } else {
                    addGroupMsgA({
                        target: this.target.name,
                        type: 'system',
                        text: '欢迎进入聊天室'
                    });
                }
            } else {
                if (this.target.private) {
                    addUserMsgA({
                        target: this.target.name,
                        type: 'system',
                        text: `用户 ${data.username} 上线了`
                    });
                } else {
                    addGroupMsgA({
                        target: this.target.name,
                        type: 'system',
                        text: `用户 ${data.username} 上线了`
                    });
                }
                dispatch(addUser(data));
            }
        });

        // 加入群组
        socket.on('join group', data => {
            if (this.target.private) {
                addUserMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 加入了群组`
                });
            } else {
                addGroupMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 加入了群组`
                });
            }
        });

        // 离开群组
        socket.on('leave group', data => {
            if (this.target.private) {
                addUserMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 离开了群组`
                });
            } else {
                addGroupMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 离开了群组`
                });
            }
        });

        // 新建群组
        socket.on('new group', data => {
            dispatch(addGroup(data));
        });

        // 接收信息
        socket.on('new message', data => {
            if (data.private) {
                addUserMsgA(data);
            } else {
                addGroupMsgA(data);
            }
        });

        // 用户下线
        socket.on('offline', data => {
            if (this.target.private) {
                addUserMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 下线了`
                });
            } else {
                addGroupMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: `用户 ${data.username} 下线了`
                });
            }
            dispatch(removeUser(data.username));
        });

        // 断开连接
        socket.on('disconnect', () => {
            if (this.target.private) {
                addUserMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: '连接服务器失败'
                });
            } else {
                addGroupMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: '连接服务器失败'
                });
            }
            dispatch(initUsers([]));
        });

        // 重新连接
        socket.on('reconnect', () => {
            if (this.target.private) {
                addUserMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: '重新连接服务器'
                });
            } else {
                addGroupMsgA({
                    target: this.target.name,
                    type: 'system',
                    text: '重新连接服务器'
                });
            }
            dispatch(fetchUsers());
            socket.emit('online', {
                username: user.username,
                avatar: user.avatar,
                signature: user.signature,
                msg: []
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.target = nextProps.target;
        }
    }

    render() {
        const { dispatch, user, target, users, groups, warning, modal, sets } = this.props;

        // 筛选当前消息和聊天对象资料
        let msg = [];
        let targetProfile;
        if (target.private) {
            for (let i = 0, len = users.length; i < len; i++) {
                if (users[i].username === target.name) {
                    const targetUser = users[i];
                    msg = targetUser.msg;
                    targetProfile = {
                        name: targetUser.username,
                        avatar: targetUser.avatar,
                        signature: targetUser.signature
                    };
                    break;
                }
            }
        } else {
            for (let i = 0, len = groups.length; i < len; i++) {
                if (groups[i].name === target.name) {
                    const targetGroup = groups[i];
                    msg = targetGroup.msg;
                    targetProfile = {
                        name: targetGroup.name,
                        avatar: targetGroup.avatar,
                        signature: targetGroup.signature
                    };
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
                  user={user}
                  msg={msg}
                  targetProfile={targetProfile}
                  sendMsg={newMsg => dispatch(sendMsg(newMsg))}
                />
                <Model
                  user={user}
                  groups={groups}
                  warning={warning}
                  modal={modal}
                  updateUser={newUser => dispatch(updateUser(newUser))}
                  createGroup={newGroup => dispatch(createGroup(newGroup))}
                  clearWarning={() => dispatch(changeWarning(''))}
                  closeModal={() => dispatch(changeModal(0))}
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
    warning: PropTypes.string.isRequired,
    modal: PropTypes.number.isRequired,
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
        warning: state.get('warning'),
        modal: state.get('modal'),
        sets: state.get('sets').toJS()
    };
}

export default connect(selector)(Chat);
