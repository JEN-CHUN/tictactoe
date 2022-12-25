"use strict";

// InterFace
const startMenu = document.querySelector(".startMenu");
const chooseMenu = document.querySelector(".choose");
const tikBoard = document.querySelector(".tikBoard");
// Buttons and Clickable Places
const square = document.querySelectorAll(".tikBoard__square");
const check = document.querySelectorAll(".tikBoard__check");
const startBtn = document.querySelector(".startMenu__start");

// Button of In-Game settings
const resetGameBtn = document.querySelector(".tikBoard__control__again");
const resetScoreBtn = document.querySelector(".tikBoard__control__reset");
const returnMenuBtn = document.querySelector(".tikBoard__control__return");

// The waiting-for-choosen symbol
const chooseSymbol = document.querySelectorAll(".choose__select__symbol");

// The symbol of the players
const playerOneSymbol = document.querySelector("#player-one-symbol");
const playerTwoSymbol = document.querySelector("#player-two-symbol");

// The score of the time of winning
const playerOneScoreShow = document.querySelector("#player-one");
const playerTwoScoreShow = document.querySelector("#player-two");

let playerOneScore = Number(localStorage.getItem("playerOneScore"));
let playerTwoScore = Number(localStorage.getItem("playerTwoScore"));

// Turn for the rounds
let turn = 0;

playerOneScoreShow.innerHTML = playerOneScore;
playerTwoScoreShow.innerHTML = playerTwoScore;

// The Shown Result
let msg = document.querySelector(".tikBoard__result");

// Initialize the Score to 0 if LocalStorage == 0 or Null. Set Score if LocalStorage score !== 0 or Null
if (
  localStorage.playerOneScore === undefined ||
  localStorage.playerTwoScore === undefined
) {
  localStorage.playerOneScore = 0;
  localStorage.playerTwoScore = 0;
  console.log("Initailized the score");
}

// Check If the Match Already Match the Codition
const checkIfWin = function () {
  // The Symbols inside the Square
  const one = square[0].textContent;
  const two = square[1].textContent;
  const three = square[2].textContent;
  const four = square[3].textContent;
  const five = square[4].textContent;
  const six = square[5].textContent;
  const seven = square[6].textContent;
  const eight = square[7].textContent;
  const nine = square[8].textContent;

  console.clear();

  const conditionOne =
    one === two && one === three && one !== "" && two !== "" && three !== "";
  const conditionTwo =
    four === five && four === six && four !== "" && five !== "" && six !== "";
  const conditionThree =
    seven === eight &&
    seven === nine &&
    seven !== "" &&
    eight !== "" &&
    nine !== "";
  const conditionFour =
    one === four && one === seven && one !== "" && four !== "" && seven !== "";
  const conditionFive =
    two === five && two === eight && two !== "" && five !== "" && eight !== "";
  const conditionSix =
    three === six &&
    three === nine &&
    three !== "" &&
    six !== "" &&
    nine !== "";
  const conditionSeven =
    one === five && one === nine && one !== "" && five !== "" && nine !== "";
  const conditionEight =
    three === five &&
    three === seven &&
    three !== "" &&
    five !== "" &&
    seven !== "";

  const threeInLine =
    conditionOne ||
    conditionTwo ||
    conditionThree ||
    conditionFour ||
    conditionFive ||
    conditionSix ||
    conditionSeven ||
    conditionEight;

  const AllFull =
    one !== "" &&
    two !== "" &&
    three !== "" &&
    four !== "" &&
    five !== "" &&
    six !== "" &&
    seven !== "" &&
    eight !== "" &&
    nine !== "";

  const endGame = function (msg) {
    for (let i = 0; i < square.length; i++) {
      square[i].classList.add("filter", "unclickable");
    }
  };

  const changeColor = function (one, two, three) {
    square[one].style.backgroundColor = "#f7253a";
    square[two].style.backgroundColor = "#f7253a";
    square[three].style.backgroundColor = "#f7253a";
  };

  if (conditionOne) {
    changeColor(0, 1, 2);
  }

  if (conditionTwo) {
    changeColor(3, 4, 5);
  }

  if (conditionThree) {
    changeColor(6, 7, 8);
  }

  if (conditionFour) {
    changeColor(0, 3, 6);
  }

  if (conditionFive) {
    changeColor(1, 4, 7);
  }

  if (conditionSix) {
    changeColor(2, 5, 8);
  }

  if (conditionSeven) {
    changeColor(0, 4, 8);
  }

  if (conditionEight) {
    changeColor(2, 4, 6);
  }

  setTimeout(() => {}, "1000");

  if (threeInLine) {
    turn === 1
      ? ((playerOneScore += 1),
        localStorage.setItem("playerOneScore", playerOneScore),
        (msg.innerHTML = "先手勝利"))
      : ((playerTwoScore += 1),
        localStorage.setItem("playerTwoScore", playerTwoScore),
        (msg.innerHTML = "後手勝利"));

    setTimeout(() => {
      endGame();
      msg.style.opacity = 1;
      msg.style.zIndex = "1";
    }, "1000");

    playerOneScoreShow.innerHTML = playerOneScore;
    playerTwoScoreShow.innerHTML = playerTwoScore;
  }

  if (!threeInLine && AllFull) {

    setTimeout(() => {
      endGame();
      msg.innerHTML = "平手";
      msg.style.opacity = 1;
      msg.style.zIndex = "1";
    }, "500");

  }
};

