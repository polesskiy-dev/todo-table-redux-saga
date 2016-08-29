import 'babel-polyfill';
// import Promise from 'bluebird'
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import {delay} from 'redux-saga'
import {call, put} from 'redux-saga/effects'
import * as apiUrls from '../constants/api-urls'
import * as todosApi from '../utils/todos-api'

/**
 * POST new todo.
 *
 * @param action
 */
export default function* postTodoSaga(action) {
    const NOTIFICATION_TTL = 5000;

    try {
        // console.log(action);
        //dispatch that we will start request now
        yield put({type: types.DATA_PENDING_START});

        //POST todo to server
        const todo = yield call(todosApi.post, apiUrls.TODOS_API, action.payload.todo);

        //dispatch new todo from server
        yield put(todoActions.postTodoSuccess(todo));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});
    } catch (err) {
        //dispatch error while post todo
        yield put(todoActions.postTodoFailure(err.toString()));

        //show post todos error in notification
        yield put(errorActions.showErrorNotification(err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(NOTIFICATION_TTL);
        yield put(errorActions.hideErrorNotification())
    }
}