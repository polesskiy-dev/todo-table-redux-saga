'use strict';
const express = require('express');
const router = express.Router();

let todos = [];

/** Get all todosApi, randomly send Error or OK*/
router.get('/', function (req, res) {
    setTimeout(() => Math.random() < 0.5 ? res.json(todos) : res.status(500).send('Something broke while processing GET all todosApi request!'), 500);
});

/** Post new todo, randomly send Error or OK - with this todo back*/
router.post('/', function (req, res) {
    console.log(req.body);
    todos.push(req.body);
    setTimeout(() => Math.random() < .5 ? res.json(req.body) : res.status(500).send('Something broke while processing POST new todo request!'), 500);
});
router.put('/:id', function (req, res) {
    res.send('respond with a resource');
});
router.delete('/:id', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
