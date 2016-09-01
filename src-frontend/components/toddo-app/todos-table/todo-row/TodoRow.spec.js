import React from 'react'
import {shallow} from 'enzyme'
import chai from 'chai'
import TodoRow from './TodoRow'

const mockTodo = (isDone, text) => {
    return {
        isDone,
        text
    }
}

describe('<TodoRow />', () => {
    it('Done todo has OK glyphicon', () => {
        const todo = mockTodo(true, "1");
        const wrapper = shallow(<TodoRow todo={todo}/>);
        chai.expect(wrapper.find('span').hasClass('glyphicon-ok')).to.be.true;
    });

    it('Not done todo has remove glyphicon', () => {
        const todo = mockTodo(false, "1");
        const wrapper = shallow(<TodoRow todo={todo}/>);
        chai.expect(wrapper.find('span').hasClass('glyphicon-remove')).to.be.true;
    });
});