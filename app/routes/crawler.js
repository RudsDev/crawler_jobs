"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

const CrawlerDepthController = require('./../controllers/CrawlerDepthController');
const crawlerDepthController = new CrawlerDepthController();

router.get('/:value', function(req, res) {
	crawlerController.getElements()
		.then(data=>res.send(data))
		.catch(err=>res.send(err));
});


router.get('/', function(req, res) {
	crawlerDepthController.run();
});

module.exports = router;