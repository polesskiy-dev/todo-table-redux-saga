'use strict';
import test from 'ava';
import {put, call} from 'redux-saga/effects'
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import * as apiUrls from '../constants/api-urls'
import * as todosApi from '../utils/todos-api'
import fetchTodosSaga from './fetch-todos-saga'

const TEST_TODO = {text: "test todo text", isDone: false};

/*
 * async ()=> {
 * const URL = "http://localhost:3000" + apiUrls.TODOS_API;
 *
 *     nock(URL)
 *     .get("")
 *     .reply(200, [TEST_TODO]);
 *     const res = await todosApi.get(URL);
 * }
 */

test('fetch-todos-saga test success', (t) => {
    const generator = fetchTodosSaga();

    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_START}));
    t.deepEqual(generator.next().value, call(todosApi.get, apiUrls.TODOS_API));
    t.deepEqual(generator.next([TEST_TODO]).value, put(todoActions.fetchTodosSuccess([TEST_TODO])));
    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_FINISHED}));
});

test('fetch-todos-saga test failure', (t) => {
    const ERROR_TEXT = "Err";
    const generator = fetchTodosSaga();

    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_START}));
    t.deepEqual(generator.next().value, call(todosApi.get, apiUrls.TODOS_API));
    t.deepEqual(generator.throw(ERROR_TEXT).value, put(todoActions.fetchTodosFailure(ERROR_TEXT)));
    t.deepEqual(generator.next().value, put(errorActions.showErrorNotification(ERROR_TEXT)));
    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_FINISHED}));
    generator.next();
    t.deepEqual(generator.next().value, put(errorActions.hideErrorNotification()));
});
