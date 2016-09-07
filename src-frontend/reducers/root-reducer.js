import {Map, List} from 'immutable'
import * as types from '../constants/action-types'
const initialTodosState = Map({
    'todos': List([]),
    "openedConnectionsAmount": 0,
    'errors': List([])
});

const rootReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        /** POST todo */
        case types.POST_TODO_SUCCESS:
            return state.update('todosApi', todos=>todos.push(Map(action.payload.todo)));
        case types.POST_TODO_FAILURE:
            return state;

        /** fetch todosApi */
        case types.FETCH_TODOS_SUCCESS:
            return state.set('todosApi', List(action.payload.todos.map((todo)=>Map(todo))));
        case types.FETCH_TODOS_FAILURE:
            return state;

        /** error message handle */
        case types.SHOW_ERROR_NOTIFICATION:
            return state.update('errors', list=>list.push(action.payload.message));
        case types.HIDE_ERROR_NOTIFICATION:
            return state.update('errors', list=>list.shift());

        /**data pending*/
        case types.DATA_PENDING_START:
            return state.update('openedConnectionsAmount', val=>++val);
        case types.DATA_PENDING_FINISHED:
            return state.update('openedConnectionsAmount', val=>--val);

        /** default */
        default:
            console.log("Default in root-reducer invoked, state: ", state);
            return state;
    }
};

export default rootReducer