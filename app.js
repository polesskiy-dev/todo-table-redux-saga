"use strict";
var express = require('express');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Use native promises
mongoose.Promise = global.Promise;

const urls = require('./config/urls.config.js');
//const checkJwtAuth = require('./middleware/check-jwt-token-middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(urls.AUTH_API, require('./routes/auth-api'));
app.use(urls.TODOS_API, require('./routes/todos-api'));
app.use(urls.USERS_API, require('./routes/users-api'));

/** connect to DB*/
require('./helpers/database-connect')();

/** event emitter test*/
const UserService = require('./services/UserService');
UserService.instance.on("users-list-changed", ()=>console.log("Users list changed"));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.use('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
