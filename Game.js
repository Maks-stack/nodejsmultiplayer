var express = require('express');
var app = express();
var port = process.env.PORT || 2000;
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

app.listen(port); //BLA
console.log("server started");

app.listen(port, function () {
    console.log('Example app listening on port '+ port +'!');
});

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');
});