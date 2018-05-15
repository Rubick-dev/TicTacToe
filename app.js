
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
var ranPos, filteredPosLen; //part of the random position algorithm for the AI

// Display messages
var aiTurnMessage = "The AI is taking a turn";
var ply1TurnMesage = "Your turn Player #1";
var ply2TurnMessage = "Your turn Player #2";
var initMsg = "Please Choose Game Options below";


initializeGame();


// ##### On Page load sets up the variables and display #####
function initializeGame(){ 
  
  console.log("################## NEW GAME #########################");
  //Setting Scores for players to zero
  plyOneScore = 0;
  plyTwoScore = 0;
  // only runs this clearing when game ends and carrying onto next.
  clearGameBoard();
  // Sets the right elements to be showing on the page
  // document.querySelector(".text").style.display = "none";
  setInitMsg();
  document.querySelector(".choose-symbol").style.display = "none";
  document.querySelector(".score-div-top").style.display = "none";
  document.querySelector(".new-game").style.display = "flex";
  document.querySelector(".aiswap").textContent = "AI";
  // adding event to trigger chooseSymbol function after selecting no. of players 
  for (let j = 0; j < gameType.length; j++){
    gameType[j].addEventListener('click', chooseSymbol, false);
  };
};

function setInitMsg(){
  document.querySelector(".text").textContent = initMsg;
  document.querySelector(".text").style.color = "#A4A63C";
  document.querySelector(".game-message").style.display = "flex";
}

function continueGame(){
  clearGameBoard();
  for (let i = 0; i < tttCells.length; i++) {
    tttCells[i].addEventListener('click', turnAIClick, false);
  }
  console.log(tttBoard + " after continue game button, array for tttBoard");
  if (plyTurn == "2") {
    console.log("Player 2 first go");
    AIsTurn();
    setTimeout(function() { turn(getRandomPos(), plyAI);
    }, 2000);
  } else {
    console.log("Player 1 first go");
    ply1sTurn();
    // plyTurn == "1" ? ply1sTurn() : AIsTurn();
  }
};


// Function for playing the next game without hard resetting everything
function clearGameBoard(){
  tttBoard = Array.from(Array(9).keys());
  document.querySelector('.p1s').innerText = plyOneScore;
  document.querySelector('.p2s').innerText = plyTwoScore;
  //Setting player to go first
  plyTurn = Math.floor(Math.random() * 2) + 1;
  console.log(plyTurn + " randomed players turn");
  //Setting the tttcells to clear
  for (let i = 0; i < tttCells.length; i++) {
    tttCells[i].innerText = '';
    tttCells[i].style.removeProperty('background-color');
  }
  return;
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


// ##### Function for initiating the game board and enabling clicking on the board #####
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
c 

  } else { // runs if one player was selected
    plyAI = plyOne == "X" ? circleSymbol : crossSymbol;
    console.log("Player AI's symbol is " + plyAI);
    if (plyTurn == "2") {
      console.log("Player 2 first go");
      AIsTurn();
      setTimeout(function() { turn(getRandomPos(), plyAI);
      }, 2000);
    } 
    for (let i = 0; i < tttCells.length; i++) {
      tttCells[i].addEventListener('click', turnAIClick, false);
    }
    ply1sTurn();
    plyTurn == "1" ? ply1sTurn() : AIsTurn();
  }
};

function AIsTurn(){
  document.querySelector(".text").textContent = aiTurnMessage;
  document.querySelector(".text").style.color = "#9E3947";
  document.querySelector(".game-message").style.display = "flex";
};

function ply1sTurn(){
  document.querySelector(".text").textContent = ply1TurnMesage;
  document.querySelector(".text").style.color = "#2F456E";
  document.querySelector(".game-message").style.display = "flex";
};

function ply1WinsMsg(){
  document.querySelector(".text").textContent = "Player #1 Wins!";
  document.querySelector(".text").style.color = "#2F456E";
  document.querySelector(".game-message").style.display = "flex";
};

function plyAIWinsMsg(){
  document.querySelector(".text").textContent = "AI Wins!";
  document.querySelector(".text").style.color = "#9E3947";
  document.querySelector(".game-message").style.display = "flex";
};

// ##### Function to activate on a click followed by computer turn #####
function turnAIClick(tttbox){
  if (typeof tttBoard[tttbox.target.id] == 'number' && plyTurn == "1"){
    turn(tttbox.target.id, plyOne);
    if ((!checkWin(tttBoard, plyOne))){
      if (!checkIfTie()){
      setTimeout(function() { 
        turn(getRandomPos(), plyAI);
      }, 2500);
    }
    }
  }
};


// ##### takes the turn after a click or after a computer takes a turn #####
function turn(tttBoxID, playersSymbol){
  plyTurn = plyTurn == "1" ? 2 : 1;
  plyTurn == "1" ? ply1sTurn() : AIsTurn();
  console.log(plyTurn + " toggling the playersTurn");
  // console.log(tttBoxID + " is the grid position, " + playersSymbol + " is the symbol of the players turn");
  tttBoard[tttBoxID] = playersSymbol;
  document.getElementById(tttBoxID).innerText = playersSymbol;
  let gameWon = checkWin(tttBoard, playersSymbol);
  console.log("### Checking to see if player " + plyTurn + " is a winner");
  if (gameWon){
    console.log("gameWon is true");
  }
  if (gameWon) {
    gameOver(gameWon);
  } else {
    console.log("Checking if game is a tie because gameWon is false")
  checkIfTie();
  }
};


function getRandomPos() {
  let filteredList = tttBoard.filter(s => typeof s == 'number');
  filteredPosLen = filteredList.length;
  ranPos = Math.floor(Math.random() * filteredPosLen);
  return filteredList[ranPos];
};


function checkIfTie() {
  console.log("###Checking if Tie ###")
  console.log((tttBoard.filter(s => typeof s == 'number').length === 0)+ " no squares free if true");
	if (filteredPosLen === 0 || tttBoard.filter(s => typeof s == 'number').length === 0) {
		for (var i = 0; i < tttCells.length; i++) {
			tttCells[i].style.backgroundColor = "#A4A63C";
			tttCells[i].removeEventListener('click', turnAIClick, false);
		}
    declareWinner("Tie Game!");
    
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
			gameWon.player == plyOne ? "#2F456E" : "#9E3947";
	}
	for (var i = 0; i < tttCells.length; i++) {
		tttCells[i].removeEventListener('click', turnAIClick, false);
	}
	declareWinner(gameWon.player == plyOne ? 1 : 2);
};


function declareWinner(who) {
	document.querySelector(".game-message").style.display = "flex";
  if (who == "Tie Game!") {
    document.querySelector(".text").style.color = "#A4A63C";
  } else if (who == 1) {
    ply1WinsMsg();
    plyOneScore ++;
    document.querySelector(".p1s").innerText = plyOneScore;
  } else if (who == 2){
    plyAIWinsMsg();
    plyTwoScore ++;
    document.querySelector(".p2s").innerText = plyTwoScore;
  }
  // document.querySelector(".text").textContent = who;
};




// Logic not done for two player game yet
function twoPlayerGame(){
  console.log("No logic fortwo player game yet!");
};
