import { CHANGE_RECEIVER } from '../constants/actionTypes';


export default function receiver(state = 'SEND_TO_ALL', action) {
    switch (action.type) {
        case CHANGE_RECEIVER:
            return action.name;
        default:
            return state;
    }
}
