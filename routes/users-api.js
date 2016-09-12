/**
 * Users REST API implementation.
 */
"use strict";
const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const userService = require('../services/UserService');

/**
 * GET all users
 */
router.get('/', function (req, res) {
    userService.getAllUsers((err, users)=> {
        if (err)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err});
        if (users)
            return res.json(users);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    })
});

/**
 * GET single user by login
 */
router.get('/:login', function (req, res) {
    const {login} = req.params;
    userService.getUser({login}, (err, user)=> {
        if (err)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err});
        if (user)
            return res.json(user);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    })
});

/**
 * POST create new user
 */
router.post('/', function (req, res) {
    userService.saveUser(req.body, (err, user) => {
        if (err || !user) {
            //if validation problem
            if (err.name === "ValidationError") {
                res.status(HttpStatus.BAD_REQUEST).send({err: err.errors});
            } else {
                //user already exists in DB
                res.status(HttpStatus.CONFLICT).end();
            }
        } else {
            /** response with auth token - log in*/
            //let token = jwt.encode(user, SECRET_KEY);
            //res.status(HttpStatus.CREATED).json({token: token});
            res.status(HttpStatus.CREATED).json(user);
        }
    })
});

/**
 * PUT replace user by new one by login
 */
router.put('/:login', function (req, res) {
    const {login} = req.params;
    userService.replaceUser({login}, req.body, (err, user)=> {
        if (err)
            return res.status(HttpStatus.BAD_REQUEST).send({err});
        if (user)
            return res.json(user);
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    })
});

/**
 * DELETE user by login
 */
router.delete('/:login', function (req, res) {
    const {login} = req.params;
    userService.deleteUser({login}, (err)=> {
        if (err)
            return res.status(HttpStatus.BAD_REQUEST).send({err});
        return res.end();
    })
});

module.exports = router;
