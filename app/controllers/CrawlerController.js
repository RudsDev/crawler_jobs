"use strict";

const CRAWLER_SERVICE = require('../services/CrawlerService')
	.CrawlerServiceJson;
module.exports = class CrawlerController {
    
	constructor(){
		this._service = new CRAWLER_SERVICE();
	}

	async run(maxPages){
		return this._service.run(maxPages);
	}

	showPagelength(data){
		console.log('Grabbed', data.body.length, 'bytes');
	}

	getURLInfos(data){
		return data.request;
	}

	_sanatizeInfos(data){
		console.log((data.attribs));
	}

	posts(){
		return this._service.posts;
	}

}