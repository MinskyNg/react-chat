import { ADD_GROUP_MSG } from '../constants/actionTypes';
import { Map, List } from 'immutable';


export default function groupMsg(state = Map(), action) {
    switch (action.type) {
        case ADD_GROUP_MSG:
            return state.has(action.groupname) ?
              state.update(action.groupname, x => x.push(action.msg)) :
              state.set(action.groupname, List([action.msg]));
        default:
            return state;
    }
}
