import React from 'react';
import { Route, IndexRoute, Redirect, withRouter } from 'react-router';
import App from './containers/App';
import Chat from './containers/Chat';
import Sign from './containers/Sign';
import Notfound from './containers/Notfound';


const requireUser = (store) => {
    return (nextState, replace) => {
        if (!store.getState().get('user')) {
            replace('/sign');
        }
    };
};

export default (store) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Chat} onEnter={requireUser(store)} />
            <Route path="sign" component={withRouter(Sign)} />
            // <Route path="404" component={withRouter(Notfound)} />
            // <Redirect from="*" to="/404" />
        </Route>
    );
};
