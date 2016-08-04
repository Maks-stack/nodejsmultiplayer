var express = require('express');
var app = express();
var serv = require('http').Server(app);
var port = process.env.PORT;

serv.listen(port); //BLA
console.log("server started");

