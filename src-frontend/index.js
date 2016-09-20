/**
 * Main store function
 */
"use strict";
import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux-immutable';
import {Provider} from 'react-redux'
import {Map, List} from 'immutable'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

import rootSaga from './sagas/root-saga'
import {routes} from './routes'
import * as AuthActions from './actions/auth-actions'
import dataPending from './reducers/data-pending-reducer'
import errors from './reducers/errors-reducer'
import todos from './reducers/todos-reducer'
import authorization from './reducers/authorization-reducer'

/**combine reducers*/
const reducer = combineReducers({
    todos,
    errors,
    dataPending,
    authorization
});

const initialState = Map({
    todos: List(),
    errors: List(),
    dataPending: Map({
        openedConnectionsAmount: 0
    }),
    authorization: Map({
        authToken: "",
        username: ""
    })
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/* create store and init it by initial data, enhance by middleware*/
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);

/* try to login*/
store.dispatch(AuthActions.loginStart());

render(
//Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app-root')
);

