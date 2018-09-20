"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Filter {

  constructor(tagsIncludes = [],tagsExcludes = []) {
    this._tagsIncludes = tagsIncludes;
    this._tagsExcludes = tagsExcludes;
    this._tagsSanatize =  ['facebook', 'newsletter'];
    this._preExlcude();
  }
  
  include(href = ""){
    return this._tagsIncludes
      .some(item=>href.includes(item));
  }

  exclude(href = ""){
    return this._tagsExcludes
    .some(item=>href.includes(item));
  }

  sanatize(href = ""){
    return !this._tagsSanatize
    .some(item=>href.includes(item));
  }
  
  filter(href){
    return this.include(href) 
      && this.exclude(href);
  }

  _preExlcude(){
    let tagsExcludes = ['pcd','emprego-net'];
    tagsExcludes.forEach(tag=>{
      this._tagsExcludes.push(tag);
    });
  }
  
}