import 'babel-polyfill';
import {browserHistory} from 'react-router'
import * as Actions from '../actions/auth-actions'
import * as types from '../constants/auth-action-types'
import {call, put, take} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'
import * as authUtils from '../utils/auth-utils'
import * as httpUtils from '../utils/http-utils'

export function* authorize({credentials, rememberMeFlag}) {
    try {
        //try to get token from local or session storage
        let token = authUtils.getTokenFromStorage();
        let err = null;

        //get token from server if no auth token in storages
        if (!token) {
            const res = yield call(httpUtils.post, apiUrls.AUTH_API, credentials);
            token = res.token;
            err = res.err;
        }

        //check that token from server exists
        if (token) {
            yield put(Actions.loginSuccess(token));
            yield call(authUtils.saveAuthToken, token, rememberMeFlag);
            browserHistory.push('/todo-app');

            //catch logout action and perform logout
            yield take(types.LOGOUT);
            yield call(authUtils.removeAuthToken);
            browserHistory.push('/auth');
        } else
            throw new Error(err || "No token and meaningful error from server")
    } catch (err) {
        console.error(err);
        //dispatch that login request fail
        yield put(Actions.loginFailure(err));
    }
}

export default function* authSaga() {
    for (; ;) {
        const {payload} = yield take(types.LOGIN_REQUEST_START || types.REGISTER_REQUEST_START);
        yield call(authorize, payload)
    }
}
