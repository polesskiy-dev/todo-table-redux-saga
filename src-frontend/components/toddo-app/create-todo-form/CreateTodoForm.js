import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as Actions from '../../../actions/todo-crud-actions'

const mapDispatchToProps = (dispatch) => {
    return {
        createNewTodoItem: (todo) => {
            dispatch(Actions.postTodoStart(todo))
        },
    };
};

@connect(null, mapDispatchToProps)
export default class CreateTodoForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        //construct todo from form fields
        const newTodo = {};
        newTodo.text = this.refs.textInput.value.trim();
        newTodo.isDone = this.refs.isDoneCheckBox.checked;

        this.props.createNewTodoItem(newTodo);
    };

    render() {
        return (
            <form id="create-todo-form" action="/api/todos"
                  onSubmit={this.handleSubmit}>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="textInput">Text:</label>
                        <input ref="textInput" type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="isDoneCheckBox">Is done:</label>
                        <input ref="isDoneCheckBox" type="checkbox"/>
                    </div>
                </fieldset>
                <button form="create-todo-form" type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-upload"/>
                    Submit
                </button>
            </form>
        )
    }
}
