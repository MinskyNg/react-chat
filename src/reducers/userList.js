import { INIT_USER_LIST, ADD_USER, REMOVE_USER, CLEAR_USER_LIST } from '../constants/actionTypes';


export default function userList(state = ['SEND_TO_ALL'], action) {
    switch (action.type) {
        case ADD_USER:
            if (state.indexOf(action.name) === -1) {
                return [...state, action.name];
            }
        case REMOVE_USER:
            const index = state.indexOf(action.name);
            if (index !== -1) {
                return [...state.slice(0, index), ...state.slice(index + 1)];
            }
        case INIT_USER_LIST:
            return action.userList;
        case CLEAR_USER_LIST:
            return ['SEND_TO_ALL'];
        default:
            return state;
    }
}
