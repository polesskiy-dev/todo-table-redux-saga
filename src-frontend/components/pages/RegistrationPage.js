import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import Joi from 'joi-browser'
import * as Actions from '../../actions/auth-actions'
import InputFormGroup from '../form-group/InputFormGroup'
import CheckBoxFormGroup from '../form-group/CheckBoxFormGroup'
import SelectFormGroup from '../form-group/SelectFormGroup'

const mapDispatchToProps = (dispatch) => ({
    register: (credentials) => dispatch(Actions.registerStart(credentials)),
});

@connect(null, mapDispatchToProps)
export default class RegistrationPage extends Component {
    static FIELD_NAMES = {
        login: "login",
        password: "password",
        confirmPassword: "confirmPassword",
        email: "email",
        rememberMe: "rememberMe",
        something: "something"
    };

    constructor(props) {
        super(props);
        const {FIELD_NAMES} = RegistrationPage;

        this.state = {
            formFields: fromJS({
                [FIELD_NAMES.login]: {},
                [FIELD_NAMES.password]: {},
                [FIELD_NAMES.confirmPassword]: {},
                [FIELD_NAMES.email]: {}
            })
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
            const isAllValid = this.state.formFields.every((field)=>field.get('isValid'));
            const credentials = this.state.formFields.map((field)=>field.get('value')).toJS();

            if (isAllValid) props.register(credentials)
        };


        this.childStateChanged = (childState) => {
            this.setState({formFields: this.state.formFields.mergeDeep(childState)});
        }
    }

    render() {
        const {FIELD_NAMES} = RegistrationPage;
        return <div>
            <article className="col-sm-6">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <InputFormGroup
                            validate={(login)=>Joi.string().min(3).max(15).required().validate(login).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Login"
                            type="text"
                            name={FIELD_NAMES.login}
                        />
                        <InputFormGroup
                            validate={(email)=>Joi.string().email().required().validate(email).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Email"
                            type="email"
                            name={FIELD_NAMES.password}
                        />
                        <InputFormGroup
                            validate={(password)=>Joi.string().min(3).max(15).required().validate(password).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Password"
                            type="password"
                            name={FIELD_NAMES.confirmPassword}
                        />
                        <InputFormGroup
                            validate={(confirmPassword)=> this.state.formFields.get(FIELD_NAMES.password).get('value') === confirmPassword && this.state.formFields.get(FIELD_NAMES.password).get('isValid')}
                            stateChanged={this.childStateChanged}
                            label="Confirm password"
                            type="password"
                            name={FIELD_NAMES.email}
                        />
                        <SelectFormGroup
                            stateChanged={this.childStateChanged}
                            label="Select something"
                            name={FIELD_NAMES.something}
                            options={["first", "second", "third"]}
                        />
                        <CheckBoxFormGroup
                            stateChanged={this.childStateChanged}
                            label="Remember me next time"
                            name={FIELD_NAMES.rememberMe}
                        />
                    </fieldset>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </article>
            <article className="col-sm-6">
                <pre className="well">
                    {JSON.stringify(this.state, null, '\t')}
                </pre>
            </article>
        </div>
    }
}