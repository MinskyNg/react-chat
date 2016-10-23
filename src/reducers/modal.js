import { CHANGE_MODAL } from '../constants/actionTypes';


export default function modal(state = 0, action) {
    switch (action.type) {
        case CHANGE_MODAL:
            return action.modal;
        default:
            return state;
    }
}
