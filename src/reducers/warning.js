import { WARNING_VISIBLE } from '../constants/actionTypes';


export default function warning(state = false, action) {
    switch (action.type) {
        case WARNING_VISIBLE:
            return true;
        default:
            return state;
    }
}
