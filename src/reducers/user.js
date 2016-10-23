import { CHANGE_USER } from '../constants/actionTypes';
import { Map } from 'immutable';


export default function user(state = Map(null), action) {
    switch (action.type) {
        case CHANGE_USER:
            return Map(action.user);
        default:
            return state;
    }
}
