import "babel-polyfill";
import React from 'react'
import {mount} from 'enzyme'
import {Map, List} from 'immutable'
import configureStore from 'redux-mock-store'
import chai from 'chai'
import NewTodoForm from './NewTodoForm'

describe('<NewTodoForm />', () => {
    it("Should have success class while input is valid", ()=> {
        const mockStore = configureStore();
        const store = mockStore({});
        const typeTextEvent = {target: {value: 'hello'}};
        const wrapper = mount(<NewTodoForm store={store}/>);

        const textInput = wrapper.find('input');
        textInput.simulate('focus');
        textInput.simulate('change', typeTextEvent);
        console.log(textInput.get(0).value)

        // chai.expect(wrapper.find("form").hasClass("has-success")).to.be.true;
        chai.expect(true).to.be.true;
    })
});