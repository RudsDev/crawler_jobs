"use strict";

const MyCrawler = require('../scripts/MyCrawler').MyCrawler;
const LAST_PAGE = 5;
const Filter = require('../models/Filter');
const Job = require('../models/Job');
const Tag = require('../models/Tag');

module.exports.CrawlerServiceJson = class CrawlerServiceJson {

	constructor(){
		this._filter = new Filter();
		this._hrefPages = [];
	}

	run(page){
		return new Promise(async (res,rej)=>{
			await this._findPages(page);
			let jobs = await this._findHrefJobs(this._hrefPages);
			res(Promise.all(jobs.map(job=>job)));
		})
	}

	_findPages(page){

		return new Promise(async (res,rej)=>{
			let $ = await MyCrawler._get$(page);
			let data = $('div.wp-pagenavi a.page');
			let href = data[0].next.next.attribs.href;
	
			if(!href.includes(`/page/${LAST_PAGE}`)){
				this._hrefPages.push(href);
				await this._findPages(href);	
			}
			res();
		});
		
	}

	_findHrefJobs(hrefPages){

		let getHrefJobsProm = new Promise(async (res, rej)=>{
			let hrefJobsLocal = [];
			hrefPages.map(async hrefPage=>{
				let $ = await MyCrawler._get$(hrefPage);
				let hrefJobElement = $('div.post div.post-headline h2 a');
				for(let i = 0; i < hrefJobElement.length; i++)
					hrefJobsLocal.push(hrefJobElement[i].attribs.href);
				res(hrefJobsLocal);
			});
		});

		let createJobsProm = (hrefJobs)=>{
			return new Promise(async (res, rej)=>{
				res(await this._createJobs(hrefJobs));
			});
		}
		
		return new Promise(async(res, rej)=>{
			res(await createJobsProm(await getHrefJobsProm));
		})
	}
	
	_createJobs(hrefJobs){
		let createJobProm = new Promise((res,rej)=>{
			let result = hrefJobs.map(async hrefJob=>{
				let tags = await Tag.createTagBatch(hrefJob,[]);
				return (new Job(hrefJob, tags));
			})
			res(result);
		});

		return new Promise(async (res,rej)=>{
			res(await createJobProm);
		}); 
	}

}