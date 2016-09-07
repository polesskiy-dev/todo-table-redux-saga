'use strict';
const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req.body);
    res.json({err: null, token: "sometoken"})
});

module.exports = router;
