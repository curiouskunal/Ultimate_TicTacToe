//Server Code
const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
	info: {
	    // API informations (required)
	    title: 'Ultimate Tic-Tac-Toe API', // Title (required)
	    version: '1.0.0', // Version (required)
	    description: 'An API to all the commands and calls', // Description (optional)
	}
};
var options = {
  explorer: true,
  swaggerDefinition,
  apis: ['./server.js'], // <-- not in the definition, but in the options
};


// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


app.use(express.static(__dirname+"/public/"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

io.on('connection', function(socket){

	var roomNum = Math.random().toString(36).substring(3,8);

	console.log('a user connected: ' + socket.id);

	socket.on('disconnect', function(){
		console.log('user disconnected');
		socket.leave(socket.room);
	});

	socket.on('room', function(){
		socket.room = socket.id;
		console.log('current room: ' + socket.room);
        socket.leave(socket.room);
		
    	socket.room = roomNum;
    	socket.join(roomNum);
    	console.log('new room: ' + socket.room);

    	io.sockets.connected[socket.id].emit('roomConnected', {'room':roomNum});
    	console.log(socket.id + ' connected to room ' + roomNum);
		var rooms = io.sockets.adapter.rooms;
		console.log('All rooms: ');
		for (var i in rooms){
			console.log('\troom id: ' + i);
		}
		console.log('------------------------------------------------------------------------');
	});

	socket.on('joinRoom',function(roomNumber){
		socket.room = roomNumber;
    	socket.join(roomNumber);
    	console.log('new room: ' + socket.room);
		var room = io.nsps['/'].adapter.rooms[roomNumber];

		if (room.length == 2){
			var start = 'X';
			if (Math.random() < 0.5)
				start = 'O';
			var userChar = 'X';
			for (var id in room.sockets){
				var time = new Date();
				console.log('sending information to ' + id);
				io.sockets.connected[id].emit('setCharacter', {'userChar':userChar, 'start':start, 'time':JSON.stringify(time)});
				userChar = 'O';
			}
		}

		var rooms = io.sockets.adapter.rooms;
		console.log('All rooms: ');
		for (var i in rooms){
			console.log('\troom id: ' + i);
		}
		console.log('------------------------------------------------------------------------');
	
	});
	socket.on("new move", function(move){
		console.log('sending move to ' + move.room);
		socket.broadcast.to(move.room).emit("new move", move);
	});

});

// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// });

app.get('.*',function(req,res){
	res.send('root');
});

/**
* @swagger
* /api/roomName:
*   get:
*     description: Get the current noom name
*     tags: [Room]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: room number
*/
app.get('/api/roomName', function(req, res){
	res.send('Getting room number')
})

http.listen((process.env.PORT || 8080), function(){
	console.log('listening in azure');
});