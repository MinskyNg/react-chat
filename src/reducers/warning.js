import { CHANGE_WARNING } from '../constants/actionTypes';


/**
* 警告数据
**/
export default function warning(state = '', action) {
    switch (action.type) {
        case CHANGE_WARNING:
            return action.warning;
        default:
            return state;
    }
}
