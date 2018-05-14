
const circleSymbol = "O"
const crossSymbol = "X"
const tttCells = document.querySelectorAll(".pos");
const gameType = document.querySelectorAll(".players");
const playerSymbol = document.querySelectorAll(".symbol");
const fullResetButton = document.getElementById('reset-button');
const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]

var numPlayers; // sets to one or two from selecting number of players button option
var tttBoard; //is the array of the tictactoe board
var plyOne; //Sets the symbol of this player
var plyTwo; //Sets the symbol to be used for player two
var plyAI; //sets the symbol to be used for AI player
var plyTurn; // gets a random number of 1 or 2 to choose who goes first.
var plyOneScore = 0; // displays the score of player1
var plyTwoScore = 0; // displays the score of player2
var ranPos, filteredPosLen;

initializeGame();

// ##### On Page load sets up the variables and display #####
function initializeGame(){ 
  
  //Setting Scores for players back to zero
  plyOneScore = 0;
  document.querySelector('.p1s').innerText = plyOneScore;
  plyTwoScore = 0;
  document.querySelector('.p2s').innerText = plyTwoScore;

  //Setting player to go first
  plyTurn = Math.floor(Math.random() * 2) + 1;
  console.log(plyTurn + " randomed players turn");

  //Setting the intital array
  tttBoard = Array.from(Array(9).keys());

  //Setting the tttcells to clear
  for (let i = 0; i < tttCells.length; i++) {
    tttCells[i].innerText = '';
    tttCells[i].style.removeProperty('background-color');
  }

  // Sets the right elements to be showing
  document.querySelector(".end-game").style.display = "none";
  document.querySelector(".choose-symbol").style.display = "none";
  document.querySelector(".score-div-top").style.display = "none";
  document.querySelector(".new-game").style.display = "flex";

  // adding event to trigger chooseSymbol function after selecting no. of players 
  for (let j = 0; j < gameType.length; j++){
    gameType[j].addEventListener('click', chooseSymbol, false);
  };
};

// ##### Function for chosing symbol for player 1 ##### 
function chooseSymbol(e){ // after selecting number of players this function is run
  
  // seslected the version of the game to play
  numPlayers = e.target.id
  console.log(numPlayers + " player|s");

  // cancels listener for choosing number of players
  for (let i= 0; i < gameType.length; i++){
    gameType[i].removeEventListener('click', chooseSymbol, false);
  };

  // hides the new-game menu options and display the symbol selection content 
  document.querySelector(".new-game").style.display = "none";
  document.querySelector(".choose-symbol").style.display = "flex";

  // Starts the listener for selecting the symbol for player 1, runs the setPlayer1Symbol function 
  for (let j = 0; j < playerSymbol.length; j++){
    playerSymbol[j].addEventListener('click', setPlayer1Symbol, false);
  };
};


// ##### Function for initiating hte game board and enabling clicking on the board #####
function setPlayer1Symbol(symbol){ // after choosing p1's Symbol this code is run
  
  // removes the symbol content and displays the score content
  document.querySelector(".choose-symbol").style.display = "none";
  document.querySelector(".score-div-top").style.display = "flex";

  // cancels the listener for the symbol options
  for (let j = 0; j < playerSymbol.length; j++){
    playerSymbol[j].removeEventListener('click', setPlayer1Symbol, false);
  };

  // sets the symbols to each player including the player that is not in the game
  plyOne = symbol.target.value == "X" ? crossSymbol : circleSymbol;
  console.log("Player one's symbol is " + plyOne);
  
  // Displays the right opponent, sets oppoenents symbol and trigger correct game logic
  if (numPlayers === "two") { //runs if two players was selected
    plyTwo = plyOne == "X" ? circleSymbol : crossSymbol;
    console.log("Player two symbol is " + plyTwo);
    document.querySelector('.aiswap').innerText = "#2";
    for (let i = 0; i < tttCells.length; i++) {
      tttCells[i].addEventListener('click', twoPlayerTurnClick, false);
    }

  } else { // runs if one player was selected
    plyAI = plyOne == "X" ? circleSymbol : crossSymbol;
    console.log("Player AI's symbol is " + plyAI);
    if (plyTurn == "2") {
      console.log("Player 2 first go");
      // console.log(randomPos() + " argument 1 fail  point");
      setTimeout(function() { turn(getRandomPos(), plyAI);
      }, 1000);
    } 
    for (let i = 0; i < tttCells.length; i++) {
      tttCells[i].addEventListener('click', turnAIClick, false);
    }
  }
};


