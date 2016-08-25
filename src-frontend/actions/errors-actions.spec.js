'use strict';
import * as types from '../constants/action-types';
import * as actions from '../actions/errors-actions'

describe('actions', () => {
    it('should create an action to show error notification', () => {
        const text = 'Text to show';
        const expectedAction = {
            type: types.SHOW_ERROR_NOTIFICATION,
            payload: {
                message: text
            }
        }

        expect(actions.showErrorNotification(text)).toEqual(expectedAction)
    })
})