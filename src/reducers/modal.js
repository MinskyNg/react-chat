import { CHANGE_MODAL } from '../constants/actionTypes';


/**
* 模态框状态
**/
export default function modal(state = 0, action) {
    switch (action.type) {
        case CHANGE_MODAL:
            return action.modal;
        default:
            return state;
    }
}
