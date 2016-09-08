import 'babel-polyfill';
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import * as Actions from '../actions/auth-actions'
import * as types from '../constants/auth-action-types'
import {call, put, take} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'
import * as authUtils from '../utils/auth-utils';

export const checkHttpStatus = (res) => {
    if (res.status >= 200 && res.status < 300)
        return Promise.resolve(res)
    else
        return Promise.reject(new Error(res.statusText))
};

/**
 * Send POST with user auth credentials
 * @param url
 * @param credentials
 */
export const postAuth = (url, credentials) =>
    fetch(url, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(credentials)
    })
        .then(checkHttpStatus)
        .then(res => res.json());

export function* authorize({credentials, rememberMeFlag}) {
    try {
        const {token, err} = yield call(postAuth, apiUrls.AUTH_API, credentials);
        //obtain new token from server
        if (token) {
            yield put(Actions.loginSuccess(token));
            yield call(authUtils.saveAuthToken, token, rememberMeFlag);
            browserHistory.push('/todo-app');
            //logout
            yield take(types.LOGOUT);
            yield call(authUtils.removeAuthToken);
            browserHistory.push('/auth');
        } else
            throw new Error(err || "No token and meaningful error from server")
    } catch (err) {
        console.error(err)
        //dispatch that login request fail
        yield put(Actions.loginFailure(err));
    }
}

export default function* authSaga() {
    for (; ;) {
        const {payload} = yield take(types.LOGIN_REQUEST_START || types.REGISTER_REQUEST_START);

        //if we're not authorized (no auth token) - try to authorize
        if (!authUtils.authTokenExists())
            yield call(authorize, payload);
    }
}
