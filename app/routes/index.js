"use strict";

const router = require('express').Router();
const peoples = require('./peoples');
const crawler = require('./crawler');

router.get('/', (req, res) => res.send('Hello World! - Express'));
router.use('/peoples', peoples);
router.use('/crawler', crawler);

module.exports = router;