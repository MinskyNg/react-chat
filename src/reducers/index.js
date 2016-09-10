import { combineReducers } from 'redux';
import user from './user';
import receiver from './receiver';
import userList from './userList';
import chatMsg from './chatMsg';
import warning from './warning';


export default combineReducers({
    user,
    receiver,
    userList,
    chatMsg,
    warning
});
