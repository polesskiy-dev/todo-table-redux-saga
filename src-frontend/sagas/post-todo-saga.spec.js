'use strict';
import test from 'ava';
import {put, call} from 'redux-saga/effects'
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import * as apiUrls from '../constants/api-urls'
import * as todosApi from '../utils/todos-api'
import postTodoSaga from './post-todo-saga'

const TEST_TODO = {text: "test todo text", isDone: false};
const TEST_ACTION = {
    payload: {todo: TEST_TODO}
};

test('Post-todo-saga test success', (t) => {
    const generator = postTodoSaga(TEST_ACTION);

    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_START}));
    t.deepEqual(generator.next().value, call(todosApi.post, apiUrls.TODOS_API, TEST_TODO));
    t.deepEqual(generator.next(TEST_TODO).value, put(todoActions.postTodoSuccess(TEST_TODO)));
    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_FINISHED}));
});

test('Post-todo-saga test failure', (t) => {
    const ERROR_TEXT = "Err";
    const generator = postTodoSaga(TEST_ACTION);

    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_START}));
    t.deepEqual(generator.next().value, call(todosApi.post, apiUrls.TODOS_API, TEST_TODO));
    t.deepEqual(generator.throw(ERROR_TEXT).value, put(todoActions.postTodoFailure(ERROR_TEXT)));
    t.deepEqual(generator.next().value, put(errorActions.showErrorNotification(ERROR_TEXT)));
    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_FINISHED}));
    generator.next();
    t.deepEqual(generator.next().value, put(errorActions.hideErrorNotification()));
});
