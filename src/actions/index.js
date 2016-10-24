import { CHANGE_USER, CHANGE_TARGET, INIT_USERS, ADD_USER, REMOVE_USER,
    INIT_GROUPS, ADD_GROUP, ADD_MSG, CHANGE_WARNING,
    CHANGE_MODAL, TOGGLE_RECEIVE, TOGGLE_SOUND, TOGGLE_NOTICE, TOGGLE_SCREEN }
    from '../constants/actionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';


export const socket = io();


/**
* actionCreator生成辅助函数
**/
function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}

export const changeUser = makeActionCreator(CHANGE_USER, 'user');
export const changeTarget = makeActionCreator(CHANGE_TARGET, 'target');
export const initUsers = makeActionCreator(INIT_USERS, 'users');
export const addUser = makeActionCreator(ADD_USER, 'user');
export const removeUser = makeActionCreator(REMOVE_USER, 'username');
export const initGroups = makeActionCreator(INIT_GROUPS, 'groups');
export const addGroup = makeActionCreator(ADD_GROUP, 'group');
export const addMsg = makeActionCreator(ADD_MSG, 'msg');
export const changeWarning = makeActionCreator(CHANGE_WARNING, 'warning');
export const changeModal = makeActionCreator(CHANGE_MODAL, 'modal');
export const toggleReceive = makeActionCreator(TOGGLE_RECEIVE);
export const toggleSound = makeActionCreator(TOGGLE_SOUND);
export const toggleNotice = makeActionCreator(TOGGLE_NOTICE);
export const toggleScreen = makeActionCreator(TOGGLE_SCREEN);


/**
* 异步action
**/

// 用户登录
export function signin(newUser, keep) {
    return dispatch => {
        return fetch('/signin', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucess) {
                const user = data.user;
                if (keep) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
                dispatch(changeWarning(''));
                dispatch(changeUser(user));
                browserHistory.push('/');
            } else {
                dispatch(changeUser(null));
                dispatch(changeWarning(data.msg));
            }
        })
        .catch(e => console.log('Oops, signin error', e));
    };
}

// 用户注册
export function signup(newUser, keep) {
    return dispatch => {
        return fetch('/user', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucess) {
                const user = data.user;
                if (keep) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
                dispatch(changeWarning(''));
                dispatch(changeUser(user));
                browserHistory.push('/');
            } else {
                dispatch(changeUser(null));
                dispatch(changeWarning(data.msg));
            }
        })
        .catch(e => console.log('Oops, signup error', e));
    };
}

// 用户退出
export function signout() {
    return dispatch => {
        localStorage.setItem('user', JSON.stringify(null));
        dispatch(changeUser(null));
        socket.emit('offline');
        browserHistory.push('/sign');
    };
}

// 修改用户资料
export function updateUser(newUser) {
    return dispatch => {
        return fetch('/user', {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucess) {
                dispatch(changeUser(data.user));
                dispatch(changeModal(0));
            }
        })
        .catch(e => console.log('Oops, updateUser error', e));
    };
}

// 获取在线用户列表
export function fetchUsers() {
    return dispatch => {
        return fetch('/users')
        .then(response => response.json())
        .then(data => dispatch(initUsers(data)))
        .catch(e => console.log('Oops, fetchUsers error', e));
    };
}

// 获取群组列表
export function fetchGroups() {
    return dispatch => {
        return fetch('/groups')
        .then(response => response.json())
        .then(data => dispatch(initGroups(data)))
        .catch(e => console.log('Oops, fetchGroups error', e));
    };
}

// 新建群组
export function createGroup(newGroup) {
    return (dispatch, getState) => {
        if (getState().get('groups').findIndex(y => y.get('name') === newGroup.name) !== -1) {
            return dispatch(changeWarning('该群组已存在'));
        }
        return fetch('/group', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGroup)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const group = data.group;
                dispatch(changeWarning(''));
                dispatch(addGroup(group));
                dispatch(changeModal(0));
                socket.emit('new group', group);
            } else {
                dispatch(changeWarning(data.msg));
            }
        })
        .catch(e => console.log('Oops, createGroups error', e));
    };
}

// 加入群组
export function joinGroup(name) {
    return (dispatch, getState) => {
        const target = getState().get('target');
        if (!target.get('private')) {
            socket.emit('leave group', {
                name: target.get('name')
            });
        }
        socket.emit('join group', { name });
        changeTarget({ private: false, name });
    };
}

// 对用户私聊
export function privateChat(name) {
    return (dispatch, getState) => {
        const target = getState().get('target');
        if (!target.get('private')) {
            socket.emit('leave group', {
                name: target.get('name')
            });
        }
        changeTarget({ private: true, name });
    };
}

export function sendMsg(msg) {
    return (dispatch, getState) => {
        const target = getState().get('target');
        let user;
        if (target.private) {
            user = getState().getIn(['user', 'username']);
        } else {
            user = getState().get('user');
        }
        socket.emit('new message', {
            private: target.private,
            target: target.name,
            user,
            type: msg.type,
            text: msg.text,
            time: msg.time
        });
    };
}
