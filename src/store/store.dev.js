import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';


const initialState = {
    user: 'NOT_LOGGED_IN',
    receiver: 'SEND_TO_ALL',
    userList: ['SEND_TO_ALL'],
    chatMsg: '',
    warning: false
};

// 调用日志打印方法
const loggerMiddleware = createLogger();

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware];

// 利用compose增强store，这个store与applyMiddleware和redux-devtools一起使用
const finalCreateStore = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
)(createStore);

export default finalCreateStore(rootReducer, initialState);
