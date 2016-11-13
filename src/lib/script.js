/**
 * @constant setColour {string} - Blue
 */
var setColor = "#79A6D8";
/**
 * @constant fullBoard {array} Array to represent the status of the full board
 */
var fullBoard = [[], [], []];
/**
 * @constant winningSet {array} array of won boards
 */
var winningSet = null;
/**
 * @constant win {string} string of winning player, null untill winner is determined
 */
var win = null;

// setting board to null
fullBoard[0][0] = null;
fullBoard[0][1] = null;
fullBoard[0][2] = null;
fullBoard[1][0] = null;
fullBoard[1][1] = null;
fullBoard[1][2] = null;
fullBoard[2][0] = null;
fullBoard[2][1] = null;
fullBoard[2][2] = null;


/**
 * Will start the game and initialize player 1 to X or O
 *
*/
function startGame() {
	document.turn = "X";
	if (Math.random() < 0.5) {
		document.turn = "O";
	}
	setMessage(document.turn + " gets to start.");

    //creating a click listener for each element
	var squares = document.getElementsByClassName("Square");
	for (var s = 0; s < squares.length; s++){
        squares[s].addEventListener('click',nextMove,false);
    }
}

/**
* Display the status message to screen
* @param msg The message to display {string}
*/
function setMessage(msg) {
	document.getElementById("message").innerText = msg;
}

/**
 * Button to show and hide the rules
 */
function switchVisible() {
    if (document.getElementById('HideRules')) {
        if (document.getElementById('HideRules').style.display == 'none') {
            document.getElementById('HideRules').style.display = 'block';
            document.getElementById('ShowRules').style.display = 'none';
            document.getElementById("Button1").value="Show Rules";
        }
        else {
            document.getElementById('HideRules').style.display = 'none';
            document.getElementById('ShowRules').style.display = 'block';
            document.getElementById("Button1").value="Hide Rules";
        }
    }
}

/**
 * Called when the player makes a move
 * <ul style="list-style: none;">
 *     <li> checks if move is valid
 *     <li> print player move to screen
 *     <li> check board for win
 *     <li> change colour of active region
 *     <li> switch turn
 *</ul>
 */
function nextMove() {
	square = this;
        // console.log(square.id);

    if (win == null) {
        // if tile is empty
        if (square.innerText == "") {

            // Print move to board
            square.innerText = document.turn;

            // log player move.
            // console.log("player: " + document.turn + " Played at: " + square.parentNode.parentNode.parentNode.parentNode.id + " || " + square.id);

            // display as last move
            // document.getElementById("sirep").innerText = "last move: " + square.parentNode.parentNode.parentNode.parentNode.id + " || " + square.id;


            // Check if win then change turn
            checkCompletedBoard(square);

            changeColour(square);
            switchTurn();
        }
    }
    else {
    	console.log('Game over');
    }
}


/**
 * Switch player turn
 */
function switchTurn() {
	if (document.turn == "X") {
		document.turn = "O";
	} else {
		document.turn = "X";
	}
	setMessage("It's " + document.turn + "'s turn!");
}

/**
* Adding the colors to the inner square to indicate to the user where they can play their next move
* param square the small square that was clicked by the user {square}
*/
function changeColour(square) {

    var boardID;
    var tileID = square.id;
    tileID = tileID.substring(2);

    // set Next move's playable region boardID

    switch (tileID) {
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
    if (win == null) {
    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {

                // setting muliple active boards
    			if (fullBoard[boardID.charAt(1)][boardID.charAt(2)] != null) {
                    if (fullBoard[i][j] == null) {
                        // set all backgound colour
                        document.getElementById("B" + i + j).style.backgroundColor = setColor;
                        // set whole board clickable
                        document.getElementById("B" + i + j).style.pointerEvents = 'auto';
                    }
                    else {
                        // set all backgound colour
                        document.getElementById("B" + i + j).style.backgroundColor = 'none';
                        // set whole board clickable
                        document.getElementById("B" + i + j).style.pointerEvents = 'none';
                    }
                }

                // setting single active board
                else {
                	if (fullBoard[i][j] == null) {
                        // set all backgound colour
                        document.getElementById("B" + i + j).style.backgroundColor = 'white';
                        // set whole board clickable
                        document.getElementById("B" + i + j).style.pointerEvents = 'none';
                    }
                    // set playable region backgound colour to indicate active area.
                    document.getElementById(boardID).style.backgroundColor = setColor;
                    // set region clickable
                    document.getElementById(boardID).style.pointerEvents = 'auto';
                }
            }
        }
    }

    // if game has been won
    else {
    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {
    			if (fullBoard[i][j] == null) {
    				document.getElementById("B" + i + j).style.backgroundColor = 'white';
    			}
    			document.getElementById("B" + i + j).style.pointerEvents = 'none';
    		}
    	}
    }
}

