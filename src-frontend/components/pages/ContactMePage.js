import React, {Component} from 'react'
import Joi from 'joi-browser'

export class FormGroupInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPristine: true,
            isValid: false,
            value: "",
            ...props //map props to state
        };

        /**
         * Handle state change.
         * Invoke passed handleStateChange through props.
         *
         * @param newState
         */
        this.handleStateChange = (newState) => this.state.handleStateChange(newState);

        /**
         * Event handlers object
         */
        this.eventHandlers = {
            onFocus: (e)=> {
                e.preventDefault();

                this.setState({isPristine: true});
                this.handleStateChange({[this.state.name]: this.state});
            },
            onBlur: (e)=> {
                e.preventDefault();

                this.setState({isPristine: false});
                this.setState({isValid: this.state.validate()});
                this.handleStateChange({[this.state.name]: this.state});
            },
            onChange: (e, {value}=e.target)=> {
                e.preventDefault();

                this.setState({value});
                this.handleStateChange({[this.state.name]: this.state});
            }
        };
    }

    render() {
        const {name, label, type, isPristine, isValid} = this.state;
        return <div className={`form-group has-feedback ${isPristine ? "" : (isValid ? "has-success" : "has-error")}`}>
            <label className="control-label" htmlFor={name}>{label}</label>
            <input {...this.eventHandlers} className="form-control" placeholder={label} name={name} type={type}/>
            <span
                className={`glyphicon form-control-feedback ${isPristine ? "" : (isValid ? "glyphicon-ok" : "glyphicon-remove")}`}/>
        </div>
    }
}

export class FormGroupCheckBox extends Component {
    render() {
        const {label} = this.props;
        return <div className="form-group">
            <label>
                <input type="checkbox"/>{label}
            </label>
        </div>
    }
}

export class FormGroupTextArea extends Component {
    render() {
        const {name, label, rows} = this.props;
        return <div className="form-group">
            <label className="fcontrol-label" htmlFor={name}>{label}</label>
            <textarea className="form-control" rows={rows} name={name}/>
        </div>
    }
}

export class FormGroupSelect extends Component {
    render() {
        const {name, label} = this.props;
        const options = this.props.options.map((option, index) => <option key={index}>{option}</option>);
        return <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" name={name}>
                {options}
            </select>
        </div>
    }
}

export default class ContactMePage extends Component {
    constructor(props) {
        super(props);

        const FIELD_NAMES = {
            login: "login",
            password: "password",
            confirmPassword: "confirmPassword",
            email: "email"
        };

        this.state = {
            [FIELD_NAMES.login]: {
                validate: ()=> {
                    console.log("validating login...");
                    return false;
                },
                type: "text",
                name: FIELD_NAMES.login
            },
            [FIELD_NAMES.password]: {
                validate: ()=> {
                    console.log("validating password...");
                    return false;
                },
                type: "password",
                name: FIELD_NAMES.password
            },
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
        };

        this.handleStateChange = (childState) => {
            //combine this state and child's state
            this.setState(Object.assign({}, this.state, childState));
        }
    }

    render() {
        return <section>
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <FormGroupInput handleStateChange={this.handleStateChange} {...this.state.login} label="Login"/>
                    {/*<FormGroupInput label="Email" type="email"/>*/}
                    <FormGroupInput handleStateChange={this.handleStateChange} {...this.state.password}
                                    label="Password"/>
                    {/*<FormGroupInput label="Confirm password" type="password"/>*/}
                    {/*<FormGroupSelect label="Yes or no?" options={["Yes", "No"]}/>*/}
                    {/*<FormGroupCheckBox label="Remember me"/>*/}
                    {/*<FormGroupTextArea label="Additional info" rows={3}/>*/}

                </fieldset>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
            <article>
                <pre className="well">
                    {JSON.stringify(this.state, null, '\t')}
                </pre>
            </article>
        </section>
    }
}