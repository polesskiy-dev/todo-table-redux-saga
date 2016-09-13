import 'babel-polyfill';
import {browserHistory} from 'react-router'
import * as Actions from '../actions/auth-actions'
import * as authTypes from '../constants/auth-action-types'
import * as types from '../constants/action-types'
import {delay} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import * as errorActions from '../actions/errors-actions'
import * as apiUrls from '../constants/api-urls'
import * as authUtils from '../utils/auth-utils'
import * as httpUtils from '../utils/http-utils'

export function* authorize({credentials, rememberMeFlag}) {
    const NOTIFICATION_TTL = 5000;

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
            yield take(authTypes.LOGOUT);
            yield call(authUtils.removeAuthToken);
            browserHistory.push('/auth');
        } else
            throw new Error(err || "No token and meaningful error from server")
    } catch (err) {
        console.error(err);
        //dispatch that login request fail
        yield put(Actions.loginFailure(err));

        //show post todosApi error in notification
        yield put(errorActions.showErrorNotification(err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(NOTIFICATION_TTL);
        yield put(errorActions.hideErrorNotification())
    }
}

export default function* authSaga() {
    for (; ;) {
        const {payload} = yield take(authTypes.LOGIN_REQUEST_START || authTypes.REGISTER_REQUEST_START);
        if (payload.credentials)
            yield call(authorize, payload)
    }
}
