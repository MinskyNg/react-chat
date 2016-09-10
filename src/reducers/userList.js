import { INIT_USER_LIST, ADD_USER, REMOVE_USER } from '../constants/actionTypes';


export default function userList(state = ['SEND_TO_ALL'], action) {
    switch (action.type) {
        case INIT_USER_LIST:
            return action.userList;
        case ADD_USER:
            return [...state, action.name];
        case REMOVE_USER:
            const index = state.indexOf(action.name);
            if (index !== -1) {
                return [...state.slice(0, index), ...state.slice(index + 1)];
            }
        default:
            return state;
    }
}
