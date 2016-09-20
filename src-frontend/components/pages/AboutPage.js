import React from 'react'

const About = () => {
    return <article className="panel panel-default">
        <div className="panel-heading">
            <p>About this demo app:</p>
        </div>
        <div className="panel-body">
            <h2>Allows to:</h2>
            <ul>
                <li>create simple todo item</li>
                <li>save it in server RAM</li>
                <li>fetch all todos and show them in table.</li>
            </ul>
            <h3>To illustrate async saga effects:</h3>
            <p>Server has 0.5s delay before response - to show spinner. Also, can randomly response with "500" status
                and error - to invoke saga actions: display error alerts. Alerts will be hide after 3s delay one by
                one.</p>
            <h3>Used libs:</h3>
            <p>ES6, NodeJS, React, Redux, Webpack, Babel, LESS. immutable js, redux-saga, eslint, autoprefixer.</p>
        </div>
    </article>
}

export default About;