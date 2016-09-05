import React from 'react'
// import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer';
import chai from 'chai'
import ErrorAlert from './ErrorAlert'

describe('<ErrorAlert/>', ()=> {
    const TEST_MESSAGE = "test message";

    it('Error alert has message passed to props', () => {

        //    expect(sum(1, 2)).toBe(3);
        const componentErrorAlert = renderer.create(<ErrorAlert message={TEST_MESSAGE}/>);
        const errorAlert = componentErrorAlert.toJSON();

        chai.expect(errorAlert.children.find((child)=>child === TEST_MESSAGE)).to.be.not.undefined
    })
});

