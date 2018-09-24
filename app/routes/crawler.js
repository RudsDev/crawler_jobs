"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();
const MAX_PAGES = 4;

router.get('/:value', async function(req, res) {
	res.send(await crawlerController.run(MAX_PAGES));
});

router.post('/', function(req, res) {
	console.log(req.body);
});

module.exports = router;