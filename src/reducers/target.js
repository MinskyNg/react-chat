import { CHANGE_TARGET } from '../constants/actionTypes';
import { Map } from 'immutable';


/**
* 聊天对象
**/
export default function target(state = Map({ private: false, name: 'Group' }), action) {
    switch (action.type) {
        case CHANGE_TARGET:
            return Map(action.target);
        default:
            return state;
    }
}
