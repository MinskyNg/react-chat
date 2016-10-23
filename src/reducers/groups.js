import { INIT_GROUPS, ADD_GROUP } from '../constants/actionTypes';
import { fromJS, Map } from 'immutable';


export default function groups(state = fromJS([{ name: 'Group', signature: '聊天室默认群组', avatar: 'groupdefult' }]), action) {
    switch (action.type) {
        case INIT_GROUPS:
            return fromJS(action.groups);
        case ADD_GROUP:
            return state.push(Map(action.group));
        default:
            return state;
    }
}
