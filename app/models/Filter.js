"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Filter {

  constructor(
    sanatize = ['facebook', 'newsletter'],
    tagsIncludes = ['atendimento', 'rio-de-janeiro'],
    tagsExcludes = ['caixa','vendedor', ]) {

    this._sanatize = sanatize;
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

  sanatize(href = ""){
    return !this._sanatize
    .some(item=>href.includes(item));
  }
  
  filter(href){
    return this._include(href) 
      && this._exclude(href);
  }
  
}