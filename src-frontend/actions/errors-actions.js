import * as types from '../constants/action-types'

export const showErrorNotification = (id, message) =>{
    return {
        type: types.SHOW_ERROR_NOTIFICATION,
        payload: {
            id: id,
            message: message
        }
    }
};

export const hideErrorNotification = (id) =>{
    return {
        type: types.HIDE_ERROR_NOTIFICATION,
        payload: {
            id: id
        }
    }
};
