/**
 * Test form with enzyme
 *
 * @see http://airbnb.io/enzyme/docs/api
 */
import "babel-polyfill";
import React from 'react'
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import chai from 'chai'
import NewTodoForm from './NewTodoForm'

describe('<NewTodoForm />', () => {
    it("Should have success class while input is valid", ()=> {
        const mockStore = configureStore();
        const store = mockStore({});
        const typeTextEvent = {target: {value: 'hello'}};
        const wrapper = mount(<NewTodoForm store={store}/>);

        const textInput = wrapper.find('input').first();
        //wrapper.find('input').render();
        textInput.simulate('focus');
        textInput.simulate('change', typeTextEvent);
        textInput.simulate('blur');

        console.log(document.getElementsByTagName('input'));

        chai.expect(textInput.hasClass("form-control-success")).to.be.true;
    })

    it("Should have danger class while input is unfocused with empty value", ()=> {
        const mockStore = configureStore();
        const store = mockStore({});
        const emptyTextEvent = {target: {value: ''}};
        const wrapper = mount(<NewTodoForm store={store}/>);

        const textInput = wrapper.find('input');
        textInput.simulate('focus');
        textInput.simulate('change', emptyTextEvent);
        textInput.simulate('blur');

        chai.expect(textInput.hasClass("form-control-danger")).to.be.true;
    })
});

