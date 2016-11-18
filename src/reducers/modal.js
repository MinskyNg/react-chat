import { CHANGE_MODAL } from '../constants/actionTypes';


/**
 * 模态框状态
 * @param {number} state 默认state
 * @param {object} action action参数
 * @return {number} state
 */
export default function modal(state = 0, action) {
    switch (action.type) {
        case CHANGE_MODAL:
            return action.modal;
        default:
            return state;
    }
}
