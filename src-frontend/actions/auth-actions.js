/**
 * Auth actions
 */
import * as types from '../constants/auth-action-types'
//login
export const loginStart = (credentials, rememberMeFlag) => {
    return {
        type: types.LOGIN_REQUEST_START,
        payload: {
            credentials,
            rememberMeFlag
        }
    }
};

export const loginSuccess = (token) => {
    return {
        type: types.LOGIN_REQUEST_SUCCESS,
        payload: {
            token
        }
    }
};

export const loginFailure = (err) => {
    return {
        type: types.LOGIN_REQUEST_FAILURE,
        payload: {
            err
        }
    }
};

//register
export const registerStart = (credentials) => {
    return {
        type: types.REGISTER_REQUEST_START,
        payload: {
            credentials
        }
    }
};

export const registerSuccess = (token) => {
    return {
        type: types.REGISTER_REQUEST_SUCCESS,
        payload: {
            token
        }
    }
};

export const registerFailure = (err) => {
    return {
        type: types.REGISTER_REQUEST_FAILURE,
        payload: {
            err
        }
    }
};

//logout
export const logout = () => {
    return {
        type: types.LOGOUT
    }
};
