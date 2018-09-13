"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

const CrawlerDepthController = require('./../controllers/CrawlerDepthController');
const crawlerDepthController = new CrawlerDepthController();

router.get('/:value', async function(req, res) {
	const URI_TESTE = 'https://riovagas.com.br/page/2/';
	res.send(await crawlerController.run(URI_TESTE));
});

router.get('/', function(req, res) {
	res.send(crawlerDepthController.run());
});

module.exports = router;