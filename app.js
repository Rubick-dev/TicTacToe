// TIC TAC TOE APP
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
const aiTurnMessage = "The AI is taking a turn";
const ply1TurnMessage = "Your turn Player #1";
const ply2TurnMessage = "Your turn Player #2";
const initMsg = "Please Choose Game Options below";

initializeGame(); //starts the game


// ##### On Page load sets up the variables and display #####
function initializeGame(){ 
  console.log("################## NEW GAME #########################");
  // reseting variable values
  plyOneScore = 0; // displays the score of player1
  plyTwoScore = 0; // displays the score of player2
  // only runs this clearing when game ends and carrying onto next.
  clearGameBoard();
  // Sets the right elements to be showing on the page
  setInitMsg();
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".choose-symbol").style.display = "none";
  document.querySelector(".score-div-top").style.display = "none";
  document.querySelector(".new-game").style.display = "flex";
  document.querySelector(".aiswap").textContent = "AI";
  // adding event to trigger chooseSymbol function after selecting no. of players 
  for (let j = 0; j < gameType.length; j++){
    gameType[j].addEventListener('click', chooseSymbol, false);
  };
};


// ran after the continue button is pressed
function continueGame(){
  console.log("### Started new game after hitting Continue ###");
  resetAnimation();
  setTimeout(function() { 
    clearGameBoard();
    document.querySelector(".continue").style.visibility = "hidden";
    if (numPlayers == "one") {
      for (let i = 0; i < tttCells.length; i++) {
        tttCells[i].addEventListener('click', turnAIClick, false);
      }
      if (plyTurn == "2") {
        console.log("AI Player turn first");
        AIsTurn();
        setTimeout(function() { 
          let ranNumAIFG = Math.floor((Math.random() * 10));
          console.log(ranNumAIFG + " FIRST GO after RESET ##### if this is ## 5 ## stupids turn");
          if (ranNumAIFG == 5){
          turn(getRandomPos(), plyAI);
          } else {
            turn(bestSpot(), plyAI);
          }
        }, 2000);
      } else {
        ply1sTurn();
      }
    } else {
      for (let j = 0; j < tttCells.length; j++){
        tttCells[j].addEventListener('click', twoPlayerGame, false);
      }
      if (plyTurn == "2") {
        console.log("Player 2 first go");
        ply2sTurn();
      } else {
        ply1sTurn();
      }
    }
  }, 2500);
  
};


// Function for playing the next game without hard resetting everything
function clearGameBoard(){
  tttBoard = Array.from(Array(9).keys());
  console.log(tttBoard + " after continue game button, array for tttBoard");
  document.querySelector('.p1s').innerText = plyOneScore;
  document.querySelector('.p2s').innerText = plyTwoScore;
  //Setting player to go first
  plyTurn = Math.floor(Math.random() * 2) + 1;
  console.log(plyTurn + " randomed players turn");
  // Setting the tttCells to clear
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
  document.querySelector(".buttons").style.display = "flex";
  // cancels the listener for the symbol options
  for (let j = 0; j < playerSymbol.length; j++){
    playerSymbol[j].removeEventListener('click', setPlayer1Symbol, false);
  };
  // sets the symbols to each player including the player that is not in the game
  plyOne = symbol.target.value == "X" ? crossSymbol : circleSymbol;
  console.log("Player one's symbol is " + plyOne);
  
  // Displays the right opponent, sets oppoenents symbol and trigger correct game type logic
  if (numPlayers == "two") { //runs if two players was selected
    document.querySelector(".aiswap").textContent = "#2";
    plyTwo = plyOne == "X" ? circleSymbol : crossSymbol;
    console.log("Player two symbol is " + plyTwo);
    for (let i = 0; i < tttCells.length; i++) {
      tttCells[i].addEventListener('click', twoPlayerGame, false);
    }
    plyTurn == "1" ? ply1sTurn() : ply2sTurn();

  // ## GAME AGAINST THE AI ONLY ###
  } else { // runs if one player was selected
    plyAI = plyOne == "X" ? circleSymbol : crossSymbol;
    console.log("Player AI's symbol is " + plyAI);
    for (let i = 0; i < tttCells.length; i++) {
      tttCells[i].addEventListener('click', turnAIClick, false);
    }
    if (plyTurn == "2") {
      console.log("Player AI first go");
      AIsTurn();
      setTimeout(function() {
        let ranNumAIFG2 = Math.floor((Math.random() * 10));
        console.log(ranNumAIFG2 + " FIRST GO ##### if this is ## 5 ## stupids turn");
        if (ranNumAIFG2 == 5){
        turn(getRandomPos(), plyAI);
        } else {
          turn(bestSpot(), plyAI);
        }
      }, 2000);
    } else {
      ply1sTurn();
      plyTurn == "1" ? ply1sTurn() : ply2sTurn();
    }
  }
};


