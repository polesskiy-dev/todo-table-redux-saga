import React, {Component} from 'react'
import NewTodoForm from './new-todo-form/NewTodoForm'
import TodosTable from './todos-table/TodosTable'
import * as styles from './TodoPage.less'

export default class TodoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewTodoBodyShow: true
        }
    }

    toggleBodyShow = () => {
        this.setState({isNewTodoBodyShow: !this.state.isNewTodoBodyShow})
    };

    render() {
        const {isNewTodoBodyShow} = this.state
        return <section>
            <article className="panel panel-default">
                <div className="panel-heading">
                    <p>Create new todo:<span onClick={this.toggleBodyShow}
                                             className={`glyphicon ${isNewTodoBodyShow ? "glyphicon glyphicon-collapse-up" : "glyphicon-collapse-down" }`}/>
                    </p>
                </div>
                <div
                    className={`panel-body ${isNewTodoBodyShow ? styles['animated-slide-down'] : styles['animated-slide-up']}`}>
                    {isNewTodoBodyShow ? <NewTodoForm/> : ""}
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
}
