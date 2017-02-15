<?php
<!DOCTYPE html>

<head>
	<title>Ultimate TicTacToe</title>

	<link rel="stylesheet" href="style.css">
	<script src="script.js"></script>

	<!-- animation for modal -->
	<script src="assets/ModalWindowEffects/modernizr.custom.js"></script>

	<!-- tab icon -->
	<link rel="icon" href="./assets/Icon.ico">

	<!--view port-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>


<body onload="startGame(1)">

	<!-- Welcome Page overlay -->
	<div id="myNav" class="overlay">
	  <!-- Overlay content -->
	  <div class="overlay-content">
		  <h1> Ultimate TicTacToe </h1>
		  <p> by: Kunal Shah & Pareek Ravi</p>
		  <a id="play" href="#" onclick="closeNav()">Play</a>

	  </div>

	</div> 	<!--end overlay-->

	<!-- Welcome Page overlay -->
	<div id="endNav" class="overlay">
	  <!-- Overlay content -->
	  <div class="overlay-content">
		  <h1> Ultimate TicTacToe </h1>
		  <h2 id='gameWinner'></h2>
		  <a id = 'playAgain' href="#" onclick="playAgainNav()">Play Again</a>
       	  <a id = 'return2board' href="#" onclick="closeEndNav()">Return to Board</a>

		  <a href="https://docs.google.com/forms/d/e/1FAIpQLSekvLCrBR4rCmp-UyowbEf6BMYrye7hVo7iVt2xwzaER1xcng/viewform"> <p> Thank you for playing <p> </a>

	  </div>

	</div> 	<!--end overlay-->


	<div class = header >

		<a id="title" href="#" onclick="openEndNav()">Ultimate Tic-Tac-Toe</a>

		<div id="message">PLAYER gets to start.</div>


		<div class="md-modal md-effect-9" id="modal-9">
			<div class="md-content">
				<h3>Rules</h3>
				<div>
					<p>
						Each turn, you mark one of the small squares <br> When you get three in a row on a
						small board, you've won that board.
					</p>

					<p>
						You don't get to pick which of the nine boards to play on. That's determined by
						your opponent's previous move. Whichever square they pick, that's the board you
						must play in next. <br>(And whichever square you pick will determine which board they play on next.)
					</p>

				</div>

				<h3>FAQ:</h3>
				<div>
					<p>
						<b>What if my opponent sends me to a board that's already been won?</b> <br>In that case,
						congratulations - you get to go anywhere you like, on any of the other boards. <br>
						(This means you should avoid sending your opponent to an already-won board!)
					</p>

					<p>
						<b>What if one of the small boards results in a tie?</b><br>The board will count for neither X nor
						O.
					</p>

					<p>
						<b>How do I restart or re-play the game?</b><br> Click on the Ultimate Tic Tac Toe Title
					</p>
					<button id = "closeRules" class="md-close">Close Rules</button>
				</div>
			</div>
		</div>

		<div class="main clearfix">
			<button id = "rules" class="md-trigger" data-modal="modal-9">Rules</button>
		</div><!-- /container -->
		<div class="md-overlay"></div><!-- the overlay element -->


	</div> 	<!-- close header -->

	<div id="Game-Board">
		<div class = center id="center">
			<table class= mainTable> <!-- table of tables  -->
				<tr id="row1"> <!-- Row 1  -->
					<td id="B00" class = 'box' align = "center">
						<table > <!-- Col 1  -->
							<tr>
								<td id="00s1" class="Square"></td>
								<td id="00s2" class="Square"></td>
								<td id="00s3" class="Square"></td>
							</tr>
							<tr>
								<td id="00s4" class="Square"></td>
								<td id="00s5" class="Square"></td>
								<td id="00s6" class="Square"></td>
							</tr>
							<tr>
								<td id="00s7" class="Square"></td>
								<td id="00s8" class="Square"></td>
								<td id="00s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B01" class = 'box' align = "center">
						<table > <!-- Col 2  -->
							<tr>
								<td id="01s1" class="Square"></td>
								<td id="01s2" class="Square"></td>
								<td id="01s3" class="Square"></td>
							</tr>
							<tr>
								<td id="01s4" class="Square"></td>
								<td id="01s5" class="Square"></td>
								<td id="01s6" class="Square"></td>
							</tr>
							<tr>
								<td id="01s7" class="Square"></td>
								<td id="01s8" class="Square"></td>
								<td id="01s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B02" class = 'box' align = "center">
						<table > <!-- Col 3  -->
							<tr>
								<td id="02s1" class="Square"></td>
								<td id="02s2" class="Square"></td>
								<td id="02s3" class="Square"></td>
							</tr>
							<tr>
								<td id="02s4" class="Square"></td>
								<td id="02s5" class="Square"></td>
								<td id="02s6" class="Square"></td>
							</tr>
							<tr>
								<td id="02s7" class="Square"></td>
								<td id="02s8" class="Square"></td>
								<td id="02s9" class="Square"></td>
							</tr>
						</table>
					</td>
				</tr>

				<tr id="row2"> <!-- Row 2  -->
					<td id="B10" class = 'box' align = "center">
						<table > <!-- Col 1  -->
							<tr>
								<td id="10s1" class="Square"></td>
								<td id="10s2" class="Square"></td>
								<td id="10s3" class="Square"></td>
							</tr>
							<tr>
								<td id="10s4" class="Square"></td>
								<td id="10s5" class="Square"></td>
								<td id="10s6" class="Square"></td>
							</tr>
							<tr>
								<td id="10s7" class="Square"></td>
								<td id="10s8" class="Square"></td>
								<td id="10s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B11" class = 'box' align = "center">
						<table > <!-- Col 2  -->
							<tr>
								<td id="11s1" class="Square"></td>
								<td id="11s2" class="Square"></td>
								<td id="11s3" class="Square"></td>
							</tr>
							<tr>
								<td id="11s4" class="Square"></td>
								<td id="11s5" class="Square"></td>
								<td id="11s6" class="Square"></td>
							</tr>
							<tr>
								<td id="11s7" class="Square"></td>
								<td id="11s8" class="Square"></td>
								<td id="11s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B12" class = 'box' align = "center">
						<table > <!-- Col 3  -->
							<tr>
								<td id="12s1" class="Square"></td>
								<td id="12s2" class="Square"></td>
								<td id="12s3" class="Square"></td>
							</tr>
							<tr>
								<td id="12s4" class="Square"></td>
								<td id="12s5" class="Square"></td>
								<td id="12s6" class="Square"></td>
							</tr>
							<tr>
								<td id="12s7" class="Square"></td>
								<td id="12s8" class="Square"></td>
								<td id="12s9" class="Square"></td>
							</tr>
						</table>
					</td>
				</tr>

				<tr id="row3"> <!-- Row 3 -->
					<td id="B20" class = 'box' align = "center">
						<table > <!-- Col 1  -->
							<tr>
								<td id="20s1" class="Square"></td>
								<td id="20s2" class="Square"></td>
								<td id="20s3" class="Square"></td>
							</tr>
							<tr>
								<td id="20s4" class="Square"></td>
								<td id="20s5" class="Square"></td>
								<td id="20s6" class="Square"></td>
							</tr>
							<tr>
								<td id="20s7" class="Square"></td>
								<td id="20s8" class="Square"></td>
								<td id="20s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B21" class = 'box' align = "center" >
						<table > <!-- Col 2  -->
							<tr>
								<td id="21s1" class="Square"></td>
								<td id="21s2" class="Square"></td>
								<td id="21s3" class="Square"></td>
							</tr>
							<tr>
								<td id="21s4" class="Square"></td>
								<td id="21s5" class="Square"></td>
								<td id="21s6" class="Square"></td>
							</tr>
							<tr>
								<td id="21s7" class="Square"></td>
								<td id="21s8" class="Square"></td>
								<td id="21s9" class="Square"></td>
							</tr>
						</table>
					</td>

					<td id="B22" class = 'box' align = "center" >
						<table > <!-- Col 3  -->
							<tr>
								<td id="22s1" class="Square"></td>
								<td id="22s2" class="Square"></td>
								<td id="22s3" class="Square"></td>
							</tr>
							<tr>
								<td id="22s4" class="Square"></td>
								<td id="22s5" class="Square"></td>
								<td id="22s6" class="Square"></td>
							</tr>
							<tr>
								<td id="22s7" class="Square"></td>
								<td id="22s8" class="Square"></td>
								<td id="22s9" class="Square"></td>
							</tr>
						</table>
					</td>
				</tr>
			</table> <!-- close table of tables  -->
			
		</div>
	</div>


	<!-- classie.js by @desandro: https://github.com/desandro/classie -->
	<script src="assets/ModalWindowEffects/classie.js"></script>
	<script src="assets/ModalWindowEffects/modalEffects.js"></script>


</body>
</html>
?>