"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

router.get('/:value', async function(req, res) {
	res.send(await crawlerController.run());
});

router.post('/', async function(req, res) {
	res.send(await crawlerController.run(req.body.maxPages));
});

module.exports = router;