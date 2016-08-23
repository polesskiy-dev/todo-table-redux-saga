/**
 * Main store function
 */
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Map, List} from 'immutable'
import createSagaMiddleware from 'redux-saga'
import App from './components/App'
import reducer from './reducers/root-reducer'
import rootSaga from './sagas/root-saga'

// const DUMMY_TODOS = List([
//     Map({
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         isDone: true
//     }),
//     Map({
//         text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         isDone: false
//     }),
// ]);

const initialState = Map({
    'todos': List([]),
    'errors': List([]),
    'openedConnections': 0
});
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

/* create store and init it by initial data, enhance by middleware*/
const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

render(
//Provider allows us to receive data from store of our app (by connect function)
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);