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

function checkHttpStatus(res) {
    if (!res.ok) {
        throw "Error while fetching data";
    }
    return res;
}

/**
 * POST new todo.
 *
 * @param action
 */
function* postTodoSaga(action, sagaId¢) {
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
        yield put(errorActions.showErrorNotification(sagaId, err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(3000);
        yield put(errorActions.hideErrorNotification(sagaId))
    }
}

/**
 * Fetch todos saga.
 *
 * @param sagaId - saga ID
 */
function* fetchTodosSaga(sagaId) {
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
        yield put(errorActions.showErrorNotification(sagaId, err.toString()));

        //dispatch that request finished
        yield put({type: types.DATA_PENDING_FINISHED});

        //hide notification after delay
        yield delay(3000);
        yield put(errorActions.hideErrorNotification(sagaId))
    }
}


//create new function on every POST_TODO_START action
function* watchPostTodoStarted() {
    yield* takeEvery(types.POST_TODO_START, postTodoSaga);
}

//create new function on every FETCH_TODOS_START action
function* watchFetchTodoStarted() {
    let sagaId = 0;
    yield* takeEvery(types.FETCH_TODOS_START, ()=>fetchTodosSaga(sagaId++));
}

//fork to start watchers in parallel
export default function* rootSaga() {
    yield fork(watchFetchTodoStarted);
    yield fork(watchPostTodoStarted);
}



const addAProperty = (obj) => {
    return obj.A = 1;
}


const addAProperty = (obj) => {
    return {...obj, A: 1};
}