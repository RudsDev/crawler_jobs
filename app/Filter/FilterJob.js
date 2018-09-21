"use strict";

const Filter = require('../Filter/Filter');
const Job = require('../models/Job');
const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports.FilterJob = class FilterJob {

  constructor(){
    this._filter = new Filter();
  }

  filterNotInclude(tags){
    let result = true;
    tags.forEach((tag)=>{      
      if(this._filter.exclude(tag._href)){
        result = false;
        return result;
      }
    });
    return result;
  }


  filterInclude(tags){
    let result = false;
    tags.forEach((tag)=>{      
      if(this._filter.include(tag._href)){
        result = true;
        return result;
      }
    });
    return result;
  }

  filter(tags){
    let include = this.filterInclude(tags);
    let notInclude = this.filterNotInclude(tags);
    return include&&notInclude;
  }

}