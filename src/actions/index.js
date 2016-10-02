import { CHANGE_USER, CHANGE_RECEIVER, INIT_USER_LIST, ADD_USER, REMOVE_USER,
    CLEAR_USER_LIST, ADD_MSG, CLEAR_MSG, WARNING_VISIBLE } from '../constants/actionTypes';
import fetch from 'isomorphic-fetch';


function makeActionCreator(type, ...argNames) {
    return (...args) => {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}

export const changeUser = makeActionCreator(CHANGE_USER, 'name');
export const changeReceiver = makeActionCreator(CHANGE_RECEIVER, 'name');
export const initUserList = makeActionCreator(INIT_USER_LIST, 'userList');
export const addUser = makeActionCreator(ADD_USER, 'name');
export const removeUser = makeActionCreator(REMOVE_USER, 'name');
export const clearUserList = makeActionCreator(CLEAR_USER_LIST);
export const addMsg = makeActionCreator(ADD_MSG, 'msg');
export const clearMsg = makeActionCreator(CLEAR_MSG);
export const warningVisible = makeActionCreator(WARNING_VISIBLE);


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
