import React, {Component} from 'react'
import CreateTodoForm from './create-todo-form/CreateTodoForm'
import TodosTable from './todos-table/TodosTable'
import NotificationsContainer from './notifications-container/NotificationsContainer'

/**
 * Root component
 */
class App extends Component {
    render() {
        return (
            <div>
                <header>
                </header>
                <section className="container">
                    <article className="panel panel-default">
                        <div className="panel-heading">
                            <p>Create new todo:</p>
                        </div>
                        <div className="panel-body">
                            <CreateTodoForm/>
                        </div>
                    </article>

                    <article className="panel panel-default">
                        <div className="panel-heading">
                            <p>Todos:</p>
                        </div>
                        <div className="panel-body">
                            <TodosTable/>
                        </div>
                    </article>

                    <NotificationsContainer/>

                </section>
            </div>
        );
    }
}

export default App;