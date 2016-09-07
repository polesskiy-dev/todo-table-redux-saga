import 'babel-polyfill';
import fetch from 'isomorphic-fetch'
import * as Actions from '../actions/auth-actions'
import * as types from '../constants/auth-action-types'
import {call, put, take} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'

export const checkHttpStatus = (res) => {
    if (res.status >= 200 && res.status < 300)
        return Promise.resolve(res)
    else
        return Promise.reject(new Error(res.statusText))
}


/**
 * Send POST with user auth credentials
 * @param url
 * @param credentials
 */
export const postAuth = (url, credentials) =>
    fetch(url, {
        method: 'POST',
        headers: {"Content-type": /*"application/x-www-form-urlencoded"*/"application/json"},
        body: JSON.stringify(credentials)
    })
        .then(checkHttpStatus)
        .then(res => res.json());


/**
 * Save token to local or session storage
 * @param token
 * @param rememberMeFlag
 */
export const storeToken = (token, rememberMeFlag) => {
    const storage = rememberMeFlag ? window.localStorage : window.sessionStorage;
    storage.setItem('token', token)
};
export const removeToken = () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
};

export function* authorize({credentials, rememberMeFlag}) {
    try {
        const {token, err} = yield call(postAuth, apiUrls.AUTH_API, credentials);
        //dispatch new token from server if exists
        if (token) {
            yield put(Actions.loginSuccess(token));
            yield call(storeToken, token, rememberMeFlag);
            //logout
            yield take(types.LOGOUT)
            yield call(Actions.logout());
            yield call(removeToken());
        } else
            throw new Error(err || "No token and meaningful error from server")
    } catch (err) {
        //dispatch that login request fail
        yield put(Actions.loginFailure(err));
    }
}

export default function* authSaga() {
    for (; ;) {
        const {payload} = yield take(types.LOGIN_REQUEST_START)
        yield call(authorize, payload);
    }
}
