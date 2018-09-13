"use strict";

const CRAWLER = require("crawler");
const Filter = require('../models/Filter');
const Job = require('../models/Job');
const Tag = require('../models/Tag');

const LAST_PAGE = 5;
const CRAWLER_CONFIGS = {
	maxConnections:2,
}

module.exports.CrawlerServiceJson = class CrawlerServiceJson {

	constructor(){
		this._crawler = new CRAWLER(CRAWLER_CONFIGS);
		this._filter = new Filter();
		this._hrefPages = [];
		this._hrefJobs = [];
		this._jobs = [];
	}

	run(page){
		return new Promise(async (res,rej)=>{
			await this.findPages(page);
			let jobs = await this._findJobsInPages(this._hrefPages);
			res(Promise.all(jobs.map(job=>job)));
		})
	}

	findPages(page){

		return new Promise(async (res,rej)=>{
			let $ = await this._get$(page);
			let data = $('div.wp-pagenavi a.page');
			let href = data[0].next.next.attribs.href;
	
			if(!href.includes(`/page/${LAST_PAGE}`)){
				this._hrefPages.push(href);
				await this.findPages(href);	
			}
			res();
		});
		
	}

	_findJobsInPages(hrefPages){

		let _firstProm = new Promise(async (res, rej)=>{
			let hrefJobsLocal = [];
			hrefPages.map(async hrefPage=>{
				let $ = await this._get$(hrefPage);
				let hrefJobElement = $('div.post div.post-headline h2 a');
				for(let i = 0; i < hrefJobElement.length; i++)
					hrefJobsLocal.push(hrefJobElement[i].attribs.href);
				res(hrefJobsLocal);
			});
		});

		let _secProm = (hrefJobs)=>{
			return new Promise(async (res, rej)=>{
				res(await this._createJobs(hrefJobs));
			});
		}
		
		return new Promise(async(res, rej)=>{
			res(await _secProm(await _firstProm));
		})
	}

	
	_createJobs(hrefJobs){

		let createTagProm = (hrefJob, tags)=>{
			return new Promise(async (res,rej)=>{
				let $ = await this._get$(hrefJob);
				let hrefTagElements = $('div.post-byline a');
				for (let i = 0; i < hrefTagElements.length; i++) {
					const hrefTag = hrefTagElements[i].attribs.href;
					const dataTag = hrefTagElements[i].children[0].data;
					tags.push(new Tag(hrefTag, dataTag));
				}
				res(tags);
			});
		}
		
		let createJobProm = new Promise((res,rej)=>{
			let result = hrefJobs.map(async hrefJob=>{
				let tags = await createTagProm(hrefJob,[]);
				return (new Job(hrefJob, tags));
			})
			res(result);
		});

		return new Promise(async (res,rej)=>{
			res(await createJobProm);
		});

	}


	_findTags(jobPage){
		return new Promise(async (res,rej)=>{

			let tags = [];
			let $ = await this._get$(jobPage);
			let hrefTagsElement = $('div.post-byline a');

			for (let i = 0; i < hrefTagsElement.length; i++) {
				const hrefTag = hrefTagsElement[i].attribs.href;
				const dataTag = hrefTagsElement[i].children[0].data;
				tags.push(new Tag(hrefTag, dataTag));
			}
			res(tags);
		});
	}


	_get$(uriParam){
		return new Promise((resolve, reject)=>{
			this._crawler.queue([{
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