"use strict";

const router = require('express').Router();
const CrawlerController = require('./../controllers/CrawlerController');
const crawlerController = new CrawlerController();

router.get('/:value', function(req, res) {
	crawlerController.run()
		.then(data=>res.send(data))
		.catch(err=>res.send(err));
});
module.exports = router;