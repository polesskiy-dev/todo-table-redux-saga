import {Map, List} from 'immutable'
import * as types from '../constants/action-types'

export const todos = (todosList, action) => {
    switch (action.type) {
        /** POST todo */
        case types.POST_TODO_SUCCESS:
            return todosList.push(Map(action.payload.todo));
        case types.POST_TODO_FAILURE:
            return todosList;

        /** fetch todosApi */
        case types.FETCH_TODOS_SUCCESS:
            return List(action.payload.todos.map((todo)=>Map(todo)));
        case types.FETCH_TODOS_FAILURE:
            return todosList;

        /** default */
        default:
            return todosList;
    }
};

export default todos