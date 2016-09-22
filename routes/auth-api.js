'use strict';
const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const UserService = require('../services/UserService');
const {jwtSecret} = require('../config/auth.config.json');
const urls = require('../config/urls.config');

/**
 * Login
 *
 * @apiSuccess {Object} User - user obj from DB with token (JWT token) field.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    { "_id": "57da8c3d89b71e23f629e1e1", "email": "test7-email1@email.com", "password": "$2a$10$5nOZ8fodRWH.oU0vh8P3W.Ry125LvQiV3ARQeUdr54t/aE.LmcUwW", "login": "test7", "role": "user", "__v": 0, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2RhOGMzZDg5YjcxZTIzZjYyOWUxZTEiLCJlbWFpbCI6InRlc3Q3LWVtYWlsMUBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ1bk9aOGZvZFJXSC5vVTB2aDhQM1cuUnkxMjVMdlFpVjNBUlFlVWRyNTR0L2FFLkxtY1V3VyIsImxvZ2luIjoidGVzdDciLCJyb2xlIjoidXNlciIsIl9fdiI6MCwiaWF0IjoxNDczOTQwNTQyfQ.W60HFXv6D35zuQcg_JSzvJyliWlFZMa2V0385PCR9vQ" }
 */
router.post(urls.LOGIN, function (req, res) {
    const {body:credentials} = req;
    console.info("User trying to obtain token with credentials: ", credentials);

    if (credentials.login) {
        UserService.instance.getUser(credentials)
            .then(user=> {
                    (user && user.validatePassword(credentials.password))
                        ? res.json(user.addJwtToken(jwtSecret))
                        : res.status(HttpStatus.UNAUTHORIZED).send("Wrong login or password!")
                }
            )
            .catch(err=> {
                console.warn(err);
                res.status(HttpStatus.UNAUTHORIZED).send(err)
            })

    } else res.status(HttpStatus.BAD_REQUEST).send({err: "No credentials while trying to login!"});
});

/**
 * Registration
 *
 * @apiSuccess {Object} User - user obj from DB with token (JWT token) field.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    { "_id": "57da8c3d89b71e23f629e1e1", "email": "test7-email1@email.com", "password": "$2a$10$5nOZ8fodRWH.oU0vh8P3W.Ry125LvQiV3ARQeUdr54t/aE.LmcUwW", "login": "test7", "role": "user", "__v": 0, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1N2RhOGMzZDg5YjcxZTIzZjYyOWUxZTEiLCJlbWFpbCI6InRlc3Q3LWVtYWlsMUBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ1bk9aOGZvZFJXSC5vVTB2aDhQM1cuUnkxMjVMdlFpVjNBUlFlVWRyNTR0L2FFLkxtY1V3VyIsImxvZ2luIjoidGVzdDciLCJyb2xlIjoidXNlciIsIl9fdiI6MCwiaWF0IjoxNDczOTQwNTQyfQ.W60HFXv6D35zuQcg_JSzvJyliWlFZMa2V0385PCR9vQ" }
 */
router.post(urls.REGISTRATION, (req, res)=> {
    const {body} = req;
    //console.info("User trying to register: ", body);

    UserService.instance.saveUser(body)
        .then(user=>user
            ? res.status(HttpStatus.CREATED).json(user.addJwtToken(jwtSecret))
            : res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR))
        .catch(err=>(err.name === "ValidationError")
            ? res.status(HttpStatus.BAD_REQUEST).send(err.errors)
            : res.status(HttpStatus.CONFLICT).send(err)
        )
});

module.exports = router;
