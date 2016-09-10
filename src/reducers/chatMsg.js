import { ADD_MSG, CLEAR_MSG } from '../constants/actionTypes';


export default function chatMsg(state = '', action) {
    switch (action.type) {
        case ADD_MSG:
            return state + action.msg;
        case CLEAR_MSG:
            return '';
        default:
            return state;
    }
}
