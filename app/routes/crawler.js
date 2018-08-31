"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

const CrawlerDepthController = require('./../controllers/CrawlerDepthController');
const crawlerDepthController = new CrawlerDepthController();

router.get('/:value', function(req, res) {
	crawlerController.find()
		.then(data=>{
			//console.log(data);
			// res.send(data);
			res.send(undefined);
		})
		.catch(err=>res.send(err));
});


router.get('/', function(req, res) {
	crawlerDepthController.run();
});

module.exports = router;