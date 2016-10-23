import { ADD_USER_MSG } from '../constants/actionTypes';
import { Map, List } from 'immutable';


export default function userMsg(state = Map(), action) {
    switch (action.type) {
        case ADD_USER_MSG:
            return state.has(action.username) ?
              state.update(action.username, x => x.push(action.msg)) :
              state.set(action.username, List([action.msg]));
        default:
            return state;
    }
}
