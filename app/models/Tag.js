"use strict";

const MyCrawler = require('../scripts/MyCrawler').MyCrawler;

module.exports = class Tag {

  constructor(href, text){
    this._href = href;
    this._text = text;
  }

  static createTagBatch(hrefJob, tags){
    return new Promise(async (res,rej)=>{
      let $ = await MyCrawler._get$(hrefJob);
      let hrefTagElements = $('div.post-byline a');
      for (let i = 0; i < hrefTagElements.length; i++) {
        const hrefTag = hrefTagElements[i].attribs.href;
        const dataTag = hrefTagElements[i].children[0].data;
        tags.push(new Tag(hrefTag, dataTag));
      }
      res(tags);
    });
  }

}