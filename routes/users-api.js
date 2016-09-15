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
    userService.getAllUsers()
        .then(users=>users
            ? res.json(users)
            : res.sendStatus(HttpStatus.NO_CONTENT))
        .catch(err=>res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err))
});

/**
 * GET single user by login
 */
router.get('/:login', function (req, res) {
    const {login} = req.params;
    userService.getUser({login})
        .then(user=>user
            ? res.json(user)
            : res.sendStatus(HttpStatus.NO_CONTENT))
        .catch(err=>res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err))
});


/**
 * POST create new user
 */
router.post('/', function (req, res) {
    userService.saveUser(req.body)
        .then(user=>user
            ? res.status(HttpStatus.CREATED).json(user)
            : res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR))
        .catch(err=>(err.name === "ValidationError")
            ? res.status(HttpStatus.BAD_REQUEST).send(err.errors)
            : res.status(HttpStatus.CONFLICT).send({err})
        )
});

/**
 * PUT replace user by new one by login
 */
router.put('/:login', function (req, res) {
    const {login} = req.params;
    userService.replaceUser({login}, req.body)
        .then(user=>user
            ? res.json(user)
            : res.sendStatus(HttpStatus.BAD_REQUEST))
        .catch(err=>res.status(HttpStatus.CONFLICT).send(err))
});

/**
 * DELETE user by login
 */
router.delete('/:login', function (req, res) {
    const {login} = req.params;
    userService.deleteUser({login})
        .then(res.end())
        .catch(err=>res.status(HttpStatus.BAD_REQUEST).send(err))
});

module.exports = router;
