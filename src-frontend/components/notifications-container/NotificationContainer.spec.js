import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {Map, List} from 'immutable'
import chai from 'chai'
import configureStore from 'redux-mock-store'
import NotificationsContainer from './NotificationsContainer'
import ErrorAlert from './error-alert/ErrorAlert'
import styles from './NotificationsContainer.less'

describe("Notification container content", function () {
    /**
     * Render container
     * @param initialState - mock store state
     * @returns {*|!ReactDOMComponent}
     */
    const renderNotificationsContainer = (initialState = Map({
        "errors": List(),
        "dataPending": Map({
            openedConnectionsAmount: 0
        })
    })) => {
        //construct mock store
        const mockStore = configureStore();
        const store = mockStore(initialState);

        //render container
        return TestUtils.renderIntoDocument(
            <NotificationsContainer store={store}/>
        );
    };

    it("Loading spinner span is hide when opened connections amount == 0", ()=> {
        const notificationsContainer = renderNotificationsContainer();
        const loadingSpinnerSpan = TestUtils.findRenderedDOMComponentWithTag(notificationsContainer, 'span');
        chai.expect(loadingSpinnerSpan.className).to.have.string(styles.hide);
    });

    it("Loading spinner span is displayed when opened connections amount == 1", ()=> {
        const notificationsContainer = renderNotificationsContainer(
            Map({
                "errors": List(),
                "dataPending": Map({
                    openedConnectionsAmount: 1
                })
            }));
        const loadingSpinnerSpan = TestUtils.findRenderedDOMComponentWithTag(notificationsContainer, 'span');
        chai.expect(loadingSpinnerSpan.className).to.not.have.string(styles.hide);
    });

    it("Contains no error alerts when errors List empty in store", ()=> {
        const notificationsContainer = renderNotificationsContainer();
        const errorAlerts = TestUtils.scryRenderedComponentsWithType(notificationsContainer, ErrorAlert);
        chai.expect(errorAlerts).to.be.empty;
    });
});