/**
 * 开发环境redux store
 */


import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';


const initialState = fromJS({
    user: null,
    target: { private: false, name: 'Group' },
    users: [],
    groups: [{
        name: 'Group',
        signature: '聊天室默认群组',
        avatar: 'http://7xnpxz.com1.z0.glb.clouddn.com/groupdefault.png',
        msg: []
    }],
    warning: '',
    modal: 0,
    settings: {
        receive: true,
        sound: true,
        notice: true,
        screen: false
    }
});

// 创建调试记录中间件
const loggerMiddleware = createLogger();

// 中间件集合
const middleware = [thunk, loggerMiddleware];

// 利用compose增强store，使其与中间件和Devtools一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore(rootReducer, initialState);
