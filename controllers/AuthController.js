"use strict";
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const {jwtSecret} = require('../config/auth.config.json');
const userService = require('../services/UserService');

class AuthController {
    constructor(allowedRoles = [], allowedLogins = [], fetchUser = userService.getUser) {
        this.user = null;
        this.fetchUser = fetchUser;
        this.allowedRoles = allowedRoles;
        this.allowedLogins = allowedLogins;
    }

    static getInstance() {
        return new AuthController()
    }

    /**
     * Check user permissions
     *
     * @param user
     * @returns {boolean}
     */
    checkPermissions(user) {
        let result = false;

        //if allowed roles not empty and user role includes in allowed roles
        if (this.allowedRoles.length != 0)
            result = result || this.allowedRoles.includes(user.role);

        //if allowed logins not empty and user login includes in allowed logins
        if (this.allowedLogins.length != 0)
            result = result || this.allowedLogins.includes(user.login);

        return result
    }

    /**
     * Add roles to allowed roles
     *
     * @returns {AuthController}
     */
    allowRoles() {
        this.allowedRoles = Array.from(arguments);
        return this
    }

    /**
     * Add logins to allowed logins
     *
     * @returns {AuthController}
     */
    allowLogins() {
        this.allowedLogins = Array.from(arguments);
        return this
    }

    /**
     * Get and validate user by token from injected service method
     *
     * @param token
     * @returns {Promise}
     */
    getUserByToken(token) {
        return new Promise((resolve, reject)=> {
            if (!token) reject("No token!");

            /** decode jwt token*/
            const decodedUser = jwt.verify(token, jwtSecret);
            if (!decodedUser) reject("Invalid auth token or unverified");

            /** fetch actual user */
            this.fetchUser(decodedUser)
                .then(
                    user=> {
                        /** check that user exists and passwords equals*/
                        if (user && user.validatePassword(decodedUser.password)) {
                            this.user = user;
                            resolve();
                        }
                        else reject("Wrong login or password")
                    }
                )
        });
    }

    authMiddleware(req, res, next) {
        const token = req.headers.authorization;

        this.getUserByToken(token)
            .then(()=> {
                /**check user permissions*/
                if (this.checkPermissions(this.user)) {
                    req.user = this.user;
                    next();
                }
                else
                    res.status(HttpStatus.FORBIDDEN).end()
            })
            .catch(err=>res.status(HttpStatus.UNAUTHORIZED).send(err))
    }
}

module.exports = AuthController;