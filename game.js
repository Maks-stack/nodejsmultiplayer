var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 2000;

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

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

var FRICTION = 0.92;
var MAXSPEED = 10;

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
		velX: 0,
		velY: 0
	}
	self.updatePosition = function(){
		if(self.pressingRight)
			self.velX++;
		if(self.pressingLeft)
			self.velX --;
		if(self.pressingUp)
			self.velY --;
		if(self.pressingDown)
			self.velY ++;

		if(self.velX > MAXSPEED)
			self.velX = MAXSPEED;
		if(self.velX < -MAXSPEED)
			self.velX = -MAXSPEED;

		if(self.velY > MAXSPEED)
			self.velY = MAXSPEED;
		if(self.velY < -MAXSPEED)
			self.velY = -MAXSPEED;

		self.velX *= FRICTION;
		self.velY *= FRICTION;

		self.x += self.velX;
		self.y += self.velY;
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
    socket.on('sendMsgToServer', function(data){
    	var playerName = ("" + socket.id).slice(2,7);
    	for(var i in SOCKET_LIST){
    		SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
    	}
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
    		color : PLAYER_COLORS[index],
    		velX:player.velX,
    		velY:player.velY
    	});
    	index++;
    }
    for(var i in SOCKET_LIST){
    	var socket = SOCKET_LIST[i];
       	socket.emit('newPositions', pack);
    }
},1000/25);










