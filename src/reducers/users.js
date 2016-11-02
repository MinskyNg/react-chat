import { INIT_USERS, ADD_USER, REMOVE_USER, UPDATE_USER, ADD_USER_MSG, ADD_SELF_MSG }
  from '../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';


/**
* 用户列表
**/
export default function users(state = List(), action) {
    switch (action.type) {
        case INIT_USERS:
            return fromJS(action.users);
        case ADD_USER:
            return state.push(fromJS(action.user));
        case REMOVE_USER:
            return state.delete(state.findIndex(y => y.get('username') === action.username));
        case UPDATE_USER:
            const user = action.user;
            return state.update(state.findIndex(y => y.get('username') === user.username),
                    x => x.merge({ signature: user.signature, avatar: user.avatar })
                );
        case ADD_USER_MSG:
            let msg = action.msg;
            return state.update(state.findIndex(y => y.get('username') === msg.sender),
                x => x.update('msg', fromJS([{
                    sender: msg.sender,
                    avatar: msg.avatar,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }]), y => y.push(Map({
                    sender: msg.sender,
                    avatar: msg.avatar,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }))));
        case ADD_SELF_MSG:
            msg = action.msg;
            return state.update(state.findIndex(y => y.get('username') === msg.target),
                x => x.update('msg', fromJS([{
                    sender: msg.sender,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }]), y => y.push(Map({
                    sender: msg.sender,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }))));
        default:
            return state;
    }
}
