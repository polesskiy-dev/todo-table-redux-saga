import React, {Component} from 'react'
import {connect} from 'react-redux'
import Joi from 'joi-browser'
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
    /**
     * Validate input text.
     *
     * @param text
     * @returns {boolean}
     */
    isValidText = (text) => Joi.validate(text, Joi.string().required()).error ? false : true;

    /**
     * Handle submit event.
     * Construcet new todo from form values.
     *
     * @param event
     */
    handleSubmit = (event) => {
        const DUMMY_TEXT = "Lorem ipsum";
        event.preventDefault();

        //construct todo from form fields
        const newTodo = {
            text: this.isValidText(this.refs.textInput.value.trim()) ? this.refs.textInput.value.trim() : DUMMY_TEXT,
            isDone: false
        };

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
                </fieldset>
                <button form="create-todo-form" type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-upload"/>
                    Submit
                </button>
            </form>
        )
    }
}
