import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import AuthForm from './components/auth-form/AuthForm'
import TodoApp from './components/toddo-app/TodoApp'
import About from './components/about/About'

export const routes =
    <Route path='/' component={App}>
        <IndexRoute component={AuthForm}/>
        <Route path='auth' component={AuthForm}/>
        <Route path='todo-app' component={TodoApp}/>
        <Route path='about' component={About}/>
        <Route path='*' component={NoFound}/>
    </Route>