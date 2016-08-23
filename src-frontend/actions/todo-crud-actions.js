import * as types from '../constants/action-types'

/**
 * Todos CRUD actions
 */
//POST todo
export const postTodoStart = (todo) => {
    return {
        type: types.POST_TODO_START,
        payload: {
            todo: todo,
        }
    }
};

export const postTodoSuccess = (todo) => {
    return {
        type: types.POST_TODO_SUCCESS,
        payload: {
            todo: todo,
        }
    }
};

export const postTodoFailure = (err) => {
    return {
        type: types.POST_TODO_FAILURE,
        payload: {
            err: err,
        }
    }
};

//UPDATE todo
export const updateTodoStart = (todo) => {
    return {
        type: types.UPDATE_TODO_START,
        payload: {
            todo: todo,
        }
    }
};

export const updateTodoSuccess = (res) => {
    return {
        type: types.UPDATE_TODO_SUCCESS,
        payload: {
            res: res,
        }
    }
};

export const updateTodoFailure = (err) => {
    return {
        type: types.UPDATE_TODO_FAILURE,
        payload: {
            err: err,
        }
    }
};

//DELETE todo
export const deleteTodoStart = (todo) => {
    return {
        type: types.POST_TODO_START,
        payload: {
            todo: todo,
        }
    }
};

export const deleteTodoSuccess = (res) => {
    return {
        type: types.POST_TODO_SUCCESS,
        payload: {
            res: res,
        }
    }
};

export const deleteTodoFailure = (err) => {
    return {
        type: types.POST_TODO_FAILURE,
        payload: {
            err: err,
        }
    }
};

//Fetch todos list
export const fetchTodosStart = () => {
    return {
        type: types.FETCH_TODOS_START,
    }
};

export const fetchTodosSuccess = (todos) => {
    return {
        type: types.FETCH_TODOS_SUCCESS,
        payload: {
            todos: todos
        }
    }
};

export const fetchTodosFailure = (err) => {
    return {
        type: types.FETCH_TODOS_FAILURE,
        payload: {
            err: err
        }
    }
};

