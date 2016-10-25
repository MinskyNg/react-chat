import { INIT_GROUPS, ADD_GROUP, ADD_GROUP_MSG } from '../constants/actionTypes';
import { fromJS, Map } from 'immutable';


/**
* 群组数据
**/
export default function groups(state = fromJS([{ name: 'Group', signature: '聊天室默认群组', avatar: 'groupdefult', msg: [] }]), action) {
    switch (action.type) {
        case INIT_GROUPS:
            return fromJS(action.groups);
        case ADD_GROUP:
            return state.push(Map(action.group));
        case ADD_GROUP_MSG:
            const msg = action.msg;
            return state.update(state.findIndex(y => y.get('name') === msg.target),
                x => x.update('msg', fromJS([{
                    sender: msg.sender,
                    avatar: msg.avatar,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }]), y => y.push(Map({
                    sender: msg.sender,
                    avatar: msg.avatar,
                    type: msg.type,
                    text: msg.text,
                    time: msg.time
                }))));
        default:
            return state;
    }
}
