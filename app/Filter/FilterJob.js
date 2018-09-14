"use strict";

const Filter = require('../Filter/Filter');
const Job = require('../models/Job');
const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports.FilterJob = class FilterJob {

  constructor(){
    this._filter = new Filter();
  }

  filter(tags){
    let result = true;
    tags.forEach((tag)=>{
      // console.log(tag._href);
      if(this._filter.exclude(tag._href) && (tags.indexOf(tag)) ){
        result = false;
        console.log('***ACHOU!' + ' - ' + tag._href + ' - ' + result);
        return result;
      }
    });
    return result;
  }

}