// MESSAGE DISPLAY Functions
function setInitMsg(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = initMsg;
  document.querySelector(".text").style.color = "#A4A63C";
  fadeIn(el, "flex");
  return;
};

function AIsTurn(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = aiTurnMessage;
  document.querySelector(".text").style.color = "#9E3947";
  fadeIn(el, "flex");
  return;
};

function ply1sTurn(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = ply1TurnMessage;
  document.querySelector(".text").style.color = "#2F456E";
  fadeIn(el, "flex");
  return;
};

function ply2sTurn(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = ply2TurnMessage;
  document.querySelector(".text").style.color = "#9E3947";
  fadeIn(el, "flex");
  return;
};

function ply1WinsMsg(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = "Player #1 Wins!";
  document.querySelector(".text").style.color = "#2F456E";
  fadeIn(el, "flex");
  return;
};

function ply2WinsMsg(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = "Player #2 Wins!";
  document.querySelector(".text").style.color = "#9E3947";
  fadeIn(el, "flex");
  return;
};

function plyAIWinsMsg(){
  let el = document.querySelector(".game-message");
  document.querySelector(".text").textContent = "AI Wins!";
  document.querySelector(".text").style.color = "#9E3947";
  fadeIn(el, "flex");
  return;
};


// ##### Function to activate on a click followed by computer turn #####
function turnAIClick(tttbox){
  if (typeof tttBoard[tttbox.target.id] == 'number' && plyTurn == "1"){
    turn(tttbox.target.id, plyOne);
    if ((!checkWin(tttBoard, plyOne))){
      if (!checkIfTie()){
        setTimeout(function() {
          let ranNumAI = Math.floor((Math.random() * 10));
          console.log(ranNumAI + " ##### if this is ## 5 ## stupids turn");
          if (ranNumAI == 5){
          turn(getRandomPos(), plyAI);
          } else {
            turn(bestSpot(), plyAI);
          }
        }, 2000);
      }
    }
  }
};


// ##### takes the turn after a click or after a computer takes a turn #####
function turn(tttBoxID, playersSymbol){
  plyTurn = plyTurn == "1" ? 2 : 1;
  console.log(plyTurn + " has been changed to this players turn");
  tttBoard[tttBoxID] = playersSymbol;
  document.getElementById(tttBoxID).innerText = playersSymbol;
  console.log(numPlayers + " - should be one or two and reps number of players");
  if (numPlayers == "one") {
    plyTurn == "1" ? ply1sTurn() : AIsTurn();
    console.log(plyTurn + " toggling the playersTurn message betwen pl1 and AI");
   } else {
    plyTurn == "1" ? ply1sTurn() : ply2sTurn();
  }
  let gameWon = checkWin(tttBoard, playersSymbol);
  console.log("### Checking to see if player " + plyTurn + ", " + playersSymbol + " -symbol is a winner");
  if (gameWon) {
    console.log("gameWon is true - running gameOver function");
    gameOver(gameWon);
  } else {
    console.log("Checking if game is a tie because gameWon is false")
    checkIfTie();
  }
};


// Gets a random position for the AI - I call it "No Intelligence"
function getRandomPos() {
  let filteredList = tttBoard.filter(s => typeof s == 'number');
  filteredPosLen = filteredList.length;
  ranPos = Math.floor(Math.random() * filteredPosLen);
  return filteredList[ranPos];
};


// Checks if a tie
function checkIfTie() {
  console.log("###Checking if Tie ###")
  console.log((tttBoard.filter(s => typeof s == 'number').length === 0) + " no squares free if true");
	if (filteredPosLen === 0 || tttBoard.filter(s => typeof s == 'number').length === 0) {
		for (var i = 0; i < tttCells.length; i++) {
			tttCells[i].style.backgroundColor = "#A4A63C";
      if (numPlayers == "one") {
        tttCells[i].removeEventListener('click', turnAIClick, false);
      } else {
        tttCells[i].removeEventListener('click', twoPlayerGame, false);
      }
    }
    declareWinner("Tie Game!");
    return true;
	}
	return false;
};


