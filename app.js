
const circleSymbol = "O"
const crossSymbol = "X"
const tictactoeClick = document.getElementById('onx-parent');
const fullResetButton = document.getElementById('reset-button');
// const resetHTML = document.getElementById('tttboard-div');
const winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]]

var turn = 1;
var plyOneScore = 0;
var plytwoScore = 0;
var plyOneArr = [];
var plyTwoArr = [];
var plyAIArr = [];
var p1 = true, p2 = true, p3 = true, p4 = true, p5 = true, p6 = true, p7 = true, p8 = true, p9 = true;

startGame();

function startGame(){

};
// Click event for placing the O or the X
tictactoeClick.addEventListener("click", function(e){

  console.log(e.target.id);
  let id = e.target.id;
  let TTTPos = e.target;
  switch (id) {
    case "pos1":
      if (p1) {
        p1 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos2":
      if (p2) {
        p2 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos3":
      if (p3) {
        p3 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos4":
      console.log(p4);
      if (p4) {
        p4 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos5":
      if (p5) {
        p5 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos6":
      if (p6) {
        p6 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos7":
      if (p7) {
        p7 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos8":
      if (p8) {
        p8 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }

    case "pos9":
      if (p9) {
        p9 = false;
        placeTTTObj(TTTPos);
        turn = turn == 1 ? 2 : 1;
        break;
    }
  }

e.stopPropagation();

});

function placeTTTObj(player){
  if (turn == 1){
    player.innerHTML=crossSymbol;
  } else {
    player.innerHTML=circleSymbol;
  }
}


// Resets the page
document.getElementById("reset-button").onclick = resetPage;

function resetPage(){
  turn = 1;
  plyOneScore = 0;
  plytwoScore = 0;
  plyOneArr = [];
  plyTwoArr = [];
  p1 = true, p2 = true, p3 = true, p4 = true, p5 = true, p6 = true, p7 = true, p8 = true, p9 = true;
  tictactoeClick.innerHTML = `
    <tr>
      <td class="pos pos1" id="pos1"></td>
      <td class="pos pos2 verticle" id="pos2"></td>
      <td class="pos pos3" id="pos3"></td>
    </tr>

    <tr>
      <td class="pos pos4 horizontal" id="pos4"></td>
      <td class="pos pos5 verticle horizontal" id="pos5"></td>
      <td class="pos pos6 horizontal" id="pos6"></td>
    </tr>

    <tr>
      <td class="pos pos7" id="pos7"></td>
      <td class="pos pos8 verticle" id="pos8"></td>
      <td class="pos pos9" id="pos9"></td>
    </tr>
  `
}