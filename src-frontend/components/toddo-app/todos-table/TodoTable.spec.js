import React from 'react'
import {mount} from 'enzyme'
import chai from 'chai'
import {Map, List} from 'immutable'
import configureStore from 'redux-mock-store'
import TodosTable from './TodosTable'
import TodoRow from './todo-row/TodoRow'

/**
 * Render container
 * @param initialState - mock store state
 * @returns {*|!ReactDOMComponent}
 */
const TodosTableWrapper = (initialState = Map({
    "todos": List()
})) => {
    //construct mock store
    const mockStore = configureStore();
    const store = mockStore(initialState);

    /*
     * Render container, we use mount,
     * full DOM rendering is ideal for use cases where you have components that may interact with DOM apis
     */
    return mount(<TodosTable store={store}/>)
};

const mockTodo = (isDone, text) => {
    return Map({
        isDone,
        text
    })
};

describe('<TodosTable />', () => {
    it('Table contains 0 row - as in mock store', () => {
        const wrapper = TodosTableWrapper(
            Map({
                "todos": List([])
            }));
        chai.expect(wrapper.find(TodoRow)).to.have.length(0)
    });

    it('Table contains 2 row - as in mock store', () => {
        const wrapper = TodosTableWrapper(
            Map({
                "todos": List([mockTodo(true, "1"), mockTodo(false, "2")])
            }));
        chai.expect(wrapper.find(TodoRow)).to.have.length(2)
    });
});