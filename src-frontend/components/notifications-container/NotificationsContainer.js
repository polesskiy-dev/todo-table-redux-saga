import React, {Component} from 'react'
import {connect} from 'react-redux';
import ErrorAlert from './error-alert/ErrorAlert'
import styles from './NotificationsContainer.less'

const mapStateToProps = (state) => {
    return {
        errors: state.get('errors'),
        openedConnections: state.get('openedConnections')
    }
};

@connect(mapStateToProps)
export default class NotificationsContainer extends Component {
    render() {
        const errors = this.props.errors;
        return (
            <article>
                {errors.map((error, index) => <ErrorAlert key={index} message={error}/>)}
                <span
                    className={`glyphicon glyphicon-refresh ${styles.centered} ${this.props.openedConnections > 0 ? styles['glyphicon-refresh-animate'] : styles.hide}`}/>
            </article>
        )
    }
}