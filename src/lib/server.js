//Server Code
const express = require("express");
const app = express();
var sql = require("mssql");
// config for your database
var db_config = require('./creds.json')
var http = require('http').Server(app);
var io = require('socket.io')(http);

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { throws } = require("assert");
const { exception } = require("console");
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
  apis: ['server.js'], // <-- not in the definition, but in the options
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
		// decrement database
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


async function sql_request(type, query){
	let pool = await sql.connect(db_config);
	let data = await pool.request()
		.query(query)
		.catch(err =>{
			if (err.message.includes("Violation of PRIMARY KEY constraint")){
				throw("Duplicate Room Number")
			}	
		});
	let result = []
	if (type == 'GET'){
		for (let i=0;i<data.rowsAffected;i++){
			result.push(data.recordset[i]);
		}
	}
	else if (type == 'PUT'){
		if (data.rowsAffected == 1){
			result = "Created new room"
		}
	}
	else if (type == 'DELETE'){
		if (data.rowsAffected == 1){
			result = "Deleted the room"
		}
		else{
			throw("Room not found")
		}
	}
	pool.close;
	sql.close;

	return result;
}

// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// });

app.get('.*',function(req,res){
	res.send('root');
});

/**
* @swagger
* /api/allRooms:
*   get:
*     description: Get all rooms
*     tags: [Room]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: room number
*/
app.get('/api/allRooms', function(req, res){
	sql_request('GET', 'SELECT * FROM room_numbers')
		.then(result=>{
			res.send(result);
		})
		.catch(err=>{
			console.log(err)
			res.status(404).send("Failed to get rooms")
		})
})

/**
* @swagger
* /api/createRoom:
*   put:
*     description: Create new room
*     tags: [Room]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: room number
*/
app.put('/api/createRoom', function(req, res){
	parameters = req.query;
	var roomNum = Math.random().toString(36).substring(3,8);
	var date = new Date().toISOString()
	sql_request('PUT', `INSERT INTO room_numbers (room_number, date_start, users_count) values('${roomNum}', '${date}', 1)`)
		.then(result=>{
			res.status(200).send(result + ":" + roomNum);
			// add to game database table
		})
		.catch(err=>{
			res.status(404).send(err)
		})
})

/**
* @swagger
* /api/closeRoom:
*   delete:
*     description: Close a room
*     tags: [Room]
*     parameters:
*       - in: query
*         name: room_number
*         schema:
*           type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Confirmation
*/
app.delete('/api/closeRoom', function(req, res){
	parameters = req.query;
	sql_request('DELETE', `DELETE FROM room_numbers where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			res.status(200).send(result);
		})
		.catch(err=>{
			res.status(404).send(err)
		})
})

http.listen((process.env.PORT || 8080), function(){
	console.log('listening in azure');
});