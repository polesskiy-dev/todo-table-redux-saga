import * as types from '../constants/action-types'

const errors = (errorsList, action) => {
    switch (action.type) {
        /** error message handle */
        case types.SHOW_ERROR_NOTIFICATION:
            return errorsList.push(action.payload.message);
        case types.HIDE_ERROR_NOTIFICATION:
            return errorsList.shift();

        /** default */
        default:
            return errorsList;
    }
};

export default errors