import React from 'react'
import NewTodoForm from './new-todo-form/NewTodoForm'
import TodosTable from './todos-table/TodosTable'

const TodoApp = () => {
    return <section>
        <article className="panel panel-default">
            <div className="panel-heading">
                <p>Create new todo:</p>
            </div>
            <div className="panel-body">
                <NewTodoForm/>
            </div>
        </article>

        <article className="panel panel-default">
            <div className="panel-heading">
                <p>Todos list:</p>
            </div>
            <div className="panel-body">
                <TodosTable/>
            </div>
        </article>
    </section>
}

export default TodoApp;