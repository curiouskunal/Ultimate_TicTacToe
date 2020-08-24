//Server Code
const express = require("express");
const app = express();
var sql = require("mssql");
// config for your database
var db_config = require('./creds.json')
var http = require('http').Server(app);
var io = require('socket.io')(http);

var dateFormat = require('dateformat');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { throws } = require("assert");
const { exception } = require("console");
const { response } = require("express");
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
		leave_room(socket.room)
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
    	console.log('joining room: ' + socket.room);
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
		uploadFullBoard(move.fullBoard, move.room);
		socket.broadcast.to(move.room).emit("new move", move);
	});

});

async function uploadFullBoard(fullBoard, room_number){
	sql_request('POST', `UPDATE game SET board = '${fullBoard}' where room_number = '${room_number}'`)
		.then(result=>{
			return 200, result;
		})
		.catch(err=>{
			console.log(err);
			return 404, err;
		})
}

async function leave_room(room_number){
	sql_request('GET', `select users_count from room_numbers where room_number = '${room_number}'`)
		.then(result=>{
			sql_request('UPDATE', `UPDATE room_numbers SET users_count = ${result[0].users_count - 1} where room_number = '${room_number}'`)
				.then(result=>{
					return 200,result
				})
				.catch(err=>{
					return 404,result
				})
		})
		.catch(err=>{
			return 404, result
		})
}

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
		if (data.rowsAffected.length >= 2){
			result = "Deleted the room and game"
		}
		else{
			throw("Room/game not found")
		}
	}
	else if (type == 'UPDATE'){
		if (data.rowsAffected >= 1){
			result = "Updated the room"
		}
		else{
			throw("Room not found")
		}
	}
	else if (type == 'CREATE'){
		if (data.rowsAffected >= 1){
			result = "Created the game"
		}
	}
	else if (type == 'POST'){
		if (data.rowsAffected >= 1){
			result = "Updated game board"
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
			let returnJSON = {}
			returnJSON['rooms'] = result
			returnJSON['# of rooms'] = result.length
			res.status(200).send(returnJSON);
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
	var roomNum = Math.random().toString(36).substring(3,8);
	var date =  dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')
	sql_request('PUT', `INSERT INTO room_numbers (room_number, date_start, users_count) values('${roomNum}', '${date}', 1)`)
		.then(result=>{
			// add to game database table
			sql_request('CREATE', `INSERT into game (room_number, board) values('${roomNum}', '')`)
						.then(result2=>{
							res.status(200).send({"room number": roomNum, "message": result});
						})
						.catch(err=>{
							res.status(404).send(err);
						})
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
	if (parameters['room_number'] == 'all'){
		sql_request('DELETE', `DELETE FROM game; DELETE FROM room_numbers;`)
			.then(result=>{
				res.status(200).send(result)
			})
			.catch(err=>{
				res.status(404).send(err)
			})
	}else {
		sql_request('DELETE', `DELETE FROM game where room_number = '${parameters['room_number']}'; DELETE FROM room_numbers where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			res.status(200).send(result);
		})
		.catch(err=>{
			res.status(404).send(err)
		})
	}
})


/**
* @swagger
* /api/joinRoom:
*   post:
*     description: Join a room
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
app.post('/api/joinRoom', function(req, res){
	parameters = req.query;
	sql_request('GET', `select users_count from room_numbers where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			sql_request('UPDATE', `UPDATE room_numbers SET users_count = ${result[0].users_count + 1} where room_number = '${parameters['room_number']}'`)
				.then(result=>{
					res.status(200).send(result);
				})
				.catch(err=>{
					res.status(404).send(err)
				})
		})
		.catch(err=>{
			res.status(404).send(err)
		})
})

/**
* @swagger
* /api/leaveRoom:
*   post:
*     description: Join a room
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
app.post('/api/leaveRoom', function(req, res){
	parameters = req.query;
	code, result = leave_room(parameters['room_number'])
	res.status(code).send(result)
})


/**
* @swagger
* /api/allGames:
*   get:
*     description: Get all games
*     tags: [Game]
*     produces:
*       - application/json
*     responses:
*       200:
*         description: room number
*/
app.get('/api/allGames', function(req, res){
	sql_request('GET', 'SELECT * FROM game')
		.then(result=>{
			res.send(result);
		})
		.catch(err=>{
			console.log(err)
			res.status(404).send("Failed to get games")
		})
})

http.listen((process.env.PORT || 8080), function(){
	console.log('listening in azure');
});