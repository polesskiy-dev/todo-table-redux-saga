/**
 *
 * @see http://redux-form.com/6.0.2/
 * @see https://github.com/erikras/redux-form
 */
"use strict";

import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import * as Actions from '../../actions/auth-actions'

const mapDispatchToProps = (dispatch) => ({
    register: (credentials, rememberMeFlag) => dispatch(Actions.registerStart(credentials, rememberMeFlag))
});

@connect(null, mapDispatchToProps)
@reduxForm({form: 'registration'})
export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (data)=> {
            data.preventDefault();
            console.log("handleSubmit arguments: ", data);
            //TODO: here must be dispatch registration
        }
    }

    render() {
        const {handleSubmit} = this;
        return (
            <form onSubmit={handleSubmit} className="col-md-4 col-md-offset-4">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="login">Last Name</label>
                        <Field name="login" component={renderInput} type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Last Name</label>
                        <Field name="password" component={renderInput} type="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Last Name</label>
                        <Field name="confirmPassword" component={renderInput} type="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" component={renderInput} type="email"/>
                    </div>
                    <button className="btn btn-default" type="submit">Submit</button>
                </fieldset>
            </form>
        );
    }
}

const renderInput = field =>   // Define stateless component to render input and errors
    <div>
        <input className="form-control" {...field.input} type={field.type}/>
    </div>


// Decorate the form component
// ContactForm = reduxForm({
//     form: 'contact' // a unique name for this form
// })(ContactForm);

