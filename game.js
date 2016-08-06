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

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var PLAYER_COLORS = [
	RED = "#FF0000",
	CYAN = "#00fff9",
	YELLOW = "#fff400",
	GREEN = "#00ff38"];

var Player = function(id){
	var self = {
		x:250,
		y:250,
		id:id,
		color: "",
		number : "" + Math.floor(10 * Math.random()),
		pressingRight: false,
		pressingLeft: false,
		pressingUp: false,
		pressingDown: false,
		maxSpd: 10,
	}
	self.updatePosition = function(){
		if(self.pressingRight)
			self.x += self.maxSpd;
		if(self.pressingLeft)
			self.x -= self.maxSpd;
		if(self.pressingUp)
			self.y -= self.maxSpd;
		if(self.pressingDown)
			self.y += self.maxSpd;
	}
	return self;
} 

var io = require('socket.io')(server,{});

io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
    console.log('socket connection');

    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;

    socket.on('disconnect', function(){
    	delete SOCKET_LIST[socket.id];
    	delete PLAYER_LIST[socket.id];
    });

    socket.on('keyPress', function(data){
    	if(data.inputId === 'left')
    		player.pressingLeft = data.state;
    	else if(data.inputId === 'right')
    		player.pressingRight = data.state;
    	else if(data.inputId === 'up')
    		player.pressingUp = data.state;
    	else if(data.inputId === 'down')
    		player.pressingDown = data.state;
    });
});

setInterval(function(){
	var pack = [];
	var index= 0;
    for(var i in PLAYER_LIST){
    	var player = PLAYER_LIST[i];
    	player.updatePosition();
    	pack.push({
    		x:player.x,
    		y:player.y,
    		number: player.number,
    		color : PLAYER_COLORS[index]
    	});
    	index++;
    }
    for(var i in SOCKET_LIST){
    	var socket = SOCKET_LIST[i];
       	socket.emit('newPositions', pack);
    }
},1000/25);










