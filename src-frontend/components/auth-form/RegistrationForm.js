/**
 *
 * @see http://redux-form.com/6.0.2/
 * @see https://github.com/erikras/redux-form
 */
"use strict";

import React, {Component} from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {connect} from 'react-redux'
import * as Actions from '../../actions/auth-actions'

const mapDispatchToProps = (dispatch) => ({
    register: (credentials) => dispatch(Actions.registerStart(credentials))
});

@connect(null, mapDispatchToProps)
@reduxForm({
    form: 'registrationForm'
})
export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
    }

    submit = (values, {login, email, password, passwordConfirm} = values) => {
        console.log("Form values: ", values);
        if (password !== passwordConfirm) {
            throw new SubmissionError({passwordConfirm: 'Passwords doesn\'t match', _error: 'Login failed!'})
        } else {
            this.props.register({login, email, password})
        }
    }


    render() {
        const {error, handleSubmit, submitting} = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} className="col-md-4 col-md-offset-4">
                <fieldset>
                    <Field name="login" label="Login" type="text" component={renderField}/>
                    <Field name="email" label="E-mail" type="email" component={renderField}/>
                    <Field name="password" label="Password" type="password" component={renderField}/>
                    <Field name="passwordConfirm" label="Confirm password" type="password" component={renderField}/>
                    {error && <strong>{error}</strong>}
                </fieldset>
                <button className="btn btn-default" type="submit" disabled={submitting}>Submit</button>
            </form>
        );
    }
}


const renderField = (values) =>   // Define stateless component to render input and errors
    <div className="form-group">
        <label>{values.label}</label>
        <div>
            <input className="form-control"
                   {...values.input}
                   value={values.value}
                   type={values.type}
                   placeholder={values.label}
            />
            {values.touched && values.error && <span>{values.error}</span>}
        </div>
    </div>

// // Decorate the form component
// export default reduxForm({
//     form: 'registrationForm' // a unique name for this form
// })(RegistrationForm);

