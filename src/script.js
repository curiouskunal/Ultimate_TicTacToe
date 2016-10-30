var setColor = "#79A6D8"
var fullBoard = [[],[],[]];
var winningSet = [];
fullBoard[0][0] = null;
fullBoard[0][1] = null;
fullBoard[0][2] = null;
fullBoard[1][0] = null;
fullBoard[1][1] = null;
fullBoard[1][2] = null;
fullBoard[2][0] = null;
fullBoard[2][1] = null;
fullBoard[2][2] = null;

var win = null;

// game setup. called at startup.
// determines who will start
function startGame() {
	document.turn = "X";
	if (Math.random() < 0.5) {
		document.turn = "O";
	}
	setMessage(document.turn + " gets to start.");
}

// will set status message
function setMessage(msg) {
	document.getElementById("message").innerText = msg;
}

// switches player and updates message
function nextMove(square) {
	if (win == null){
		// if tile is empty
		if(square.innerText == ""){
			
			// Print move to board
			square.innerText = document.turn;
	
			// log player move.
			// console.log("player: " + document.turn + " Played at: " + square.parentNode.parentNode.parentNode.parentNode.id + " || " + square.id);
	
			// display as last move
			document.getElementById("sirep").innerText = "last move: " + square.parentNode.parentNode.parentNode.parentNode.id + " || " + square.id;
	
			
			// Check if win then change turn
			checkCompletedBoard(square);
	
			changeColour(square);
	
			switchTurn();
		}
	}
	else {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				
			}
		}
	}
}

// test for replacing sub games into Winner Symbol
function testMove(){
	document.getElementById("B00").innerHTML = "X";
	document.getElementById("B01").innerHTML = "-";
	document.getElementById("B02").innerHTML = "O";
	document.getElementById("B10").innerHTML = "-";
	document.getElementById("B11").innerHTML = "X";
	document.getElementById("B12").innerHTML = "O";
	document.getElementById("B20").innerHTML = "O";
	document.getElementById("B21").innerHTML = "O";
	document.getElementById("B22").innerHTML = "X";
}


// alternates player turn
function switchTurn() {
	if (document.turn == "X") {
		document.turn = "O";
	} else {
		document.turn = "X";
	}
	setMessage("It's " + document.turn + "'s turn!");

}

function changeColour(square){
	
	var boardID;
	var tileID = square.id;

	// set Next move's playable region boardID
	
	switch(tileID) {
		case "s1":
			boardID = 'B00';
			break;
		case "s2":
			boardID = 'B01';
			break;
		case "s3":
			boardID = 'B02';
			break;
		case "s4":
			boardID = 'B10';
			break;
		case "s5":
			boardID = 'B11';
			break;
		case "s6":
			boardID = 'B12';
			break;
		case "s7":
			boardID = 'B20';
			break;
		case "s8":
			boardID = 'B21';
			break;
		case "s9":
			boardID = 'B22';
			break;
	}

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (fullBoard[boardID.charAt(1)][boardID.charAt(2)] != null) {
				if (fullBoard[i][j] == null) {
					// set all backgound colour
		    		document.getElementById("B"+i+j) .style.backgroundColor = setColor;
		    		// set whole board clickable
		    		document.getElementById("B"+i+j).style.pointerEvents = 'auto';
				}
				else{
					// set all backgound colour
		    		document.getElementById("B"+i+j) .style.backgroundColor = 'white';
		    		// set whole board clickable
		    		document.getElementById("B"+i+j).style.pointerEvents = 'none';
				}
			}
			else{
					// set all backgound colour
		    		document.getElementById("B"+i+j) .style.backgroundColor = 'white';
		    		// set whole board clickable
		    		document.getElementById("B"+i+j).style.pointerEvents = 'none';

		    		// set playable region backgound colour to indicate active area.
					document.getElementById(boardID) .style.backgroundColor = setColor;
					// set region clickable
					document.getElementById(boardID).style.pointerEvents = 'auto'
			}
		}
	}
}