// ##### Function to activate on a click #####
function turnAIClick(tttbox){
  if (typeof tttBoard[tttbox.target.id] == 'number' && plyTurn == "1"){
    turn(tttbox.target.id, plyOne);
    if ((!checkIfTie()) && plyTurn == 2){
      // console.log(getRandomPos() + " argument 1 fail  point");
      setTimeout(function() { 
        turn(getRandomPos(), plyAI);
      }, 1000);
    }
  }
};


function turn(tttBoxID, playersSymbol){
  plyTurn = plyTurn == "1" ? 2 : 1;
  // console.log(plyTurn + " toggling the playersTurn");
  // console.log(tttBoxID + " is the grid position, " + playersSymbol + " is the symbol of the players turn");
  tttBoard[tttBoxID] = playersSymbol;
  document.getElementById(tttBoxID).innerText = playersSymbol;
  let gameWon = checkWin(tttBoard, playersSymbol);
	if (gameWon) {
    gameOver(gameWon);
  }
};

function getRandomPos() {
  let filteredList = tttBoard.filter(s => typeof s == 'number');
  filteredPosLen = filteredList.length;
  ranPos = Math.floor(Math.random() * filteredPosLen);
  return filteredList[ranPos];
};


function checkIfTie() {
  console.log(filteredPosLen + " fpl length");
  console.log(tttBoard.filter(s => typeof s == 'number').length === 0 + " condition 2");
  let gameWon = checkWin(tttBoard, playersSymbol);
  if (gameWon) {
    gameOver(gameWon);
    return;
  }

	if (filteredPosLen === 0 || tttBoard.filter(s => typeof s == 'number').length === 0) {
		for (var i = 0; i < tttCells.length; i++) {
			tttCells[i].style.backgroundColor = "green";
			tttCells[i].removeEventListener('click', turnAIClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
};


function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombinations.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
};

function gameOver(gameWon) {
	for (let index of winCombinations[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == plyOne ? "blue" : "red";
	}
	for (var i = 0; i < tttCells.length; i++) {
		tttCells[i].removeEventListener('click', turnAIClick, false);
	}
	declareWinner(gameWon.player == plyOne ? "You win!" : "You lose.");
};


function declareWinner(who) {
	document.querySelector(".end-game").style.display = "inline";
	document.querySelector(".end-game .text").innerText = who;
};


// Logic not done for two player game yet
function twoPlayerGame(){
  console.log("No logic fortwo player game yet!");
}



// // Click event for placing the O or the X
// tictactoeClick.addEventListener("click", function(e){

//   console.log(e.target.id);
//   let id = e.target.id;
//   let TTTPos = e.target;
//   switch (id) {
//     case "pos1":
//       if (p1) {
//         p1 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos2":
//       if (p2) {
//         p2 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos3":
//       if (p3) {
//         p3 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos4":
//       console.log(p4);
//       if (p4) {
//         p4 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos5":
//       if (p5) {
//         p5 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos6":
//       if (p6) {
//         p6 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos7":
//       if (p7) {
//         p7 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos8":
//       if (p8) {
//         p8 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }

//     case "pos9":
//       if (p9) {
//         p9 = false;
//         placeTTTObj(TTTPos);
//         turn = turn == 1 ? 2 : 1;
//         break;
//     }
//   }

// e.stopPropagation();

// });

// function placeTTTObj(player){
//   if (turn == 1){
//     player.innerHTML=crossSymbol;
//   } else {
//     player.innerHTML=circleSymbol;
//   }
// }


// // Resets the page
// document.getElementById("reset-button").onclick = resetPage;

// function resetPage(){
//   turn = 1;
//   plyOneScore = 0;
//   plytwoScore = 0;
//   plyOneArr = [];
//   plyTwoArr = [];
//   p1 = true, p2 = true, p3 = true, p4 = true, p5 = true, p6 = true, p7 = true, p8 = true, p9 = true;
//   tictactoeClick.innerHTML = `
//     <tr>
//       <td class="pos pos1" id="pos1"></td>
//       <td class="pos pos2 verticle" id="pos2"></td>
//       <td class="pos pos3" id="pos3"></td>
//     </tr>

//     <tr>
//       <td class="pos pos4 horizontal" id="pos4"></td>
//       <td class="pos pos5 verticle horizontal" id="pos5"></td>
//       <td class="pos pos6 horizontal" id="pos6"></td>
//     </tr>

//     <tr>
//       <td class="pos pos7" id="pos7"></td>
//       <td class="pos pos8 verticle" id="pos8"></td>
//       <td class="pos pos9" id="pos9"></td>
//     </tr>
//   `
// }