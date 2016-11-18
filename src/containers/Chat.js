/**
 * 聊天室
 * @class Chat
 * @prop {object} user 用户资料
 * @prop {object} target 聊天对象
 * @prop {array} users 用户列表
 * @prop {array} groups 群组列表
 * @prop {string} warning 提示
 * @prop {number} modal 显示模态框类型
 * @prop {object} settings 设置列表
 */


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import Model from '../components/Model';
import { socket, fetchUsers, fetchGroups, signout, updateProfile, changeTarget,
    createGroup, joinGroup, privateChat, sendMsg, initUsers, addUser, removeUser,
    updateUser, addGroup, addGroupMsg, addUserMsg, changeWarning, changeModal,
    toggleReceive, toggleSound, toggleNotice, toggleScreen } from '../actions';


class Chat extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { menu: false };
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        this.target = this.props.target;
        this.receive = this.props.settings.receive;
        this.sound = this.props.settings.sound;
        this.notice = this.props.settings.notice;
        this._sound.volume = 0.5;

        const addUserMsgA = msg => {
            if (this.receive) {
                dispatch(addUserMsg(msg));
                if (this.sound) {
                    this._sound.play();
                }
                if (this.notice) {
                    new Notification('React Chat', { lang: 'utf-8',
                        body: `${msg.target}：\n${msg.text}` });
                }
            }
        };
        const addGroupMsgA = msg => {
            dispatch(addGroupMsg(msg));
            if (this.sound) {
                this._sound.play();
            }
            if (this.notice) {
                new Notification('React Chat', { lang: 'utf-8',
                    body: `${msg.target}：\n${msg.text}` });
            }
        };


        // 获取用户列表、群组列表
        dispatch(fetchUsers());
        dispatch(fetchGroups());


        // 用户上线
        socket.on('online', data => {
            if (data.username !== this.props.user.username) {
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
            } else {
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

        // 修改资料
        socket.on('update user', data => {
            dispatch(updateUser(data));
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
            if (data.username === this.target.name) {
                dispatch(changeTarget({ private: false, name: 'Group' }));
            }

            dispatch(removeUser(data.username));

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
        Notification.requestPermission();
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            this.target = nextProps.target;
        }
        if (this.props.settings.receive !== nextProps.settings.receive) {
            this.receive = nextProps.settings.receive;
        }
        if (this.props.settings.sound !== nextProps.settings.sound) {
            this.sound = nextProps.settings.sound;
        }
        if (this.props.settings.notice !== nextProps.settings.notice) {
            this.notice = nextProps.settings.notice;
        }
        if (this.props.settings.screen !== nextProps.settings.screen) {
            if (nextProps.settings.screen === true) {
                this.requestFullScreen();
            } else {
                this.exitFullscreen();
            }
        }
    }


    // 进入全屏
    requestFullScreen() {
        const de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }


    // 退出全屏
    exitFullscreen() {
        const de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }


    render() {
        const { dispatch, user, target, users, groups, warning, modal, settings } = this.props;

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
                  menu={this.state.menu}
                  toggleMenu={bool => this.setState({ menu: bool })}
                  user={user}
                  users={users}
                  groups={groups}
                  settings={settings}
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
                  menu={this.state.menu}
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
                  updateProfile={newUser => dispatch(updateProfile(newUser))}
                  createGroup={newGroup => dispatch(createGroup(newGroup))}
                  changeWarning={newWarning => dispatch(changeWarning(newWarning))}
                  closeModal={() => {
                      dispatch(changeWarning(''));
                      dispatch(changeModal(0));
                  }}
                />
                <audio ref={audio => this._sound = audio} style={{ display: 'none' }}>
                    <source src="http://7xnpxz.com1.z0.glb.clouddn.com/notice.mp3" type="audio/mp3" />
                    <source src="http://7xnpxz.com1.z0.glb.clouddn.com/notice.ogg" type="audio/ogg" />
                </audio>
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
    settings: PropTypes.shape({
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
        settings: state.get('settings').toJS()
    };
}

export default connect(selector)(Chat);