// Checks when run if there is a winner
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


// when gameWon is no longer null and therfore we have a winner, display winning tiles and remove eventlistner
function gameOver(gameWon) {
	for (let index of winCombinations[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = gameWon.player == plyOne ? "#2F456E" : "#9E3947";
    console.log(index + " index within gamewon function");
  }
  if (numPlayers == "one"){
    for (var i = 0; i < tttCells.length; i++) {
      tttCells[i].removeEventListener('click', turnAIClick, false);
    }
    declareWinner(gameWon.player == plyOne ? 1 : 2);
  } else {
    for (var i = 0; i < tttCells.length; i++) {
      tttCells[i].removeEventListener('click', twoPlayerGame, false);
    }
    declareWinner(gameWon.player == plyOne ? 1 : 3);
  }
};


// declaring the winner passing in the results array
function declareWinner(result) {
  document.querySelector(".game-message").style.display = "flex";
  document.querySelector(".continue").style.visibility = "visible";
  console.log(result + " result of calling declareWinner function")
  if (result == "Tie Game!") {
    document.querySelector(".text").style.color = "#A4A63C";
    document.querySelector(".text").innerText = result;
  } else if (result == 1) {
    ply1WinsMsg();
    plyOneScore ++;
    document.querySelector(".p1s").innerText = plyOneScore;
  } else if (result == 2){
    plyAIWinsMsg();
    plyTwoScore ++;
    document.querySelector(".p2s").innerText = plyTwoScore;
  } else if (result == 3){
    ply2WinsMsg();
    plyTwoScore ++;
    document.querySelector(".p2s").innerText = plyTwoScore;
  }
  return;
};


// two player game mode turnclick
function twoPlayerGame(tttbox){
  if (typeof tttBoard[tttbox.target.id] == 'number'){
    if (plyTurn == "1"){
      turn(tttbox.target.id, plyOne);
    } else {
      turn(tttbox.target.id, plyTwo);
    }
  }
};


// fade in function for game messages
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .015) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}


// The reset annimation for the grid - disco board
function resetAnimation(){
  console.log("Reset Animation function has triggered");
  for (let i = 0; i < tttCells.length; i++) {
    tttCells[i].innerText = '';
    tttCells[i].style.removeProperty('background-color');
  }
  var posArr = [];
  while (posArr.length < 60) {
    let ranNum = Math.floor((Math.random() * 9));
    posArr.push(ranNum);
  }
  console.log(posArr + " Position array");

  let x = 0;
  let len = posArr.length;
  (function theLoop (cellPositions, x) {
    
    setTimeout(function (){
      let color = Math.floor((Math.random() * 9) +1);
      let ranColorVar = "col" + color;
      let cell = cellPositions[x];

      document.getElementById(cell).style.backgroundColor= colorReturn();
      // document.getElementById(cell).bgColor = colorReturn();

      // sets the backgroundColor to the corrosponding variuable
      function colorReturn(){
        if (ranColorVar == "col1"){
        return "#AA5239";
      } else if (ranColorVar == "col2"){
        return "#2F456E";
      } else if (ranColorVar == "col3"){
        return "#3A8831";
      } else if (ranColorVar == "col4"){
        return "#413272";
      } else if (ranColorVar == "col5"){
        return "#A4A63C";
      } else if (ranColorVar == "col6"){
        return "#276B5C";
      } else if (ranColorVar == "col7"){
        return "#9E3947";
      } else if (ranColorVar == "col8"){
        return "#A77D3C";
      } else if (ranColorVar == "col9"){
        return "#8A325D";
      }
    };
      if (++x < len) {
        theLoop(cellPositions, x);
      }
    }, 25);
  })(posArr, x);
};


//##### Branch impAI ####
function emptySquares() {
	return tttBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return minimax(tttBoard, plyAI).index;
}


// function to get best move
function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, plyOne)) {
		return {score: -10};
	} else if (checkWin(newBoard, plyAI)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == plyAI) {
			var result = minimax(newBoard, plyOne);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, plyAI);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === plyAI) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
