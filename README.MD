# Redux Saga todo-list example [![Build Status](https://travis-ci.org/polesskiy-dev/todo-table-redux-saga.svg?branch=master)](https://travis-ci.org/polesskiy-dev/todo-table-redux-saga)

### Allows to:
* create simple todo item
* save it in server RAM
* fetch all todos and show them in table.

### To illustrate async saga effects:
Server has 0.5s delay before response - to show spinner.
Also, can randomly response with "500" status and error - to invoke saga actions: display error alerts.
Alerts will be hide after 3s delay one by one.

#### Used libs: 
ES6, NodeJS, React, Redux, Webpack, Babel, LESS.
immutable js, redux-saga, eslint, autoprefixer. 

## Local install:

    $ git clone https://github.com/polesskiy-dev/todo-table-redux-saga
    $ cd todo-table-redux-saga    
    $ npm install 
    $ npm start
    
### Docker:
    
    #build all by Dockerfile instructions image named as "username/todo-table-redux-saga"
    $ docker build -t username/todo-table-redux-saga .
    #run on 8080 port to internal 3000 port with name "todo-table-redux-saga"    
    $ docker run -name todo-table-redux-saga -p 8080:3000 username/todo-table-redux-saga
    #stop docker process
    $ docker stop todo-table-redux-saga
    #save image 
    $ docker save username/todo-table-redux-saga:my_tag > todo-table-redux-saga.tar.gz
    #load image
    $ docker load < todo-table-redux-saga.tar.gz
    

    
    