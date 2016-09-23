import React, {Component} from 'react'
import {fromJS} from 'immutable'

export default class InputFormGroup extends Component {
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
            onChange: (e)=> {
                //e.preventDefault();
                console.log(e.target.value);

                this.setState({field: this.state.field.set('value', e.target.value)});
            }
        }
    }

    render() {
        const {name, label, options} = this.props;

        return <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" name={name} {...this.eventHandlers}>
                {options.map((optionText, index)=>
                    <option key={index}>
                        {optionText}
                    </option>)}
            </select>
        </div>
    }
}