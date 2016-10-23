import { combineReducers } from 'redux-immutable';
import user from './user';
import target from './target';
import users from './users';
import groups from './groups';
import userMsg from './userMsg';
import groupMsg from './groupMsg';
import warning from './warning';
import modal from './modal';
import set from './set';


export default combineReducers({
    user,
    target,
    users,
    groups,
    userMsg,
    groupMsg,
    warning,
    modal,
    set
});
