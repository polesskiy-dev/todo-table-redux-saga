import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from './NavBar.less'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to='/todo-app' activeClassName={styles.active}>Todos</Link></li>
                        <li><Link to='/about' activeClassName={styles.active}>About</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}