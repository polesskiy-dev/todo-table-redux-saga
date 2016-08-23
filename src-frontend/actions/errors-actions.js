import * as types from '../constants/action-types'

export const showErrorNotification = (message) => {
    return {
        type: types.SHOW_ERROR_NOTIFICATION,
        payload: {
            message: message
        }
    }
};

export const hideErrorNotification = () => {
    return {
        type: types.HIDE_ERROR_NOTIFICATION
    }
};
