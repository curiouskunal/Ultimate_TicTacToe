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
		console.log('user disconnected: ' + socket.id);
		// decrement database
		try {
			if (socket.room != undefined){
				leave_room(socket.room, socket.id)
				socket.leave(socket.room);
			}
		} catch (error) {
			console.log(error)
		}
	});

	// socket.on('room', function(){
	// 	socket.room = socket.id;
	// 	console.log('current room: ' + socket.room);
    //     socket.leave(socket.room);
		
    // 	socket.room = roomNum;
    // 	socket.join(roomNum);
    // 	console.log('new room: ' + socket.room);

    // 	io.sockets.connected[socket.id].emit('roomConnected', {'room':roomNum});
    // 	console.log(socket.id + ' connected to room ' + roomNum);
	// 	var rooms = io.sockets.adapter.rooms;
	// 	console.log('All rooms: ');
	// 	for (var i in rooms){
	// 		console.log('\troom id: ' + i);
	// 	}
	// 	console.log('------------------------------------------------------------------------');
	// });

	socket.on('joinRoom',function(data){
		let roomNumber = data['roomNum']
		let null_chars = data['null_chars']
		socket.room = roomNumber;
    	socket.join(roomNumber);
    	console.log('joining room: ' + socket.room);
		var room = io.nsps['/'].adapter.rooms[roomNumber];

		if (room.length == 2){
			if (null_chars == 2){
				var start = 'X';
				if (Math.random() < 0.5)
					start = 'O';
				var userChar = 'X';
				for (var id in room.sockets){
					var time = new Date();
					console.log('sending information to ' + id);
					io.sockets.connected[id].emit('setCharacter', {'userChar':userChar, 'start':start, 'time':JSON.stringify(time), 'socket_id':id});
					userChar = 'O';
				}
			}
			else{
				// find which column is null
				getNotNullCharacter(roomNumber)
			}
		}else{
			// do nothing and wait for second player to join in
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
		uploadFullBoard(move.fullBoard, move.room, move.turn, move.move);
		socket.broadcast.to(move.room).emit("new move", move);
	});

});

async function uploadFullBoard(fullBoard, room_number, last_player, square){
	sql_request('POST', `UPDATE game SET board = '${fullBoard}', last_player = '${last_player}', square = '${square}' where room_number = '${room_number}'`)
		.then(result=>{
			return 200, result[0];
		})
		.catch(err=>{
			console.log(err);
			return 404, err;
		})
}

async function getNotNullCharacter(room_number){
	let myChar = ''
	let nextTurn = ''
	sql_request('GET', `SELECT * from room_numbers where room_number = '${room_number}'`)
		.then(result=>{
			for (key in result[0])
				if (result[0][key] == null)
					myChar = key
			sql_request('GET', `SELECT last_player from game where room_number='${room_number}'`)
				.then(result2 =>{
					nextTurn = (result2[0].last_player == 'X') ? 'O' : 'X'
				})
				.catch(err =>{
					nextTurn = null
				})
				.finally(() => {
					let joinedId = [result[0]['x_user'], result[0]['o_user']]
					let newUserSocketId = ''
					let room = io.nsps['/'].adapter.rooms[room_number];
					for (id in room['sockets'])
						if (!joinedId.includes(id))
							newUserSocketId = id

					// resend setcharacter socket message
					let userChar = myChar.charAt(0).toUpperCase();
					io.sockets.connected[newUserSocketId].emit('setCharacter', {'userChar':userChar, 'start':nextTurn, 'time':JSON.stringify(new Date()), 'socket_id':newUserSocketId});
				})
		})
		.catch(err=>{
			console.log(err);
			return "ERROR"
		})
}

function str_to_array(board){
    let innerBoard = new Array(3)

    let rows = board.split("\n")
    for (let i = 0; i < rows.length; i++){
        innerBoard[i] = rows[i].split("\t")
    }
    return innerBoard;
}

async function leave_room(room_number, socket_id = ""){

	let promise = new Promise((resolve, reject) => {
		sql_request('GET', `select * from room_numbers where room_number = '${room_number}'`)
		.then(result1=>{
			sql_request('GET', `select board from game where room_number = '${room_number}'`)
				.then(result2=>{
					let myChar = ""
					for (key in result1[0]) 
						if (result1[0][key] == socket_id){
							myChar = key
							break
						}
						if (myChar != ""){
							sql_request('UPDATE', `UPDATE room_numbers SET ${myChar} = null where room_number = '${room_number}'`)
								.then(result3=>{
									if (result1[0].users_count == 1 && result2[0].board != ""){
										resolve([true, result1[0].users_count])
									}
									else{
										resolve([false, result1[0].users_count])
									}
								})
								.catch(err =>{
									if (result1[0].users_count == 1 && result2[0].board != ""){
										resolve([true, result1[0].users_count])
									}
									else{
										resolve([false, result1[0].users_count])
									}
								})
							}
						else{
							if (result1[0].users_count == 1 && result2[0].board != ""){
								resolve([true, result1[0].users_count])
							}
							else{
								resolve([false, result1[0].users_count])
							}
						}

				})
				.catch(() =>{
					// do nothing
				})
		})
	});
	
	let confirmation = await promise;
	let users_count = confirmation[1]
	if (users_count > 0)
		sql_request('UPDATE', `UPDATE room_numbers SET users_count = ${users_count - 1} where room_number = '${room_number}'`)
			.then(result=>{
				return [200,result[0]]
			})
			.catch(err=>{
				return [404,err]
			})
	else
		return 200, 'Left room'
}


