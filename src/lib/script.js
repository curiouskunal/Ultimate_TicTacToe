/**
 * @constant activeColor {string} - Orange
 */
var activeColor = "#FFAC7F";
/**
 * @constant Ocolor {string} - Player O winning color: Pink
 */
var Ocolor = '#ED76AF';
/**
 * @constant Xcolor {string} - Player X winning color: Mint
 */
var Xcolor = '#76edb4';
/**
 * @constant Xcolor {string} - Player hover color: Grey
 */
var hoverColor = 'grey';
/**
 * @constant MAX_PLAYERS {int}
 */
var MAX_PLAYERS = 2;
/**
 * @var fullBoard {array} Array to represent the status of the full board
 */
var fullBoard = [[], [], []];
/**
 * @var winningSet {array} array of won boards
 */
var winningSet = null;
/**
 * @var win {string} string of winning player, null until winner is determined
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
 * Will start the game
 * set up click listeners
 * and randomly initializes player 1 to X or O
 *
 * @param gameState 1: new instance of game (onload), 0:play again (newgame) {boolean}
 *
*/
function startGame(gameState) {
	document.turn = "X";
	if (Math.random() < 0.5) {
		document.turn = "O";
	}
	setMessage(document.turn + " gets to start.");

    setupListeners();

    //open overlay
    if (gameState){
        openNav();
    }
}


