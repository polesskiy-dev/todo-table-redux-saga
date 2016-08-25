'use strict';
import test from 'ava';
import * as types from '../constants/action-types';
import * as actions from '../actions/errors-actions'

test('actions', (t) => {
    const text = 'Text to show';
    const expectedAction = {
        type: types.SHOW_ERROR_NOTIFICATION,
        payload: {
            message: text
        }
    };

    t.deepEqual(actions.showErrorNotification(text), expectedAction)
});