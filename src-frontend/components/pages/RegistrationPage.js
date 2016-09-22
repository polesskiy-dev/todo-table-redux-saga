import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import Joi from 'joi-browser'
import * as Actions from '../../actions/auth-actions'

export class FormGroupInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: fromJS({
                isPristine: true,
                isValid: false,
                value: ""
            })
        };

        /**
         * State changes hook, invokes after component re-rendering
         * Invokes parent stateChanged function (from props) only if previous state !== current state (need to avoid infinite loop)
         */
        this.componentDidUpdate = (prevProps, prevState) => {
            if (JSON.stringify(prevState) !== JSON.stringify(this.state))
                props.stateChanged({[props.name]: this.state.field});
        };

        /**
         * Event handlers object
         */
        this.eventHandlers = {
            /** input focused */
            onFocus: (e)=> {
                e.preventDefault();

                this.setState({data: this.state.field.set('isPristine', true)});
            },

            /** input loose focus */
            onBlur: (e)=> {
                e.preventDefault();

                this.setState({
                    field: this.state.field
                        .set('isValid', props.validate(this.state.field.get('value')))
                        .set('isPristine', false)
                });
            },

            /** input value changed */
            onChange: (e)=> {
                e.preventDefault();

                this.setState({field: this.state.field.set('value', e.target.value)});
            }
        }
    }

    render() {
        const isValid = this.state.field.get('isValid');
        const isPristine = this.state.field.get('isPristine');
        const {name, label, type} = this.props;

        return <div
            className={`form-group has-feedback ${isPristine ? "" : (isValid ? "has-success" : "has-error")}`}>
            <label className="control-label" htmlFor={name}>{label}</label>
            <input {...this.eventHandlers} className="form-control" placeholder={label} name={name} type={type}/>
            <span
                className={`glyphicon form-control-feedback ${isPristine ? "" : (isValid ? "glyphicon-ok" : "glyphicon-remove")}`}/>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: (credentials) => dispatch(Actions.registerStart(credentials)),
});

@connect(null, mapDispatchToProps)
export default class RegistrationPage extends Component {
    static FIELD_NAMES = {
        login: "login",
        password: "password",
        confirmPassword: "confirmPassword",
        email: "email"
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
                        <FormGroupInput
                            validate={(login)=>Joi.string().min(3).max(15).required().validate(login).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Login"
                            type="text"
                            name={FIELD_NAMES.login}
                        />
                        <FormGroupInput
                            validate={(email)=>Joi.string().email().required().validate(email).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Email"
                            type="email"
                            name={FIELD_NAMES.password}
                        />
                        <FormGroupInput
                            validate={(password)=>Joi.string().min(3).max(15).required().validate(password).error ? false : true}
                            stateChanged={this.childStateChanged}
                            label="Password"
                            type="password"
                            name={FIELD_NAMES.confirmPassword}
                        />
                        <FormGroupInput
                            validate={(confirmPassword)=> this.state.formFields.get(FIELD_NAMES.password).get('value') === confirmPassword && this.state.formFields.get(FIELD_NAMES.password).get('isValid')}
                            stateChanged={this.childStateChanged}
                            label="Confirm password"
                            type="password"
                            name={FIELD_NAMES.email}
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