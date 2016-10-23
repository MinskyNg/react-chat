import { CHANGE_WARNING } from '../constants/actionTypes';


export default function warning(state = '', action) {
    switch (action.type) {
        case CHANGE_WARNING:
            return action.warning;
        default:
            return state;
    }
}
