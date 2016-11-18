import { CHANGE_WARNING } from '../constants/actionTypes';


/**
 * 警告数据
 * @param {string} state 默认state
 * @param {object} action action参数
 * @return {string} state
 */
export default function warning(state = '', action) {
    switch (action.type) {
        case CHANGE_WARNING:
            return action.warning;
        default:
            return state;
    }
}
