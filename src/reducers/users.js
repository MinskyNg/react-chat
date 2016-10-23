import { INIT_USERS, ADD_USER, REMOVE_USER } from '../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';


export default function users(state = List(), action) {
    switch (action.type) {
        case INIT_USERS:
            return fromJS(action.users);
        case ADD_USER:
            return state.push(Map(action.user));
        case REMOVE_USER:
            return state.delete(state.findIndex(y => y.get('username') === action.username));
        default:
            return state;
    }
}
