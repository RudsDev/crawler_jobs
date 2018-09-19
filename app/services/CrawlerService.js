"use strict";

const MyCrawler = require('../scripts/MyCrawler').MyCrawler;

const FilterJob = require('../Filter/FilterJob').FilterJob;

const LAST_PAGE = 12;
const Filter = require('../Filter/Filter');
const Job = require('../models/Job');
const Tag = require('../models/Tag');

module.exports.CrawlerServiceJson = class CrawlerServiceJson {

	constructor(){
		this._filter = new Filter();
		this._filterJobs = new FilterJob();
		this._hrefPages = [];
	}

	run(page){
		this._hrefPages.push(page);
		return new Promise(async (res,rej)=>{
			await this._findPages(page);
			let jobs = await this._findHrefJobsinPages(this._hrefPages);
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

	_findHrefJobsinPages(hrefPages){
		
		let getHrefJobsProm = new Promise(async (res, rej)=>{

			let jobsLocal = ()=>{
				return new Promise(async (res, rej)=>{
					let hrefJobsLocal =	hrefPages.map(async hrefPage=>{
						let jobs = [];
						let $ = await MyCrawler._get$(hrefPage);
						let hrefJobElement = await $('div.post div.post-headline h2 a');
						for(let i = 0; i < hrefJobElement.length; i++)
							jobs.push(hrefJobElement[i].attribs.href);
						return jobs;
					});
					res(hrefJobsLocal);
				})
			};
			res(Promise.all(await jobsLocal()).then(items=>[].concat(...items)));
		});

		let createJobsProm = (hrefJobs)=>{
			return new Promise(async (res, rej)=>{
				res(await this._createJobs(hrefJobs));
			});
		}
		
		return new Promise(async(res, rej)=>{
			res(await createJobsProm(await getHrefJobsProm));
		});
	}
	
	_createJobs(hrefJobs){
		let createTagBatchProm = ((hrefJob, tags)=>{
			return new Promise(async (res,rej)=>{
				let $ = await MyCrawler._get$(hrefJob);
				let hrefTagElements = $('div.post-byline a');
				for (let i = 0; i < hrefTagElements.length; i++) {
					const hrefTag = hrefTagElements[i].attribs.href;
					const dataTag = hrefTagElements[i].children[0].data;
					if(this._filter.sanatize(hrefTag))
						tags.push(new Tag(hrefTag, dataTag));
				}
				res(tags);
			});
		});

		let createJobProm = new Promise((res,rej)=>{
			let result = hrefJobs.map(async hrefJob=>{
				let tags = await createTagBatchProm(hrefJob,[]);
				if(this._filterJobs.filter(tags))
					return new Job(hrefJob, tags);
			})
			res(result);
		});
		
		return new Promise(async (res,rej)=>{
			res(await createJobProm);
		});

	}

}