// Click to start the game
startBtn.addEventListener("click", () => {
  startMenu.classList.add("none");
  chooseMenu.classList.remove("none");
});

for (let i = 0; i < chooseSymbol.length; i++) {
  chooseSymbol[i].addEventListener("click", () => {
    // console.log(chooseSymbol[i].innerHTML);
    console.log(chooseSymbol[i] === chooseSymbol[0]);
    chooseMenu.classList.add("none");
    tikBoard.classList.remove("none");
    chooseSymbol[i] === chooseSymbol[0]
      ? ((playerOneSymbol.textContent = "\u25EF"),
        (playerTwoSymbol.textContent = "\u2A09"))
      : ((playerOneSymbol.textContent = "\u2A09"),
        (playerTwoSymbol.textContent = "\u25EF"));
    chooseMenu.classList.add("none");
  });
}

// In game, if player clicked on the square, then the circle or cross will show.
for (let i = 0; i < square.length; i++) {
  square[i].addEventListener("click", () => {
    // console.log(`${check[i].textContent}`);

    turn == 0
      ? ((check[i].textContent = playerOneSymbol.textContent), (turn = 1))
      : ((check[i].textContent = playerTwoSymbol.textContent), (turn = 0));
    // console.log(check[i].textContent)
    square[i].classList.add("unclickable");
    checkIfWin();
  });
}
resetGameBtn.addEventListener("click", () => {
  msg.style.opacity = "";
  msg.style.zIndex = "";
  turn = 0;
  for (let i = 0; i < square.length; i++) {
    square[i].classList.remove("unclickable", "filter");
    square[i].style.backgroundColor = "";
    check[i].textContent = "";
  }
});

resetScoreBtn.addEventListener("click", () => {
  playerOneScore = 0;
  playerTwoScore = 0;
  localStorage.playerOneScore = 0;
  localStorage.playerTwoScore = 0;
  playerOneScoreShow.innerHTML = playerOneScore;
  playerTwoScoreShow.innerHTML = playerTwoScore;
});

returnMenuBtn.addEventListener("click", () => {
  msg.style.opacity = "";
  msg.style.zIndex = "";
  turn = 0;
  tikBoard.classList.add("none");
  startMenu.classList.remove("none");

  for (let i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = "";
    check[i].textContent = "";
    square[i].classList.remove("unclickable", "filter");
  }
});
