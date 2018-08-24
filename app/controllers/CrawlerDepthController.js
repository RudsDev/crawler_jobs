"use strict";

const CRAWLER = require("js-crawler");
const CRAWLER_CONFIG = {
	depth:2,
	maxRequestsPerSecond: 5,
	maxConcurrentRequests: 1
};
const URI = 'https://riovagas.com.br/';
const CB = data=>console.log(data.url);

module.exports = class CrawlerDepthController {
    
	constructor(){
		this._crawler = new CRAWLER();
	}

	run(){
		console.log('run');
		this._crawler.configure(CRAWLER_CONFIG).crawl(URI, CB);
	}



	

}