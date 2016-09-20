import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import AuthForm from './components/auth-form/AuthForm'
import TodoPage from './components/toddo-app/TodoPage'
import About from './components/pages/AboutPage'
import ContactMePage from './components/pages/ContactMePage'
import * as authUtils from './utils/auth-utils'

/**
 * Try to enter to route that requires auth token exists.
 * Redirect to root path if auth token doesn't exists.
 * @param nextState
 * @param replace
 */
const enterToAuthRequiredRoute = (nextState, replace)=> {
    if (!authUtils.authTokenExists())
        replace('/auth')
};

export const routes =
    <Route path='/' component={App}>
        <IndexRoute component={AuthForm}/>
        <Route path='auth' component={AuthForm}/>
        <Route path='todo-app' component={TodoPage} onEnter={enterToAuthRequiredRoute}/>
        <Route path='about' component={About} onEnter={enterToAuthRequiredRoute}/>
        <Route path='contact-me' component={ContactMePage} onEnter={enterToAuthRequiredRoute}/>
    </Route>