"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

const MAX_PAGES = 5;
const CrawlerDepthController = require('./../controllers/CrawlerDepthController');
const crawlerDepthController = new CrawlerDepthController();

router.get('/:value', async function(req, res) {
	res.send(await crawlerController.run(MAX_PAGES));
});

router.post('/', function(req, res) {
	console.log(req.body);
	//res.send(crawlerDepthController.run());
});

module.exports = router;