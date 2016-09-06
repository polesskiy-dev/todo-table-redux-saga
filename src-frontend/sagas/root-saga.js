import 'babel-polyfill';
import * as todoTypes from '../constants/action-types'
import * as authTypes from '../constants/auth-action-types'
import {takeEvery} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import authSaga from './auth-saga'
import fetchTodosSaga from './fetch-todos-saga'
import postTodoSaga from './post-todo-saga'

//create new function on every POST_TODO_START action
function* watchPostTodoStarted() {
    yield* takeEvery(todoTypes.POST_TODO_START, postTodoSaga);
}

//create new function on every FETCH_TODOS_START action
function* watchFetchTodoStarted() {
    yield* takeEvery(todoTypes.FETCH_TODOS_START, fetchTodosSaga);
}

//fork to start watchers in parallel
export default function* rootSaga() {
    yield fork(watchFetchTodoStarted);
    yield fork(watchPostTodoStarted);
    yield fork(authSaga);
}
