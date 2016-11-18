import { INIT_GROUPS, ADD_GROUP, ADD_GROUP_MSG } from '../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';


/**
 * 群组数据
 * @param {object} state 默认state
 * @param {object} action action参数
 * @return {object} state
 */
export default function groups(state = List(), action) {
    switch (action.type) {
        case INIT_GROUPS:
            return fromJS(action.groups);
        case ADD_GROUP:
            return state.push(fromJS(action.group));
        case ADD_GROUP_MSG:
            const msg = action.msg;
            return state.update(state.findIndex(y => y.get('name') === msg.target),
                x => x.update('msg',
                    fromJS([{
                        sender: msg.sender,
                        avatar: msg.avatar,
                        type: msg.type,
                        text: msg.text,
                        time: msg.time
                    }]),
                    y => y.push(Map({
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
