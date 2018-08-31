"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Filter {

  constructor(
    jobsInclude = [],
    tagsIncludes = ['atendimento', 'rio-de-janeiro'],
    tagsExcludes = []) {

    this._jobsInclude = jobsInclude,
    this._tagsIncludes = tagsIncludes;
    this._tagsExcludes = tagsExcludes;

  }

  
  _includeTags(tags = []){
    let tagsSanatized = [];
    this._tagsIncludes.forEach(tagInclude=>{
      tagExclude.forEach(tag=>{
        if(tag==tagInclude) 
          tagsSanatized.push(tag);
      });
    });
    return tagsSanatized;
  }

}