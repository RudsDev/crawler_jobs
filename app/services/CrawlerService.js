"use strict";

const CRAWLER = require("crawler");
const CRAWLER_CONFIGS = {
	maxConnections:3,
	
}
const URI = 'https://riovagas.com.br/';

module.exports.CrawlerService = class CrawlerService {

	constructor(){
		this._crawler = new CRAWLER(CRAWLER_CONFIGS);
	}

	get$(){
		return new Promise((resolve, reject)=>{
			this._crawler.queue([{
				uri: URI,
				jQuery: true,
				callback: (err, res, done)=>{
					if(err)	{
						done();
						return reject(new Error())
					}
					else {
						done();
						return resolve(res.$);
					}
				},
			}]);
		});
	} 

}