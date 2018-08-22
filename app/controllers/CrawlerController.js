"use strict";

const CRAWLER_SERVICE = require('../services/CrawlerService').CrawlerService;

module.exports = class CrawlerController {
    
	constructor(){
		this._service = new CRAWLER_SERVICE();
	}

	async run(){
		try {
			return await this._service.run(this._getElements);
		} catch (err) {
			throw new Error('Peguei o erro');
		}
	}

	_showPagelength(data){
		console.log('Grabbed', data.body.length, 'bytes');
	}

	_getElements($){
		return $('title').text();
	}

}