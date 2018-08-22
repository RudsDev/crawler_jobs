"use strict";

const router = require('express').Router();
const crawler = require('./crawler');

router.get('/', (req, res) => res.send('Hello World! - Express'));
router.use('/crawler', crawler);

module.exports = router;