import React, {Component} from 'react'
import {connect} from 'react-redux'
//import Joi from 'joi-browser'
import * as Actions from '../../actions/auth-actions'

const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => dispatch(Actions.registerStart(credentials)),
        login: (credentials) => dispatch(Actions.loginStart(credentials))
    };
};

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
            email: {
                isValid: false,
                isValidating: false,
                validationMessage: "",
                value: "",
            }
        }
    }

    /**
     * Handle form submit.
     * Dispatch user credentials.
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            login: this.state.login.value,
            password: this.state.password.value
        };

        if (this.state.isRegistrationForm)
            this.props.register(Object.assign({}, credentials, {email: this.state.email.value}));
        else
            this.props.login(credentials)
    };

    handleLoginChange = (e, {value}=e.target) => {
        e.preventDefault();
        // const newLogin = Object.assign({}, this.state.login, {value: e.target.value});
        const newLogin = {...this.state.login, value};
        this.setState({login: newLogin});
        console.log(this.state);
    };

    handlePasswordChange = (e, {value} = e.target) => {
        e.preventDefault();
        // const newPassword = Object.assign({}, this.state.password, {value: e.target.value});
        const newPassword = {...this.state.password, value};
        this.setState({password: newPassword});
        console.log(this.state);
    };

    handleEmailChange = (e, {value}=e.target) => {
        e.preventDefault();
        //const newEmail = Object.assign({}, {...this.state.email}, {value: e.target.value});
        const newEmail = {...this.state.email, value};
        this.setState({email: newEmail});
        console.log(this.state);
    };

    handleFormTypeToggle = () => {
        event.preventDefault();
        this.setState({isRegistrationForm: !this.state.isRegistrationForm})
    };

    render() {
        let {login, password, email} = this.state;
        return (
            <section className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-offset-3 col-lg-6">
                        <article className="panel panel-default ">
                            <div className="panel-heading">
                                Please login or register.
                            </div>
                            <div className="panel-body">
                                <form id="auth-form" onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        {/**login*/}
                                        <div
                                            className={`form-group ${ login.isValidating ? login.isValid ? "has-success" : "has-error" : ""}`}>
                                            <label className="control-label" htmlFor="loginInput">
                                                Login: {login.validationMessage}</label>
                                            <input className="form-control"
                                                   ref="loginInput" type="text"
                                                   onChange={this.handleLoginChange}
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
                                                   value={password.value}
                                            />
                                        </div>

                                        {/**email*/}
                                        {this.state.isRegistrationForm ?
                                            <div
                                                className={`form-group ${ email.isValidating ? email.isValid ? "has-success" : "has-error" : ""}`}>
                                                <label className="control-label" htmlFor="loginInput">
                                                    Email: {email.validationMessage}</label>
                                                <input className="form-control"
                                                       ref="emailInput" type="email"
                                                       onChange={this.handleEmailChange}
                                                       value={email.value}
                                                />
                                            </div> : ""
                                        }
                                    </fieldset>
                                    <button form="auth-form" type="submit" className="btn btn-default">
                                        {this.state.isRegistrationForm ? "Register" : "Login"}
                                    </button>
                                    <span><button className="btn btn-link" onClick={this.handleFormTypeToggle}>
                                        {this.state.isRegistrationForm ? "Already registered?" : "Doesn't have account yet?"}
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