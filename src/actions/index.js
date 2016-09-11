import { CHANGE_USER, CHANGE_RECEIVER, INIT_USER_LIST, ADD_USER, REMOVE_USER,
    CLEAR_USER_LIST, ADD_MSG, CLEAR_MSG, WARNING_VISIBLE } from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';


export function changeUser(name) {
    return {
        type: CHANGE_USER,
        name
    };
}

export function changeReceiver(name) {
    return {
        type: CHANGE_RECEIVER,
        name,
    };
}

export function initUserList(userList) {
    return {
        type: INIT_USER_LIST,
        userList
    };
}


export function addUser(name) {
    return {
        type: ADD_USER,
        name
    };
}

export function removeUser(name) {
    return {
        type: REMOVE_USER,
        name
    };
}

export function clearUserList() {
    return {
        type: CLEAR_USER_LIST
    };
}

export function addMsg(msg) {
    return {
        type: ADD_MSG,
        msg
    };
}

export function clearMsg() {
    return {
        type: CLEAR_MSG
    };
}

export function warningVisible() {
    return {
        type: WARNING_VISIBLE
    };
}


// 异步action
export function fetchUserList() {
    return dispatch => {
        return fetch('/userlist')
        .then(response => response.json())
        .then(data => dispatch(initUserList(data.userList)))
        .catch(e => console.log('Oops, error', e));
    };
}

export function login(socket, name) {
    return dispatch => {
        return fetch('/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 发送用户上线信号
                socket.emit('online', {
                    user: name
                });
                dispatch(changeUser(name));
            } else {
                dispatch(warningVisible());
            }
        })
        .catch(e => console.log('Oops, error', e));
    };
}
