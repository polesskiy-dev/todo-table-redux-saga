import 'babel-polyfill';
// import Promise from 'bluebird'
import * as todoActions from '../actions/todo-crud-actions'
import * as errorActions from '../actions/errors-actions'
import * as types from '../constants/action-types'
import {takeEvery, delay} from 'redux-saga'
import {call, put, fork} from 'redux-saga/effects'


// const postTodo = (todo) => {
//     return fetch(
//         '/api/todos/',
//         {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(todo)
//         }
//     ).then(res=>res.json());
// };


//
// function* saveSingleTodoSaga() {
//     for (; ;) {
//         // Wait for the action with appropriate type and payload.status, grab payload field value from action payload.
//         const action = yield take((action)=>action.type === types.POST_TODO_REQ && action.payload.status === types.REQUEST.PENDING);
//         try {
//             const resp = yield postTodo(action.payload.todo);
//             console.log("Resp for posting new todo: %o", resp);
//         }
//         catch
//             (err) {
//             console.error("Error while posting single todo to server: %s", err);
//         }
//     }
// }
// saveSingleTodoSaga;

const NOTIFICATION_TTL = 5000;

/**
 * Check http status.
 *
 * If not OK - resolve promise and throw server message text, else - return same response.
 *
 * @param res - server response
 */
const checkHttpStatus = (res) => (res.ok) ? res : res.text().then(err => {
    throw err;
});

/**
 * POST new todo.
 *
 * @param action
 */
export function* postTodoSaga(action) {
    try {
        //dispatch that we will start request now
        yield put({type: types.DATA_PENDING_START});

        //POST todo to server
        const todo = yield call(() =>
            fetch('/api/todos/', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(action.payload.todo)
            })
                .then(checkHttpStatus)
                .then(res => res.json())
        );

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

/**
 * Fetch todos saga.
 *
 */
export function* fetchTodosSaga() {
    try {
        //dispatch that we will start request now
        yield put({type: types.DATA_PENDING_START});

        //fetch todos from server
        const todos = yield call(() =>
            fetch('/api/todos/')
                .then(checkHttpStatus)
                .then(res => res.json())
        );

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


//create new function on every POST_TODO_START action
function* watchPostTodoStarted() {
    yield* takeEvery(types.POST_TODO_START, postTodoSaga);
}

//create new function on every FETCH_TODOS_START action
function* watchFetchTodoStarted() {
    yield* takeEvery(types.FETCH_TODOS_START, fetchTodosSaga);
}

//fork to start watchers in parallel
export default function* rootSaga() {
    yield fork(watchFetchTodoStarted);
    yield fork(watchPostTodoStarted);
}
