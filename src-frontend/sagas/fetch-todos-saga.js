import 'babel-polyfill';
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import {delay} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'
import * as httpUtils from '../utils/http-utils'

/**
 * Fetch todosApi saga.
 */
export default function* fetchTodosSaga() {
    const NOTIFICATION_TTL = 5000;

    try {
        //dispatch that we will start request now
        yield put({type: types.DATA_PENDING_START});

        //fetch todosApi from server
        const todos = yield call(httpUtils.get, apiUrls.TODOS_API);

        console.log("fetchTodosSaga: fetched todosApi: ", todos);

        //dispatch new todosApi
        yield put(todoActions.fetchTodosSuccess(todos));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});
    } catch (err) {
        //dispatch error while fetching todosApi
        yield put(todoActions.fetchTodosFailure(err.toString()));

        //show fetching todosApi error in notification
        yield put(errorActions.showErrorNotification(err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(NOTIFICATION_TTL);
        yield put(errorActions.hideErrorNotification())
    }
}
