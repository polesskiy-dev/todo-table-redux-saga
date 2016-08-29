import 'babel-polyfill';
import * as types from '../constants/action-types'
import {takeEvery} from 'redux-saga'
import {fork} from 'redux-saga/effects'
import fetchTodosSaga from './fetch-todos-saga'
import postTodoSaga from './post-todo-saga'

//create new function on every POST_TODO_START action
function* watchPostTodoStarted() {
    yield* takeEvery(types.POST_TODO_START, postTodoSaga);
}

//create new function on every FETCH_TODOS_START action
function* watchFetchTodoStarted() {
    yield* takeEvery(types.FETCH_TODOS_START, fetchTodosSaga);
}

//fork to start watchers in parallel
export default function* rootSaga() {
    yield fork(watchFetchTodoStarted);
    yield fork(watchPostTodoStarted);
}
