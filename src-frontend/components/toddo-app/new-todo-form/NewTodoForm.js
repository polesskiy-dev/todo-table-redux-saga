'use strict';
import "babel-polyfill";
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
export default class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasValidInput: false,
            inputValidationMessage: "",
        }

    }

    /**
     * Validate input text.
     *
     * @param text
     * @returns {boolean}
     */
    isValidText = (text) => Joi.validate(text, Joi.string().required()).error ? false : true;

    /**
     * Handle text input change, change "valid input" value in state.
     * @param event
     */
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({hasValidInput: this.isValidText(event.target.value)});
    };

    /**
     * Handle input blur (focus loose), show text validation message.
     * @param event
     */
    handleInputBlur = (event) => {
        event.preventDefault();
        const validationMessage = this.state.hasValidInput ? "Success! You've done it" : "Invalid text";
        this.setState({inputValidationMessage: validationMessage});
    };

    /**
     * Handle input focus - clear validation message
     * @param event
     */
    handleInputFocus = (event) => {
        event.preventDefault();
        this.setState({inputValidationMessage: ""});
    };

    /**
     * Handle submit event.
     * Construct new todo from form values.
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
                    <div className={`form-group ${this.state.hasValidInput ? "has-success" : "has-error"}`}>
                        <label htmlFor="textInput">Text:</label>
                        <input ref="textInput" type="text"
                               onChange={this.handleInputChange}
                               onBlur={this.handleInputBlur}
                               onFocus={this.handleInputFocus}
                               className={`form-control ${this.state.hasValidInput ? "form-control-success" : "form-control-danger"}`}/>
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
