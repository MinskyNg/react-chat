import { CHANGE_USER } from '../constants/actionTypes';
import { Map } from 'immutable';


/**
* 当前用户
**/
export default function user(state = Map(null), action) {
    switch (action.type) {
        case CHANGE_USER:
            return Map(action.user);
        default:
            return state;
    }
}
