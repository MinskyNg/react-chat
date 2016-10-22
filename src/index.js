import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from './store';
import routes from './routes';
import DevTools from './containers/DevTools';
require('normalize.css/normalize.css');
require('./styles/App.scss');


ReactDOM.render(
    <Provider store={store}>
         <div style={{ height: '100%' }}>
            <Router children={routes(store)} history={browserHistory} />
            { process.env.NODE_ENV !== 'production' && <DevTools /> }
        </div>
    </Provider>,
    document.getElementById('app')
);
