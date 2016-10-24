import { INIT_USERS, ADD_USER, REMOVE_USER, ADD_MSG } from '../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';


export default function users(state = List(), action) {
    switch (action.type) {
        case INIT_USERS:
            return fromJS(action.users);
        case ADD_USER:
            return state.push(Map(action.user));
        case REMOVE_USER:
            return state.delete(state.findIndex(y => y.get('username') === action.username));
        case ADD_MSG:
            const msg = action.msg;
            if (msg.private) {
                return state.update(state.findIndex(y => y.get('username') === msg.user),
                    x => x.update('msg', fromJS([{
                        type: msg.type,
                        text: msg.text,
                        time: msg.time
                    }]), y => y.push(Map({
                        type: msg.type,
                        text: msg.text,
                        time: msg.time
                    }))));
            }
            return state;
        default:
            return state;
    }
}
