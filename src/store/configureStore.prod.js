import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const initialState = {
    user: 'NOT_LOGGED_IN',
    receiver: 'SEND_TO_ALL',
    userList: ['SEND_TO_ALL'],
    chatMsg: '',
    warning: false
};


const middleware = [thunk];

const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore);

export default finalCreateStore(rootReducer, initialState);
