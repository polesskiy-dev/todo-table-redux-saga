/**
 * Users REST API implementation.
 */
"use strict";
const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const userService = require('../services/UserService');
const AuthController = require('../controllers/AuthController');
const [USER_ROLE, ADMIN_ROLE] = require('../config/auth.config.json').roles;

/**
 * POST create new user
 */
router.post('/',
    (req, res, next)=>AuthController.getInstance().allowRoles(ADMIN_ROLE).authMiddleware(req, res, next),
    function (req, res) {
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
 * GET all users
 */
router.get('/',
    (req, res, next)=>AuthController.getInstance().allowRoles(ADMIN_ROLE).authMiddleware(req, res, next),
    function (req, res) {
        userService.getAllUsers()
            .then(users=>users
                ? res.json(users)
                : res.sendStatus(HttpStatus.NO_CONTENT))
            .catch(err=>res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err))
    });

/**
 * GET single user by login
 */
router.get('/:login',
    (req, res, next)=>AuthController.getInstance().allowRoles(ADMIN_ROLE).allowLogins(req.params.login).authMiddleware(req, res, next),
    function (req, res) {
        const {login} = req.params;
        userService.getUser({login})
            .then(user=>user
                ? res.json(user)
                : res.sendStatus(HttpStatus.NO_CONTENT))
            .catch(err=>res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err))
    });

/**
 * PUT replace user by new one by login
 */
router.put('/:login',
    (req, res, next)=>AuthController.getInstance().allowRoles(ADMIN_ROLE).allowLogins(req.params.login).authMiddleware(req, res, next),
    function (req, res) {
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
router.delete('/:login',
    (req, res, next)=>AuthController.getInstance().allowRoles(ADMIN_ROLE).allowLogins(req.params.login).authMiddleware(req, res, next),
    function (req, res) {
        const {login} = req.params;
        userService.deleteUser({login})
            .then(res.end())
            .catch(err=>res.status(HttpStatus.BAD_REQUEST).send(err))
    });


module.exports = router;