function checkCompletedBoard(square){
	var color = null;
	if (square.innerText == 'O'){
		color = 'red'
	}
	else{
		color = 'pink';
	}

	//id of the inner board
	var boardID = square.parentNode.parentNode.parentNode.parentNode.id;
	//the inner board element
	var boardTable = document.getElementById(boardID).children[0].children[0].children;
	//getting the inner board as a 2d array
	var innerBoard = getBoard(boardTable);
	//identifying the col and row of the innerBoard in terms of the fullBoard
	var row = boardID.charAt(1);
	var col = boardID.charAt(2);

	// row 1
	if (innerBoard[0][0] == square.innerText && innerBoard [0][1] == square.innerText && innerBoard[0][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//row 2
	else if (innerBoard[1][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[1][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//row 3
	else if (innerBoard[2][0] == square.innerText && innerBoard [2][1] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//col 1
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][0] == square.innerText && innerBoard[2][0] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//col 2
	else if (innerBoard[0][1] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][1] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//col 3
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][2] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	// diagonal
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	//diagonal 
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][0] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		
		//changing the label of the inner board to show a win
		document.getElementById(boardID).innerHTML = document.turn;

		//indicating on the full board that the inner board is won
		fullBoard[row][col] = square.innerText;
		console.log(fullBoard)
	}
	else{
		var flag = true;

		for (var i = 0; i < 3; i++){
			for (var j = 0; j<3; j++){
				if (innerBoard[i][j] == ""){
					flag = false;
					break;
				}
			}
		}

		if (flag){
			fullBoard[row][col] = "-";
			console.log(fullBoard)
			document.getElementById(boardID).innerHTML = "-";
		}
	}

	win = checkWin();
}

function checkWin(){
	var winner;
	// row 1
	if (fullBoard[0][0] == fullBoard[0][1] && fullBoard[0][0] == fullBoard[0][2] && fullBoard[0][0] !=null){
		winner = fullBoard[0][0];
		window.alert(fullBoard[0][0] + " wins the game!!!");
		winningSet = [00,01,02];
	}
	//row 2
	else if (fullBoard[1][0] == fullBoard[1][1] && fullBoard[1][0]  == fullBoard[1][2] && fullBoard[1][0]!=null){
		winner = fullBoard[1][0];
		window.alert(fullBoard[1][0] + " wins the game!!!");
		winningSet = [10,11,12];
	}
	//row 3
	else if (fullBoard[2][0] == fullBoard[2][1] && fullBoard[2][0]  == fullBoard[2][2] && fullBoard[2][0]!=null){
		winner = fullBoard[2][0];
		window.alert(fullBoard[2][0] + " wins the game!!!");
		winningSet = [20,21,22];
	}
	//col 1
	else if (fullBoard[0][0] == fullBoard[1][0] && fullBoard[0][0] == fullBoard[2][0] && fullBoard[0][0]!=null){
		winner = fullBoard[0][0];
		window.alert(fullBoard[0][0] + " wins the game!!!");
		winningSet = [00,10,20];
	}
	//col 2
	else if (fullBoard[0][1] == fullBoard[1][1] && fullBoard[0][1]  == fullBoard[2][1] && fullBoard[0][1]!=null){
		winner = fullBoard[0][1];
		window.alert(fullBoard[0][1] + " wins the game!!!");
		winningSet = [01,11,21];
	}
	//col 3
	else if (fullBoard[0][2] == fullBoard[1][2] && fullBoard[0][2]  == fullBoard[2][2] && fullBoard[0][2]!=null){
		winner = fullBoard[0][2];
		window.alert(fullBoard[0][2] + " wins the game!!!");
		winningSet = [02,12,22];
	}
	// diagonal
	else if (fullBoard[0][0] == fullBoard[1][1] && fullBoard[0][0]  == fullBoard[2][2] && fullBoard[0][0]!=null){
		winner = fullBoard[0][0];
		window.alert(fullBoard[0][0] + " wins the game!!!");
		winningSet = [00,11,22];
	}
	//diagonal 
	else if (fullBoard[0][2] == fullBoard[1][1] && fullBoard[0][2]  == fullBoard[2][0] && fullBoard[0][2]!=null){
		winner = fullBoard[0][2];
		window.alert(fullBoard[0][2] + " wins the game!!!");
		winningSet = [02,11,20];
	}
	return winner;
}

function getBoard(boardTable){
	var innerBoard= [[],[],[]];
	for (var i = 0; i<boardTable.length;i++){
		//get the row element
		var row = boardTable[i].children;
		for(var j = 0; j<row.length;j++){
			//get the inner text of every element and put it in a 2d array
			innerBoard[i][j] = row[j].innerText;
		}
	}
	return innerBoard;
}
// console.log(fullBoard);