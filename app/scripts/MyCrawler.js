"use strict";

const _CRAWLER = require("crawler");

const CRAWLER_CONFIGS = {
	maxConnections:2,
}

const _crawler = new _CRAWLER(CRAWLER_CONFIGS);

module.exports.MyCrawler = class MyCrawler {

	static _get$(uriParam){
		return new Promise((resolve, reject)=>{
			_crawler.queue([{
				uri: uriParam,
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