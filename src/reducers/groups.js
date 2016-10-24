import { INIT_GROUPS, ADD_GROUP, ADD_MSG } from '../constants/actionTypes';
import { fromJS, Map } from 'immutable';


export default function groups(state = fromJS([{ name: 'Group', signature: '聊天室默认群组', avatar: 'groupdefult', msg: [] }]), action) {
    switch (action.type) {
        case INIT_GROUPS:
            return fromJS(action.groups);
        case ADD_GROUP:
            return state.push(Map(action.group));
        case ADD_MSG:
            const msg = action.msg;
            if (!msg.private) {
                return state.update(state.findIndex(y => y.get('name') === msg.target),
                    x => x.update('msg', fromJS([{
                        user: msg.user,
                        type: msg.type,
                        text: msg.text,
                        time: msg.time
                    }]), y => y.push(Map({
                        user: msg.user,
                        type: msg.type,
                        text: msg.text,
                        time: msg.time
                    }))));
            }
            return state;
        default:
            return state;
    }
}