async function send_refresh(){
	io.sockets.emit('allRoomUpdate', 'Update');
}

async function sql_request(type, query){
	let pool = await sql.connect(db_config);
	let data = await pool.request()
		.query(query)
		.catch(err =>{
			if (err.message.includes("Violation of PRIMARY KEY constraint")){
				throw("Duplicate Room Number")
			}else{
				console.log("ERROR: " + err.message)
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
			result = ["Updated the room", data]
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
			returnJSON['count'] = result.length
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
	sql_request('PUT', `INSERT INTO room_numbers (room_number, date_start, users_count) values('${roomNum}', '${date}', 0)`)
		.then(result=>{
			// add to game database table
			sql_request('CREATE', `INSERT into game (room_number, board) values('${roomNum}', '')`)
						.then(result2=>{
							res.status(200).send({"room number": roomNum, "message": result});
						})
						.catch(err=>{
							res.status(404).send(err);
						})
						.finally(() =>{
							send_refresh()
						})
		})
		.catch(err=>{
			res.status(404).send(err)
		})
		.finally(() =>{
			send_refresh()
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
			.finally(() =>{
				send_refresh()
			})
	}else {
		sql_request('DELETE', `DELETE FROM game where room_number = '${parameters['room_number']}'; DELETE FROM room_numbers where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			res.status(200).send(result);
		})
		.catch(err=>{
			res.status(404).send(err)
		})
		.finally(() =>{
			send_refresh()
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
	sql_request('GET', `select * from room_numbers where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			sql_request('UPDATE', `UPDATE room_numbers SET users_count = ${result[0].users_count + 1} where room_number = '${parameters['room_number']}'`)
				.then(result1=>{
					res.status(200).send(result);
				})
				.catch(err=>{
					res.status(404).send(err)
				})
				.finally(() =>{
					send_refresh()
				})
		})
		.catch(err=>{
			res.status(404).send(err)
		})
		.finally(() =>{
			send_refresh()
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
	result = leave_room(parameters['room_number'])
	try{
		send_refresh()
		res.status(result[0]).send(result[1])
	}
	catch (error){
		send_refresh()
		res.status(500).send(error.message);
	}
})

/**
* @swagger
* /api/setCharacter:
*   post:
*     description: Assign the chartacter for user
*     tags: [Room]
*     parameters:
*       - in: query
*         name: room_number
*         schema:
*           type: string
*       - in: query
*         name: character
*         schema:
*           type: string
*       - in: query
*         name: socket_id
*         schema:
*           type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         description: room number
*/
app.post('/api/setCharacter', function(req, res){
	parameters = req.query;
	sql_request('UPDATE', `UPDATE room_numbers SET ${parameters['character']}_user = '${parameters['socket_id']}' where room_number = '${parameters['room_number']}'`)
		.then(result=>{
			res.send(result[0]);
		})
		.catch(err=>{
			console.log(err)
			res.status(404).send("Failed to update user's character")
		})
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

/**
* @swagger
* /api/getBoard:
*   get:
*     description: Get all games
*     tags: [Game]
*     parameters:
*       - in: query
*         name: room_number
*         schema:
*           type: string
*     produces:
*       - application/json
*     responses:
*       200:
*         description: game board
*/
app.get('/api/getBoard', function(req, res){
	parameters = req.query;
	sql_request('GET', `SELECT board, last_player, square FROM game where room_number='${parameters['room_number']}'`)
		.then(result=>{
			let receivedBoard = result[0].board;
			let tempFullBoard = ""
			if (receivedBoard != ""){
				tempFullBoard = [new Array(3), new Array(3), new Array(3)];

				let i = 0;
				let j = 0;
				let innerBoards = (receivedBoard.split(";")).slice(0,9)
				for (let innerBoard of innerBoards){
					tempFullBoard[i][j] = str_to_array(innerBoard)
					i++;
					if (i == 3){
						i = 0; 
						j++;
					}
				}
			}
			let data = {
				'board': tempFullBoard,
				'turn': result[0].last_player,
				'square': result[0].square
			}
			res.status(200).send(data)
		})
		.catch(err=>{
			console.log(err)
			res.status(404).send("Failed to get board")
		})
})

http.listen((process.env.PORT || 8080), function(){
	console.log('listening in azure');
});