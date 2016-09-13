import React, {Component} from 'react'
import NavBar from './nav-bar/NavBar'
import NotificationsContainer from './notifications-container/NotificationsContainer'
/**
 * Root component
 */
class App extends Component {
    render() {
        return (
            <div>
                <header className="container">
                    <NavBar/>
                    <NotificationsContainer/>
                </header>
                <section className="container">
                    {/*render childs from router here*/}
                    {this.props.children}
                </section>
            </div>
        );
    }
}

export default App;