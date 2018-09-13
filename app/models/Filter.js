"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Filter {

  constructor(
    preFilterExc = ['facebook', 'newsletter'],
    tagsIncludes = ['atendimento', 'rio-de-janeiro'],
    tagsExcludes = ['caixa','vendedor']) {

    this._preFilterExc = preFilterExc;
    this._tagsIncludes = tagsIncludes;
    this._tagsExcludes = tagsExcludes;
  }
  
  _include(href = ""){
    return this._tagsIncludes
      .some(item=>href.includes(item));
  }

  _exclude(href = ""){
    return !this._tagsExcludes
    .some(item=>href.includes(item));
  }

  _preFilter(href = ""){
    return !this._preFilterExc
    .some(item=>href.includes(item));
  }
  
  filter(href){
    return this._include(href) 
      && this._exclude(href) 
      && this._preFilter(href);
  }
  
}