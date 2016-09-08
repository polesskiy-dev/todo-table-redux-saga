import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import AuthForm from './components/auth-form/AuthForm'
import TodoPage from './components/toddo-app/TodoPage'
import About from './components/about/About'

/**
 * Check that auth token exists in local or session storage
 */
const checkAuthTokenExists = () => window.localStorage.getItem('token') || window.sessionStorage.getItem('token');

/**
 * Try to enter to route that requires auth token exists.
 * Redirect to root path if auth token doesn't exists.
 * @param nextState
 * @param replace
 */
const enterToAuthRequiredRoute = (nextState, replace)=> {
    if (!checkAuthTokenExists())
        replace('/auth')
};

export const routes =
    <Route path='/' component={App}>
        <IndexRoute component={AuthForm}/>
        <Route path='auth' component={AuthForm}/>
        <Route path='todo-app' component={TodoPage} onEnter={enterToAuthRequiredRoute}/>
        <Route path='about' component={About} onEnter={enterToAuthRequiredRoute}/>
    </Route>