import { CHANGE_TARGET } from '../constants/actionTypes';
import { Map } from 'immutable';


export default function target(state = Map({ type: 'group', name: 'Group' }), action) {
    switch (action.type) {
        case CHANGE_TARGET:
            return Map(action.target);
        default:
            return state;
    }
}
