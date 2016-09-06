import 'babel-polyfill';
import * as Actions from '../actions/auth-actions'
import * as types from '../constants/auth-action-types'
import {call, put, take} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'

export const checkHttpStatus = (res) => (res.ok) ? res : res.text().then(err => {
    throw err;
});

/**
 * Send POST with user auth credentials
 * @param url
 * @param credentials
 */
export const postAuth = (url, credentials) => {
    fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: JSON.stringify(credentials)
    })
        .then(checkHttpStatus)
        .then(res => res.json())
};

/**
 * Save token to local or session storage
 * @param token
 * @param rememberMeFlag
 */
export const storeToken = (token, rememberMeFlag) => {
    console.log("Token %s will be stored, need to remember next time %b", token, rememberMeFlag)
};
export const removeToken = (token) => {
    console.log("Token %s will be removed", token)
};

export function* authorize(credentials) {
    try {
        const res = yield call(postAuth, apiUrls.AUTH_API, credentials);
        const token = res.token;

        //dispatch new token from server if exists
        if (token) {
            yield put(Actions.loginSuccess(token))
            return token
        } else
            throw new Error(res.err || "No token and meaningful error from server")
    } catch (err) {
        //dispatch that login request fail
        yield put(Actions.loginFailure(err));
    }
}

export default function* authSaga() {
    for (; ;) {
        const {payload} = yield take(types.LOGIN_REQUEST_START)
        const token = yield call(authorize, payload.credentials);
        if (token) {
            yield call(storeToken, token, payload.rememberMeFlag);
        }
    }
}
