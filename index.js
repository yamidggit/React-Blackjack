import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from './app/components/app.js';
import{Settings} from './app/components/settings.js';
import {createStore, applyMiddleware,
         compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {Map} from 'immutable';

import reducer from './app/reducers/index';
import { setupGame, fetchRecord } from './app/action_creators';

import watchActions from './app/sagas/index';

/*
React Router works by deciding which components to render based on the URL
typed into the browser window.
*/
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import queryString from 'query-string'; 
import randomstring from 'randomstring';


/*
queryString is used to parse the url and randomstring is used 
to generate a token in case that the user doesn't have one
*/

const userToken= queryString.parse(window.location.search).token ||
                randomstring.generate(12);

const initialState= {settings: new Map({speed: 750, userToken}) };
require('./app/css/main.scss');



/*
Saga middleware will watch the reducer for actions and iterate a saga generator
each time an action is dispatched. The sagas will run after your reducer, 
so they will only see the application state after an action is performed. 
*/

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, initialState, compose(
   applyMiddleware(sagaMiddleware),
   window.devToolsExtension ?
   window.devToolsExtension() : f => f
));


/*
connect the router history object with our application store
with hashHistory you would visit the page with'#/settings'  
*/
const history = syncHistoryWithStore(hashHistory, store);

// run the saga
sagaMiddleware.run(watchActions);

store.dispatch(fetchRecord(0, 0));
store.dispatch(setupGame());


ReactDOM.render(
   <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer} />
            <Route path="/settings" component={Settings} />
        </Router>
    </Provider>,
   document.getElementById('app')
);