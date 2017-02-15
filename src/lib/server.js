//Server Code
const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var roomNum = 1;
var numUsers = 0;

app.use(express.static(__dirname+"\\public\\"));

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
		socket.leave(roomNum);
	});

	socket.on('room', function(){
		socket.join(roomNum);
		var room = io.nsps['/'].adapter.rooms[roomNum];
		console.log(room.sockets);
		if (room.length == 2){
			var start = 'X'
			if (Math.random() < 0.5)
				start = 'O'
			var userChar = 'X';
			for (var id in room.sockets){
				io.to(id).emit('setCharacter', {'userChar':userChar, 'start':start});
				userChar = 'O';
			}
		}
	});

	socket.on("new move", function(move){
		socket.broadcast.to(roomNum).emit("new move", move);
	});

});

// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// });

http.listen((procress.env.PORT || 8080), function(){
	console.log('listening in azure');
});