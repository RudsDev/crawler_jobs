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
      if(this._filter.exclude(tag._href)){
        result = false;
        console.log('***FILTROU: ' + tag._href);
        return result;
      }
    });
    return result;
  }

}