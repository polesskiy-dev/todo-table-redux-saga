import React, {Component} from 'react'
import {fromJS} from 'immutable'

export default class CheckBoxFormGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: fromJS({
                isValid: true,
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
            /** input value changed */
            onClick: (e)=> {
                this.setState({field: this.state.field.set('value', e.target.checked)});
            }
        }
    }

    render() {
        const {name, label} = this.props;

        return <div className="form-group">
            <div className="checkbox">
                <label>
                    <input {...this.eventHandlers} name={name} type="checkbox"/>
                    {label}
                </label>
            </div>
        </div>
    }
}
