import { combineReducers } from 'redux-immutable';
import user from './user';
import target from './target';
import users from './users';
import groups from './groups';
import warning from './warning';
import modal from './modal';
import sets from './sets';


export default combineReducers({
    user,
    target,
    users,
    groups,
    warning,
    modal,
    sets
});
