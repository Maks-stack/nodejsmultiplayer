var express = require('express');
var app = express();
var serv = require('http').Server(app);
var port = process.env.PORT || 2000;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(port); //BLA
console.log("server started");

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');
});