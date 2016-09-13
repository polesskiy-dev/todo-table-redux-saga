'use strict';
const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userService = require('../services/UserService');
const UserSchema = require('../models/UserSchema');
const {jwtSecret} = require('../config/auth.config.json');

router.post('/', function (req, res) {
    const {body:credentials} = req;
    console.log("User trying to obtain token with credentials: ", credentials);

    if (credentials.login) {
        userService.getUser(credentials)
            .then(user=> {
                    (user && UserSchema.comparePasswords(credentials, user))
                        ? res.json({err: null, token: jwt.sign(user._doc, jwtSecret)})
                        : res.status(HttpStatus.UNAUTHORIZED).send({err: "Wrong login or password!"})
                }
            )
            .catch(err=> {
                console.error(err);
                res.status(HttpStatus.UNAUTHORIZED).send({err})
            })

    } else res.status(HttpStatus.BAD_REQUEST).send({err: "No credentials while trying to login!"});
});

module.exports = router;
