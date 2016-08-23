const express = require('express');
const router = express.Router();

let counter = 0;
let todos = [];

router.get('/', function (req, res, next) {
    setTimeout(() => Math.random()<.5 ? res.json(todos) : res.status(500).send('Something broke!'), 500);
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    todos.push(req.body);
    setTimeout(()=>res.json(Object.assign({}, req.body, {_id: counter++})), 500);
});
router.put('/:id', function (req, res, next) {
    res.send('respond with a resource');
});
router.delete('/:id', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
