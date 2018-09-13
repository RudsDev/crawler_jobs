"use strict";

const MyCrawler = require('../scripts/MyCrawler').MyCrawler;

module.exports = class Tag {

  constructor(href, text){
    this._href = href;
    this._text = text;
  }

}