var fullBoard = [[],[],[]];
fullBoard[0][0] = null;
fullBoard[0][1] = null;
fullBoard[0][2] = null;
fullBoard[1][0] = null;
fullBoard[1][1] = null;
fullBoard[1][2] = null;
fullBoard[2][0] = null;
fullBoard[2][1] = null;
fullBoard[2][2] = null;

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
	if(square.innerText == ""){
		square.innerText = document.turn;
		checkCompletedBoard(square);
		switchTurn();
	}
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
	var row = boardID.charAt(1)-1;
	var col = boardID.charAt(2);

	// row 1
	if (innerBoard[0][0] == square.innerText && innerBoard [0][1] == square.innerText && innerBoard[0][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//row 2
	else if (innerBoard[1][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[1][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//row 3
	else if (innerBoard[2][0] == square.innerText && innerBoard [2][1] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//col 1
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][0] == square.innerText && innerBoard[2][0] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//col 2
	else if (innerBoard[0][1] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][1] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//col 3
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][2] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	// diagonal
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][2] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	//diagonal 
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][0] == square.innerText){
		//changing the color of the inner board to show a win
		document.getElementById(boardID) .style.backgroundColor = color;
		//indicating on the full board that the inner board is won
		fullBoard[col][row] = square.innerText;
	}
	checkWin();
}

function checkWin(){
	// row 1
	if (fullBoard[0][0] == fullBoard[0][1] && fullBoard[0][0] == fullBoard[0][2] && fullBoard[0][0] !=null){
		window.alert(fullBoard[0][0] + " wins the game!!!");
	}
	//row 2
	else if (fullBoard[1][0] == fullBoard[1][1] && fullBoard[1][0]  == fullBoard[1][2] && fullBoard[1][0]!=null){
		window.alert(fullBoard[1][0] + " wins the game!!!");
	}
	//row 3
	else if (fullBoard[2][0] == fullBoard[2][1] && fullBoard[2][0]  == fullBoard[2][2] && fullBoard[2][0]!=null){
		window.alert(fullBoard[2][0] + " wins the game!!!");
	}
	//col 1
	else if (fullBoard[0][0] == fullBoard[1][0] && fullBoard[0][0] == fullBoard[2][0] && fullBoard[0][0]!=null){
		window.alert(fullBoard[0][0] + " wins the game!!!");
	}
	//col 2
	else if (fullBoard[0][1] == fullBoard[1][1] && fullBoard[0][1]  == fullBoard[2][1] && fullBoard[0][1]!=null){
		window.alert(fullBoard[0][1] + " wins the game!!!");
	}
	//col 3
	else if (fullBoard[0][2] == fullBoard[1][2] && fullBoard[0][2]  == fullBoard[2][2] && fullBoard[0][2]!=null){
		window.alert(fullBoard[0][2] + " wins the game!!!");
	}
	// diagonal
	else if (fullBoard[0][0] == fullBoard[1][1] && fullBoard[0][0]  == fullBoard[2][2] && fullBoard[0][0]!=null){
		window.alert(fullBoard[0][0] + " wins the game!!!");
	}
	//diagonal 
	else if (fullBoard[0][2] == fullBoard[1][1] && fullBoard[0][2]  == fullBoard[2][0] && fullBoard[0][2]!=null){
		window.alert(fullBoard[0][2] + " wins the game!!!");
	}
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
console.log(fullBoard);