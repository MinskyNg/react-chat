/**
* redux store prod
**/


import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import rootReducer from '../reducers';


const initialState = fromJS({
    user: null,
    target: { private: false, name: 'Group' },
    users: [],
    groups: [{ name: 'Group', signature: '聊天室默认群组', avatar: 'groupdefault', msg: [] }],
    warning: '',
    modal: 0,
    sets: {
        receive: true,
        sound: true,
        notice: true,
        screen: false
    }
});


// 中间件集合
const middleware = [thunk];

// 利用compose增强store，使其与中间件和Devtools一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore);

export default finalCreateStore(rootReducer, initialState);
