import React, {Component} from 'react'
import {fromJS} from 'immutable'

export default class InputFormGroup extends Component {
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

                this.setState({field: this.state.field.set('isPristine', true)});
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