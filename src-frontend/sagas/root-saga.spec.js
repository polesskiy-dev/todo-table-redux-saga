'use strict';
import test from 'ava';
import * as types from '../constants/action-types'
import {fetchTodosSaga} from './root-saga'

test('fetch-todos-saga', (t) => {
    const generator = fetchTodosSaga();

    t.deepEqual(generator.next().action, {type: types.DATA_PENDING_START})
});