"use strict";

var app = require('./app/configs/express/express');
var server = app.listen(3000,()=>console.log('Server running...'));