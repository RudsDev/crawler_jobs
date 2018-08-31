"use strict";

const CRAWLER_SERVICE = require('../services/CrawlerService').CrawlerService;

module.exports = class CrawlerController {
    
	constructor(){
		this._service = new CRAWLER_SERVICE();
	}

	find(){
		this._service.run('https://riovagas.com.br/page/2/');
	}

	_showPagelength(data){
		console.log('Grabbed', data.body.length, 'bytes');
	}

	_getURLInfos(data){
		return data.request;
	}

	_sanatizeInfos(data){
		console.log((data.attribs));
	}

}