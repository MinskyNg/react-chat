import { CHANGE_USER } from '../constants/actionTypes';


export default function user(state = 'NOT_LOGGED_IN', action) {
    switch (action.type) {
        case CHANGE_USER:
            return action.name;
        default:
            return state;
    }
}