/**
 * Set up click listeners for each cell
 * Set up the onmouseover listener for each cell
 * Set up the onmouseleave listener for each cell
 *
*/
function setupListeners(){
    //creating a click listener for each element
    var squares = document.getElementsByClassName("Square");
    for (var s = 0; s < squares.length; s++){
        squares[s].addEventListener('click',nextMove,false);
        squares[s].addEventListener('mouseover',function(){
            hover(this);
        });
        squares[s].addEventListener('mouseleave',function(){
            offHover(this);
        });
    }
}
/**
 * Shows the current player's character when hovering over a cell
 * 
 * @param square the small square that was clicked by the user {square}
 *
*/
function hover(square){
    if (square.innerHTML == ""){
        square.innerHTML = document.turn;
        square.style.color = hoverColor;
    }
}
/**
 * Removed the current player's character when no longer hovering over a cell
 * 
 * @param square the small square that was clicked by the user {square}
 *
*/
function offHover(square){
    if (square.innerHTML == document.turn && square.style.color == hoverColor){
        square.innerHTML = null;
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
        if (square.innerHTML == document.turn && square.style.color == hoverColor) {

            // Print move to board
            square.innerText = document.turn;
            square.style.color = 'black';

            // log player move.
            // console.log("player: " + document.turn + " Played at: " + "B" + square.id);
            console.log("player: " + document.turn + " Played at: " + square.id);

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
 * Switch player turn,
 *
 * alternate between X and O, set msg accordingly
 *
 * if player has won set win message
 */
function switchTurn() {
    // turn swtich
	if (document.turn == "X") {
		document.turn = "O";
	} else {
		document.turn = "X";
	}
	// set user messages
    // if not won set player turn message
    if (win == null){
        setMessage("It's " + document.turn + "'s turn!");
    }
    // if game is won set win or draw message
    else{
        if (win == '-'){
            setMessage("Game has ended in draw");
        }
        else {
            setMessage(win + " has won the game!");
        }
        // open end screen at end of game
        openEndNav();
    }

}

/**
* Adding the colors to the inner square to indicate to the user where they can play their next move
* @param square the small square that was clicked by the user {square}
*/
function changeColour(square) {

    var boardID;
    var tileID = square.id;
    tileID = tileID.substring(2);

    // set Next players's active region's boardID

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

    // if the game is still in play loop through all game inner boards and
    //      set color of the active board(s)
    //      set only active board(s) clickable
    //
    if (win == null) {
    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {

                // setting muliple active boards
    			if (fullBoard[boardID.charAt(1)][boardID.charAt(2)] != null) {
                    if (fullBoard[i][j] == null) {
                        // set all backgound colour
                        document.getElementById("B" + i + j).style.backgroundColor = activeColor; //active highlight
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
                        document.getElementById('B' + i + j).style.backgroundColor = 'transparent';
                        // set whole board clickable
                        document.getElementById('B' + i + j).style.pointerEvents = 'none';
                    }
                    // set playable region backgound colour to indicate active area.
                    document.getElementById(boardID).style.backgroundColor = activeColor;
                    // set region clickable
                    document.getElementById(boardID).style.pointerEvents = 'auto';
                }
            }
        }
    }
    // if game has been won remove color of all non winning set boards
    //      if null, clear all color from board
    // set full board non-clickable
    else {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (winningSet != null) {
                    for (var k = 0; k < winningSet.length; k++) {
                        if (winningSet[k].charAt(0) != i && winningSet[k].charAt(1) != j) {
                            document.getElementById("B" + i + j).style.backgroundColor = 'transparent';
                        }
                    }
                }
                else{
                    document.getElementById("B" + i + j).style.backgroundColor = 'transparent';
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
		color = Ocolor; // pink
	}
	else {
		color = Xcolor; // mint
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

    // draw board
    else {
        // draw state flag, if true -> draw
    	var drawFlag = true;

        // loop through inner board
    	for (var i = 0; i < 3; i++) {
    		for (var j = 0; j < 3; j++) {
                // if any square has not been played yet
    			if (innerBoard[i][j] == "") {
                    // inner board not draw yet
    				drawFlag = false;
    				break;
    			}
    		}
    	}

        // if inner board is draw set fullboard and user view accordingly
    	if (drawFlag) {
    		fullBoard[row][col] = "-";
            // console.log(fullBoard)
            document.getElementById(boardID).innerHTML = "-";
        }
    }
    // check if game has been won
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
    	winningSet = ['00', '01', '02'];
    }
    //row 2
    else if (fullBoard[1][0] == fullBoard[1][1] && fullBoard[1][0] == fullBoard[1][2] && fullBoard[1][0] != null) {
    	winner = fullBoard[1][0];
    	// setMessage(fullBoard[1][0] + " wins the game!!!");
    	winningSet = ['10', '11', '12'];
    }
    //row 3
    else if (fullBoard[2][0] == fullBoard[2][1] && fullBoard[2][0] == fullBoard[2][2] && fullBoard[2][0] != null) {
    	winner = fullBoard[2][0];
    	// setMessage(fullBoard[2][0] + " wins the game!!!");
    	winningSet = ['20', '21', '22'];
    }
    //col 1
    else if (fullBoard[0][0] == fullBoard[1][0] && fullBoard[0][0] == fullBoard[2][0] && fullBoard[0][0] != null) {
    	winner = fullBoard[0][0];
    	// setMessage(fullBoard[0][0] + " wins the game!!!");
    	winningSet = ['00', '10', '20'];
    }
    //col 2
    else if (fullBoard[0][1] == fullBoard[1][1] && fullBoard[0][1] == fullBoard[2][1] && fullBoard[0][1] != null) {
    	winner = fullBoard[0][1];
    	// setMessage(fullBoard[0][1] + " wins the game!!!");
    	winningSet = ['01', '11', '21'];
    }
    //col 3
    else if (fullBoard[0][2] == fullBoard[1][2] && fullBoard[0][2] == fullBoard[2][2] && fullBoard[0][2] != null) {
    	winner = fullBoard[0][2];
    	// setMessage(fullBoard[0][2] + " wins the game!!!");
    	winningSet = ['02', '12', '22'];
    }
    // diagonal
    else if (fullBoard[0][0] == fullBoard[1][1] && fullBoard[0][0] == fullBoard[2][2] && fullBoard[0][0] != null) {
    	winner = fullBoard[0][0];
    	// setMessage(fullBoard[0][0] + " wins the game!!!");
    	winningSet = ['00', '11', '22'];
    }
    //diagonal
    else if (fullBoard[0][2] == fullBoard[1][1] && fullBoard[0][2] == fullBoard[2][0] && fullBoard[0][2] != null) {
    	winner = fullBoard[0][2];
    	// setMessage(fullBoard[0][2] + " wins the game!!!");
    	winningSet = ['02', '11', '20'];
    }
    // full game ends in draws
    else if (
        fullBoard[0][0] != null &&
        fullBoard[0][1] != null &&
        fullBoard[0][2] != null &&
        fullBoard[1][0] != null &&
        fullBoard[1][1] != null &&
        fullBoard[1][2] != null &&
        fullBoard[2][0] != null &&
        fullBoard[2][1] != null &&
        fullBoard[2][2] != null
    ){
        winner = '-';

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

/**
 * open the welcome page at the start of loading the page
 */
function openNav() {
    document.getElementById("myNav").style.height = "100%";
}
/**
 * close the welcome page to play the game
 */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}
/**
 * open the nav when a game has ended or when the ultimate button is clicked
 */
function openEndNav() {
    //when the game is won (not a draw and game ended)
    if (win != '-' && win != null){
        document.getElementById('gameWinner').innerText = 'The winner is ' + win;
    }
    //if the game has not yet ended
    else if (win == null){
        document.getElementById('gameWinner').innerText = '';
    }
    //if the game has ended in a draw
    else {
        document.getElementById('gameWinner').innerText = 'The game has ended in a draw'
    }
    //make the nav to full height
    document.getElementById("endNav").style.height = "100%";
}
/**
 * close the end nav to see game board again
 */
function closeEndNav() {
    document.getElementById("endNav").style.height = "0%";
}
/**
 * Play again, resets full game back to beginning,
 * set all global and local variables to null
 * loop though and reconstruct all HTML tables
 */
function playAgainNav(){
    //resetting the variables
    win = null;
    winningSet = null;
    //close the nav
    closeEndNav(); 
    //loop 3 times for the number of row   
    for(var i = 0; i<3;i++){
        // get a new row element
        var row = document.getElementById('row' + (i+1));
        // delete all children of this row
        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }
        // loop for the number of columns
        for (var j = 0; j<3;j++){
            //create the inner board and set al id and class
            var innerBoard = document.createElement('td');
            innerBoard.id = 'B' + i + j;
            innerBoard.className = 'box';
            innerBoard.align = 'center';
            // setup the inner elements
            var innerTable = document.createElement('table');
            var tbody = document.createElement('tbody');
            //count for the number of cells created
            var cellCount = 1;
            //loop for the rows of the inner board
            for(var x = 0; x<3;x++){
                //ceting the inner row
                var innerRow = document.createElement('tr');
                //loop for the inner columns
                for(var k = 0; k < 3; k++){
                    //creating the cell and the attribues
                    var cell = document.createElement('td');
                    cell.id = i+''+j+'s'+cellCount;
                    cell.className = 'Square';
                    cell.innerHTML = '';
                    cellCount++;
                    //add the cell to the row
                    innerRow.appendChild(cell);
                }
                //add the row to the body
                tbody.appendChild(innerRow);
            }
            //addng the tbody as a child of the inner table
            innerTable.appendChild(tbody);
            //adding innertable as a child of the inner board
            innerBoard.style.pointerEvents = 'auto';
            innerBoard.appendChild(innerTable);
            //adding the innertable as a child of the row
            row.appendChild(innerBoard);
            //setting the variable of the full board to null
            fullBoard[i][j] = null;
        }
    }
    //call to run a new game
    startGame(0);
    console.log('New Game')
}