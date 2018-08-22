"use strict";

var app = require('./app/configs/express/express');
var wsSocket = require('./app/sockets/wsServerPeople').peopleSocket;
var server = app.listen(3000,()=>console.log('Server running...'));

wsSocket(server);