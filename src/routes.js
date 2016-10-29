import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { socket, signin } from './actions';
import App from './containers/App';
import Chat from './containers/Chat';
import Sign from './containers/Sign';
import Loading from './components/Loading';


const requireUser = (store) => {
    return (nextState, replace) => {
        if (!store.getState().get('user')) {
            replace('/loading');
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                store.dispatch(signin(user, true));
            } else {
                replace('/sign');
            }
        }
    };
};


export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Chat} onEnter={requireUser(store)} onLeave={() => socket.emit('offline')} />
            <Route path="sign" component={Sign} />
            <Route path="loading" component={Loading} />
        </Route>
    );
};
