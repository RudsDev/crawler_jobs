"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Post {

  constructor(hrefJob, tags = []){
    this._hrefJob = hrefJob;
    this._date = this._generateDate(hrefJob);
    this._tags = tags;
  }
    
  get date(){
    return this._date[0][0];
  }

  _generateDate(hrefJob){
    let target = DATE_RX.exec(hrefJob);
    let date = undefined;
    if(target) date = target[0];
    return new Date(date);
  }

}