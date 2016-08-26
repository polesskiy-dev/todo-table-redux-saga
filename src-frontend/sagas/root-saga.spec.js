'use strict';
import test from 'ava';
import {put, call} from 'redux-saga/effects'
import * as todoActions from '../actions/todo-crud-actions'
import * as types from '../constants/action-types'
import {fetchTodosSaga} from './root-saga'

const TEST_TODO = {text: "test todo text", isDone: false};

test('fetch-todos-saga test', (t) => {
    const generator = fetchTodosSaga();

    t.deepEqual(generator.next().value, put({type: types.DATA_PENDING_START}));
    //generator.next(JSON.stringify([TEST_TODO]));
    //t.deepEqual(generator.next().value, call(todoActions.fetchTodosSuccess([TEST_TODO])));
});