import 'babel-polyfill';
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import {delay} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'
import * as todosApi from '../utils/todos-api'

/**
 * Fetch todos saga.
 *
 */
export default function* fetchTodosSaga() {
    const NOTIFICATION_TTL = 5000;

    try {
        //dispatch that we will start request now
        yield put({type: types.DATA_PENDING_START});

        //fetch todos from server
        const todos = yield call(todosApi.get, apiUrls.TODOS_API);

        console.log("fetchTodosSaga: fetched todos: ", todos);

        //dispatch new todos
        yield put(todoActions.fetchTodosSuccess(todos));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});
    } catch (err) {
        //dispatch error while fetching todos
        yield put(todoActions.fetchTodosFailure(err.toString()));

        //show fetching todos error in notification
        yield put(errorActions.showErrorNotification(err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(NOTIFICATION_TTL);
        yield put(errorActions.hideErrorNotification())
    }
}
