import React from 'react'
import {shallow} from 'enzyme'
import chai from 'chai'
import ErrorAlert from './ErrorAlert'

describe('<ErrorAlert/>', ()=> {
    const TEST_MESSAGE = "test message";

    it('Error alert has message passed to props', () => {
        const shallowErrorAlert = shallow(<ErrorAlert message={TEST_MESSAGE}/>);
        chai.expect(shallowErrorAlert.props().children.find((child)=>child === TEST_MESSAGE)).to.be.not.undefined
    })
});
