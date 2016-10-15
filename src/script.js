function startGame() {
	document.turn = "X";

	setMessage(document.turn + " gets to start.");
}

function setMessage(msg) {
	document.getElementById("message").innerText = msg;
}

function nextMove(square) {
	square.innerText = document.turn;
	checkCompletedBoard(square);
	switchTurn();
}

function switchTurn() {
	if (document.turn == "X") {
		document.turn = "O";
	} else {
		document.turn = "X";
	}

	setMessage("It's " + document.turn + "'s turn!");
}
function checkCompletedBoard(square){
	var boardID = square.parentNode.parentNode.parentNode.parentNode.id;
	var boardTable = document.getElementById(boardID).children[0].children[0].children;
	var innerBoard = getBoard(boardTable);
	console.log(innerBoard);

	for (var i = 0; i < innerBoard.length; i++){
		for (var j = 0; j < innerBoard[i].length; j++){
		}
	}	

	if (innerBoard[0][0] == square.innerText && innerBoard [0][1] == square.innerText && innerBoard[0][2] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[1][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[1][2] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[2][0] == square.innerText && innerBoard [2][1] == square.innerText && innerBoard[2][2] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][0] == square.innerText && innerBoard[2][0] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[0][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][2] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][0] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[0][1] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][1] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
	else if (innerBoard[0][2] == square.innerText && innerBoard [1][2] == square.innerText && innerBoard[2][2] == square.innerText){
		window.alert(square.innerText + " wins");
		document.getElementById(boardID) .style.backgroundColor = 'pink';
	}
}

function getBoard(boardTable){
	var innerBoard= [[],[],[]];
	for (var i = 0; i<boardTable.length;i++){
		var row = boardTable[i].children;
		for(var j = 0; j<row.length;j++){	
			innerBoard[i][j] = row[j].innerText;
		}
	}
	return innerBoard;
}