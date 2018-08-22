"use strict";

const CRAWLER = require("crawler");
const CRAWLER_CONFIGS = {maxConnections:3}
const URI = 'https://riovagas.com.br/';

module.exports.CrawlerService = class CrawlerService {

	constructor(){
		this._crawler = new CRAWLER(CRAWLER_CONFIGS);
	}

	run(cb){
		return new Promise((resolve, reject)=>{
			this._crawler.queue([{
				uri: URI,
				jQuery: true,
				callback: (err, res, done)=>{
					if(err)	reject(()=>{throw new Error()})
					else resolve(cb(res.$))
					done();
				},
			}]);
		});
	} 

}