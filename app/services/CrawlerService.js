"use strict";

const CRAWLER = require("crawler");
const Post = require('../models/Post');
const Tag = require('../models/Tag');
const LAST_PAGE = 8;
const CRAWLER_CONFIGS = {
	maxConnections:2,
}
module.exports.CrawlerService = class CrawlerService {

	constructor(){
		this._crawler = new CRAWLER(CRAWLER_CONFIGS);
		this._uriPages = [];
		this._posts = [];
	}

	get$(uriParam){
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

	run(item){
		this.get$(item)
		.then($=>{
			let data = $('div.wp-pagenavi a.page');
			let href = data[0].next.next.attribs.href;

			if(!href.includes(`/page/${LAST_PAGE}`)){
				this._uriPages.push(href);
				this.run(href);
			}
			else{
				this._uriPages.forEach(item=>this._findPostInPages(item));
			}
		})
		.catch(err=>console.log(err));
	}

	_findPostInPages(item){
		this.get$(item)
		.then($=>{
			let anchorJobs = $('div.post div.post-headline h2 a');
			this._createPosts(anchorJobs);
		})
		.catch(err=>console.log(err));
	}

	_createPosts(anchorJobs){
		for (let i = 0; i < anchorJobs.length; i++) {
			const href = anchorJobs[i].attribs.href;
			this._addToTagArray(href);
		}
	}

	_createUrlTags(tags){
		let result = [];
		for (let i = 0; i < tags.length; i++) {
			const href = tags[i].attribs.href;
			const data = tags[i].children[0].data;
			result.push(new Tag(href, data));
		}
		return result;
	}

	_addToTagArray(hrefJob){
		this.get$(hrefJob)
		.then($=>{
			let tags = $('div.post-byline a');
			this._posts.push(new Post(hrefJob, this._createUrlTags(tags)));
			// console.log(this._posts);
			this.showTags_TEST(this._posts);
		})
		.catch(err=>console.log(err));
	}

	showTags_TEST(posts = []){
		posts.forEach(post=>{
			post.tags.forEach(tag=>{
				console.log(tag);
			})	
		})
	}

}