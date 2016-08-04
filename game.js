var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 2000;

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(PORT, function(){
    console.log("server started on port: " + PORT);
});

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');

    socket.emit('serverMsg', {
    	msg: 'hello',
    });

    io.sockets.on('bla', function(data){
    console.log(data.msg);

    });
});