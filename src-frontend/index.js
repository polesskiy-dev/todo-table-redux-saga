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
import {reducer as formReducer} from 'redux-form'
import createLogger from 'redux-logger'

import rootSaga from './sagas/root-saga'
import {routes} from './routes'
import * as AuthActions from './actions/auth-actions'
import dataPending from './reducers/data-pending-reducer'
import errors from './reducers/errors-reducer'
import todos from './reducers/todos-reducer'

/**combine reducers*/
const reducer = combineReducers({
    todos,
    errors,
    dataPending,
    form: formReducer     // <---- Mounted at 'form'
});

const initialState = Map({
    todos: List(),
    errors: List(),
    dataPending: Map({openedConnectionsAmount: 0}),
    form: {}
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/* create store and init it by initial data, enhance by middleware*/
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);

//debug, log initial state
//console.log(store.getState().toJS());

/* try to login*/
store.dispatch(AuthActions.loginStart());

render(
//Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app-root')
);