/**
* Checks if there is a completed inner board
* @param square the square that was recently clicked {square}
*/
function checkCompletedBoard(square) {
	var color = null;
	if (square.innerText == 'O') {
		color = 'red'
	}
	else {
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
    if (innerBoard[0][0] == square.innerText && innerBoard [0][1] == square.innerText && innerBoard[0][2] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //row 2
    else if (innerBoard[1][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[1][2] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //row 3
    else if (innerBoard[2][0] == square.innerText && innerBoard [2][1] == square.innerText && innerBoard[2][2] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //col 1
    else if (innerBoard[0][0] == square.innerText && innerBoard [1][0] == square.innerText && innerBoard[2][0] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //col 2
    else if (innerBoard[0][1] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][1] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //col 3
    else if (innerBoard[0][2] == square.innerText && innerBoard [1][2] == square.innerText && innerBoard[2][2] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    // diagonal
    else if (innerBoard[0][0] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][2] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    //diagonal
    else if (innerBoard[0][2] == square.innerText && innerBoard [1][1] == square.innerText && innerBoard[2][0] == square.innerText) {
        //changing the color of the inner board to show a win
        document.getElementById(boardID).style.backgroundColor = color;

        //changing the label of the inner board to show a win
        document.getElementById(boardID).innerHTML = document.turn;

        //indicating on the full board that the inner board is won
        fullBoard[row][col] = square.innerText;
        // console.log(fullBoard)
    }
    else {
    	var flag = true;

    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {
    			if (innerBoard[i][j] == "") {
    				flag = false;
    				break;
    			}
    		}
    	}

    	if (flag) {
    		fullBoard[row][col] = "-";
            // console.log(fullBoard)
            document.getElementById(boardID).innerHTML = "-";
        }
    }
    win = checkWin();
}

/**
 * Method checks if there is a winner of the game.
 *
 * @returns winner {char} winner of the game
 */
function checkWin() {
	var winner;
    // row 1
    if (fullBoard[0][0] == fullBoard[0][1] && fullBoard[0][0] == fullBoard[0][2] && fullBoard[0][0] != null) {
    	winner = fullBoard[0][0];
    	// setMessage(fullBoard[0][0] + " wins the game!!!");
    	window.alert(fullBoard[0][0] + " wins the game!!!");
    	winningSet = ['00', '01', '02'];
    }
    //row 2
    else if (fullBoard[1][0] == fullBoard[1][1] && fullBoard[1][0] == fullBoard[1][2] && fullBoard[1][0] != null) {
    	winner = fullBoard[1][0];
    	// setMessage(fullBoard[1][0] + " wins the game!!!");
    	window.alert(fullBoard[1][0] + " wins the game!!!");
    	winningSet = ['10', '11', '12'];
    }
    //row 3
    else if (fullBoard[2][0] == fullBoard[2][1] && fullBoard[2][0] == fullBoard[2][2] && fullBoard[2][0] != null) {
    	winner = fullBoard[2][0];
    	// setMessage(fullBoard[2][0] + " wins the game!!!");
    	window.alert(fullBoard[2][0] + " wins the game!!!");
    	winningSet = ['20', '21', '22'];
    }
    //col 1
    else if (fullBoard[0][0] == fullBoard[1][0] && fullBoard[0][0] == fullBoard[2][0] && fullBoard[0][0] != null) {
    	winner = fullBoard[0][0];
    	// setMessage(fullBoard[0][0] + " wins the game!!!");
    	window.alert(fullBoard[0][0] + " wins the game!!!");
    	winningSet = ['00', '10', '20'];
    }
    //col 2
    else if (fullBoard[0][1] == fullBoard[1][1] && fullBoard[0][1] == fullBoard[2][1] && fullBoard[0][1] != null) {
    	winner = fullBoard[0][1];
    	// setMessage(fullBoard[0][1] + " wins the game!!!");
    	window.alert(fullBoard[0][1] + " wins the game!!!");
    	winningSet = ['01', '11', '21'];
    }
    //col 3
    else if (fullBoard[0][2] == fullBoard[1][2] && fullBoard[0][2] == fullBoard[2][2] && fullBoard[0][2] != null) {
    	winner = fullBoard[0][2];
    	// setMessage(fullBoard[0][2] + " wins the game!!!");
    	window.alert(fullBoard[0][2] + " wins the game!!!");
    	winningSet = ['02', '12', '22'];
    }
    // diagonal
    else if (fullBoard[0][0] == fullBoard[1][1] && fullBoard[0][0] == fullBoard[2][2] && fullBoard[0][0] != null) {
    	winner = fullBoard[0][0];
    	// setMessage(fullBoard[0][0] + " wins the game!!!");
    	window.alert(fullBoard[0][0] + " wins the game!!!");
    	winningSet = ['00', '11', '22'];
    }
    //diagonal
    else if (fullBoard[0][2] == fullBoard[1][1] && fullBoard[0][2] == fullBoard[2][0] && fullBoard[0][2] != null) {
    	winner = fullBoard[0][2];
    	// setMessage(fullBoard[0][2] + " wins the game!!!");
    	window.alert(fullBoard[0][2] + " wins the game!!!");
    	winningSet = ['02', '11', '20'];
    }
    if (winningSet != null) {
    	for (var i = 0; i < winningSet.length; i++) {
            // set all backgound colour
            document.getElementById("B" + winningSet[i].charAt(0) + winningSet[i].charAt(1)).style.backgroundColor = 'green';
            // set whole board clickable
            document.getElementById("B" + winningSet[i].charAt(0) + winningSet[i].charAt(1)).style.pointerEvents = 'none';
        }
    }
    return winner;
}

/**
 * converts html table element to array
 * @param boardTable HTML element {Table}
 * @returns innerBoard {array}
 */
function getBoard(boardTable) {
	var innerBoard = [[], [], []];
	for (var i = 0; i < boardTable.length; i++) {
        //get the row element
        var row = boardTable[i].children;
        
        for (var j = 0; j < row.length; j++) {
            //get the inner text of every element and put it in a 2d array
            innerBoard[i][j] = row[j].innerText;
        }
    }
    return innerBoard;
}