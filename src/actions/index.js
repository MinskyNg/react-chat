import { CHANGE_USER, CHANGE_TARGET, INIT_USERS, ADD_USER, REMOVE_USER,
    INIT_GROUPS, ADD_GROUP, ADD_USER_MSG, ADD_GROUP_MSG, TOGGLE_RECEIVE,
    TOGGLE_SOUND, TOGGLE_NOTICE, TOGGLE_SCREEN } from '../constants/actionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';


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
export const addUserMsg = makeActionCreator(ADD_USER_MSG, 'username', 'msg');
export const addGroupMsg = makeActionCreator(ADD_GROUP_MSG, 'groupname', 'msg');
export const toggleReceive = makeActionCreator(TOGGLE_RECEIVE);
export const toggleSound = makeActionCreator(TOGGLE_SOUND);
export const toggleNotice = makeActionCreator(TOGGLE_NOTICE);
export const toggleScreen = makeActionCreator(TOGGLE_SCREEN);


/**
* 异步action
**/

export function signin(socket, user) {
    return dispatch => {
        return fetch('/signin', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucess) {
                socket.emit('oneline', data.user);
                dispatch(changeUser(data.user));
            } else {
                dispatch(warning(data.msg))
            }
        })
        .catch(e => console.log('Oops, signin error', e));
    };
}

export function signup(socket, user) {
    return dispatch => {
        return fetch('/signup', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucess) {
                socket.emit('oneline', data.user);
                dispatch(changeUser(data.user));
            } else {
                dispatch(warning(data.msg))
            }
        })
        .catch(e => console.log('Oops, signin error', e));
    }
}

export function signout(socket, user) {
    localStorage.setItem('user', JSON.stringify(null));
    dispatch(changeUser(null));
    socket.emit('disconnect');
}

export function changeUserProfile() {

}

export function getUsers() {

}

export function getGroups() {

}

export function getGroupProfile() {

}

export function addGroup() {

}
