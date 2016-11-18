import { CHANGE_TARGET } from '../constants/actionTypes';
import { Map } from 'immutable';


/**
 * 聊天对象
 * @param {object} state 默认state
 * @param {object} action action参数
 * @return {object} state
 */
export default function target(state = Map({ private: false, name: 'Group' }), action) {
    switch (action.type) {
        case CHANGE_TARGET:
            return Map(action.target);
        default:
            return state;
    }
}
