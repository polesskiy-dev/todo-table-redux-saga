import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as Actions from '../../actions/todo-crud-actions'
import TodoRow from './todo-row/TodoRow'
//import styles from './TodosTable.less'

const mapStateToProps = (state) => {
    return {
        todos: state.get('todos')
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => {
            dispatch(Actions.fetchTodosStart());
        },
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class TodosTable extends Component {
    render() {
        const todos = this.props.todos;
        return (
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th>Text:</th>
                    <th>Is done:</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <td>
                        <button onClick={this.props.fetchTodos} className="btn btn-default">
                            <span className="glyphicon glyphicon-refresh"/>
                            Manually update
                        </button>
                    </td>
                </tr>
                </tfoot>
                <tbody>
                {todos.map((todo, index) => <TodoRow key={index} todo={todo.toObject()}/>)}
                </tbody>
            </table>
        )
    }
}