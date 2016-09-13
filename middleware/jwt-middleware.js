/**
 * JWT tokens handler middleware
 */
"use strict";
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const {jwtSecret} = require('../config/auth.config.json');
const userService = require('../services/UserService');
//const UserSchema = require('../models/UserSchema');

/**
 * Fetch user from DB by encoded token.
 *
 * By login from jwt token from 'Authorization' header.
 * Add user obj to "req.user" param if success
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = function (req, res, next) {
    const clientAuthToken = req.headers.authorization;
    //console.log("Auth token from client:%s", clientAuthToken);

    try {
        if (!clientAuthToken) throw "No client auth token";
        /**decode jwt token*/
        const decodedUser = jwt.verify(clientAuthToken, jwtSecret);
        userService.getUser(decodedUser)
            .then(
                user=> {
                    //if user exists and his password from jwt token and actual password matches
                    if (user && user.password === decodedUser.password) {
                        /**set user as a req parameter and call next middleware*/
                        req.user = user;
                        next();
                    }
                    else res.status(HttpStatus.UNAUTHORIZED).end();
                }
            )
            //some error occurs while obtaining user from DB from service
            .catch(
                err=> {
                    console.error("While fetching user for JWT check: ", err);
                    res.status(HttpStatus.UNAUTHORIZED).end()
                }
            )
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.UNAUTHORIZED).end();
    }
};
