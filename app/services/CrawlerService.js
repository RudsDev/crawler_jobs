"use strict";

const MyCrawler = require('../scripts/MyCrawler').MyCrawler;
const FilterJob = require('../Filter/FilterJob').FilterJob;
const Filter = require('../Filter/Filter');
const Job = require('../models/Job');
const Tag = require('../models/Tag');

module.exports.CrawlerServiceJson = class CrawlerServiceJson {

	constructor(){
		this._filterJobs = new FilterJob();
		this._hrefPages = [];
	}

	run(maxPages, filter = new Filter()){
		this._filter = filter;
		return new Promise(async (res,rej)=>{
			this._findPages(maxPages);
			let jobs = await this._findHrefJobsinPages(this._hrefPages);
			res(Promise.all(jobs.map(job=>job)));
		})
	}

	_findPages(maxPages){
		this._hrefPages = [];
		this._hrefPages.push(`https://riovagas.com.br/`);
		for (let i = 2; i <= maxPages; i++){
			this._hrefPages.push(`https://riovagas.com.br/page/${i}/`);
		}
	}

	_findHrefJobsinPages(hrefPages){
		let getHrefJobsProm = new Promise(async (res, rej)=>{

			let jobsLocal = ()=>{
				return new Promise(async (res, rej)=>{
					let hrefJobsLocal = [];
					hrefJobsLocal =	hrefPages.map(async hrefPage=>{
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
			res(Promise.all(await jobsLocal()).then(items=>[...new Set([].concat(...items))]));
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
				let $ = await MyCrawler._get$(hrefJob);
				let desc = await $('div.post-headline h1');
				if(this._filterJobs.filter(tags))
					return new Job(desc[0].children[0].data, hrefJob, tags);
			})
			res(result);
		});
		return new Promise(async (res,rej)=>{
			res(await createJobProm);
		});
	}
}