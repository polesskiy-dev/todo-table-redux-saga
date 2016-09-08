import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router'
import * as Actions from '../../actions/auth-actions'
import styles from './NavBar.less'

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(Actions.logout())
    };
};

@connect(null, mapDispatchToProps)
export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to='/todo-app' activeClassName={styles.active}>Todos</Link></li>
                        <li><Link to='/about' activeClassName={styles.active}>About</Link></li>
                    </ul>
                    <ul className="nav navbar-nav pull-right">
                        <li>
                            <button
                                className="btn btn-link"
                                onClick={this.props.logout}
                            >Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}