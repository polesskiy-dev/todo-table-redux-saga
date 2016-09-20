import React, {Component} from 'react'
import {connect} from 'react-redux'
import Joi from 'joi-browser'
import * as Actions from '../../actions/auth-actions'

const mapDispatchToProps = (dispatch) => ({
    register: (credentials, rememberMeFlag) => dispatch(Actions.registerStart(credentials, rememberMeFlag)),
    login: (credentials, rememberMeFlag) => dispatch(Actions.loginStart(credentials, rememberMeFlag))
});

@connect(null, mapDispatchToProps)
export default class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistrationForm: false,
            login: {
                isValid: false,
                isValidating: false,
                validationMessage: "",
                value: "",
            },
            password: {
                isValid: false,
                isValidating: false,
                validationMessage: "",
                value: "",
            },
            passwordConfirm: {
                isValid: false,
                isValidating: false,
                value: "",
            },
            email: {
                isValid: false,
                isValidating: false,
                validationMessage: "",
                value: ""
            }
        };
    }

    /**
     * Handle form submit.
     * Dispatch user credentials.
     */
    handleSubmit = (e) => {
        e.preventDefault();

        const {isRegistrationForm, login, password, passwordConfirm, email} = this.state;
        const credentials = {
            login: login.value,
            password: password.value
        };

        const rememberMeFlag = this.refs.rememberMeFlagCheckBox.checked;

        if (isRegistrationForm && login.isValid && password.isValid && passwordConfirm.isValid && email.isValid)
            this.props.register({...credentials, email: email.value}, rememberMeFlag);
        else if (!isRegistrationForm && login.isValid && password.isValid)
            this.props.login(credentials, rememberMeFlag)
    };

    /** change form type - login or register*/
    handleFormTypeToggle = () => {
        event.preventDefault();
        this.setState({isRegistrationForm: !this.state.isRegistrationForm})
    };

    /**change handlers*/
    handleLoginChange = (e, {value}=e.target) => {
        e.preventDefault();
        const newLogin = {...this.state.login, value};
        this.setState({login: newLogin});
    };

    handlePasswordChange = (e, {value} = e.target) => {
        e.preventDefault();
        const newPassword = {...this.state.password, value};
        this.setState({password: newPassword});
    };

    handlePasswordConfirmChange = (e, {value} = e.target) => {
        e.preventDefault();
        const newPasswordConfirm = {...this.state.passwordConfirm, value};
        this.setState({passwordConfirm: newPasswordConfirm});
    };

    handleEmailChange = (e, {value}=e.target) => {
        e.preventDefault();
        const newEmail = {...this.state.email, value};
        this.setState({email: newEmail});
    };

    /**blur handlers*/
    handleLoginBlur = (e, {value:login}=e.target) => {
        const {error} = Joi.string().alphanum().min(3).max(30).required().validate(login);
        const isValid = (error === null);
        const validationMessage = isValid ? "Login is OK!" : error.message;
        const newLogin = {...this.state.login, isValidating: true, isValid, validationMessage};

        this.setState({login: newLogin})
    };

    handlePasswordBlur = (e, {value:password}=e.target) => {
        const {error} = Joi.string().min(3).max(15).required().validate(password);
        const isValid = (error === null);
        const validationMessage = isValid ? "Password is OK!" : error.message;
        const newPassword = {...this.state.password, isValidating: true, isValid, validationMessage};
        this.setState({password: newPassword})
    };

    handlePasswordConfirmBlur = (e, {value:passwordConfirm}=e.target) => {
        const error = (passwordConfirm === this.state.password.value ? "" : "Passwords doesn't match!")
        const isValid = (error === "");
        const validationMessage = isValid ? "Passwords match!" : error;
        const newPassword = {...this.state.passwordConfirm, isValidating: true, isValid, validationMessage};
        console.log(this.state.login.value, this.state.password.value, this.state.passwordConfirm.value, this.state.email.value);
        this.setState({passwordConfirm: newPassword})
    };

    handleEmailBlur = (e, {value:email}=e.target) => {
        const {error} = Joi.string().email().required().validate(email);
        const isValid = (error === null);
        const validationMessage = isValid ? "Email is OK!" : error.message;
        const newEmail = {...this.state.email, isValidating: true, isValid, validationMessage};
        this.setState({email: newEmail})
    };

    render() {
        const {login, password, passwordConfirm, email, isRegistrationForm} = this.state;
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-offset-3 col-lg-6">
                        <article className="panel panel-default ">
                            <div className="panel-heading">
                                Please, {isRegistrationForm ? "register" : "login"}
                            </div>
                            <div className="panel-body">
                                <form id="auth-form" onSubmit={this.handleSubmit} noValidate>
                                    <fieldset>
                                        {/**login*/}
                                        <div
                                            className={`form-group ${ login.isValidating ? login.isValid ? "has-success" : "has-error" : ""}`}>
                                            <label className="control-label" htmlFor="loginInput">
                                                Login: {login.validationMessage}</label>
                                            <input className="form-control"
                                                   ref="loginInput" type="text"
                                                   onChange={this.handleLoginChange}
                                                   onBlur={this.handleLoginBlur}
                                                   value={login.value}
                                            />
                                        </div>

                                        {/**password*/}
                                        <div
                                            className={`form-group ${ password.isValidating ? password.isValid ? "has-success" : "has-error" : ""}`}>
                                            <label className="control-label" htmlFor="loginInput">
                                                Password: {password.validationMessage}</label>
                                            <input className="form-control"
                                                   ref="passwordInput" type="password"
                                                   onChange={this.handlePasswordChange}
                                                   onBlur={this.handlePasswordBlur}
                                                   value={password.value}
                                            />
                                        </div>


                                        {isRegistrationForm ?
                                            <div>
                                                {/**password confirm*/}
                                                <div
                                                    className={`form-group ${ passwordConfirm.isValidating ? passwordConfirm.isValid ? "has-success" : "has-error" : ""}`}>
                                                    <label className="control-label" htmlFor="loginInput">
                                                        Confirm password: {passwordConfirm.validationMessage}</label>
                                                    <input className="form-control"
                                                           ref="passwordConfirmInput" type="password"
                                                           onChange={this.handlePasswordConfirmChange}
                                                           onBlur={this.handlePasswordConfirmBlur}
                                                           value={passwordConfirm.value}
                                                    />
                                                </div>

                                                {/**email*/}
                                                <div
                                                    className={`form-group ${ email.isValidating ? email.isValid ? "has-success" : "has-error" : ""}`}>
                                                    <label className="control-label" htmlFor="loginInput">
                                                        Email: {email.validationMessage}</label>
                                                    <input className="form-control"
                                                           ref="emailInput" type="email"
                                                           onChange={this.handleEmailChange}
                                                           onBlur={this.handleEmailBlur}
                                                           value={email.value}
                                                    />
                                                </div>
                                            </div>
                                            : ""
                                        }

                                        <div className="checkbox">
                                            <label>
                                                <input ref="rememberMeFlagCheckBox" type="checkbox"/> Remember me
                                            </label>
                                        </div>
                                    </fieldset>
                                    <button form="auth-form" type="submit" className="btn btn-default">
                                        {isRegistrationForm ? "Register" : "Login"}
                                    </button>
                                    <span><button className="btn btn-link" onClick={this.handleFormTypeToggle}>
                                {isRegistrationForm ? "Already registered?" : "Doesn't have account yet?"}
                                </button></span>
                                </form>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}