"use strict";

const DATE_RX = /\d{4}\/(\d{2})\/(\d{2})/

module.exports = class Filter {

  constructor(
    tagsSanatize = ['facebook', 'newsletter'],
    tagsIncludes = ['atendimento', 'rio-de-janeiro'],
    tagsExcludes = ['pcd','caixa','vendedor','vendas',
    'emprego-net',]) {

    this._tagsSanatize = tagsSanatize;
    this._tagsIncludes = tagsIncludes;
    this._tagsExcludes = tagsExcludes;
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
  
}