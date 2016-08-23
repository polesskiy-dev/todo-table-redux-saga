const express = require('express');
const router = express.Router();

let counter = 0;
let todos = [];

/** Get all todos, randomly send Error or OK*/
router.get('/', function (req, res, next) {
    setTimeout(() => Math.random() < .5 ? res.json(todos) : res.status(500).send('Something broke while processing GET all todos request!'), 500);
});

/** Post new todo, randomly send Error or OK - with this todo back*/
router.post('/', function (req, res, next) {
    console.log(req.body);
    todos.push(req.body);
    setTimeout(() => Math.random() < .5 ? res.json(req.body) : res.status(500).send('Something broke while processing POST new todo request!'), 500);
});
router.put('/:id', function (req, res, next) {
    res.send('respond with a resource');
});
router.delete('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
