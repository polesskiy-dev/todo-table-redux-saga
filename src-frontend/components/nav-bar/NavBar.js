import React, {Component} from 'react'
import { Link } from 'react-router'

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to='/todo-app'>Todos</Link></li>
                        <li><Link to='/about'>About</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}