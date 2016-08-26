/**
 * Main store function
 */
"use strict";
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Map, List} from 'immutable'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'
import reducer from './reducers/root-reducer'
import rootSaga from './sagas/root-saga'

import App from './components/App'
import TodoApp from './components/toddo-app/TodoApp'
import About from './components/about/About'

const initialState = Map({
    'todos': List([]),
    'errors': List([]),
    'openedConnections': 0
});
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/* create store and init it by initial data, enhance by middleware*/
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);

render(
//Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={TodoApp}/>
                <Route path='todo-app' component={TodoApp}/>
                <Route path='about' component={About}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app-root')
);

