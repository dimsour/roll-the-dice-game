'use strict';

const totalScore = document.querySelectorAll('.score');
const currentScore = document.querySelectorAll('.current-score');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImage = document.querySelector('.dice');
const currentPlayer = document.querySelectorAll('.player');

let winScore,
  diceValue,
  player1,
  currentPoints1,
  currentPoints2,
  score1,
  score2;

function init() {
  winScore = 100;
  diceValue = 0;
  player1 = true;
  currentPoints1 = 0;
  currentPoints2 = 0;
  score1 = 0;
  score2 = 0;
  diceImage.hidden = true;
}

function playerLost() {
  if (player1) {
    currentPoints1 = 0;
    currentScore[0].textContent = currentPoints1;
    currentPlayer[0].classList.remove('player--active');
    currentPlayer[1].classList.add('player--active');
    player1 = false;
  } else {
    currentPoints2 = 0;
    currentScore[1].textContent = currentPoints2;
    currentPlayer[1].classList.remove('player--active');
    currentPlayer[0].classList.add('player--active');
    player1 = true;
  }
  diceImage.hidden = true;
}

function generateDice() {
  let randomDice = Math.floor(Math.random() * 6) + 1;
  diceImage.src = `dice-${randomDice}.png`;
  diceImage.hidden = false;
  if (randomDice != 1) {
    if (player1) {
      currentPoints1 += randomDice;
      currentScore[0].textContent = currentPoints1;
    } else {
      currentPoints2 += randomDice;
      currentScore[1].textContent = currentPoints2;
    }
  } else playerLost();
}

function playerWin() {
  if (player1) {
    currentPlayer[0].classList.remove('player--active');
    currentPlayer[0].classList.add('player--winner');
    currentScore[0].textContent = 0;
  } else {
    currentPlayer[1].classList.remove('player--active');
    currentPlayer[1].classList.add('player--winner');
    currentScore[1].textContent = 0;
  }
  rollDiceBtn.disabled = true;
  holdBtn.disabled = true;
}

function hold() {
  if (player1) {
    if (score1 + currentPoints1 < winScore) {
      score1 += currentPoints1;
      totalScore[0].textContent = score1;
      playerLost();
    } else {
      score1 += currentPoints1;
      totalScore[0].textContent = score1;
      playerWin();
    }
  } else {
    if (score2 + currentPoints2 < winScore) {
      score2 += currentPoints2;
      totalScore[1].textContent = score2;
      playerLost();
    } else {
      playerWin();
      score2 += currentPoints2;
      totalScore[1].textContent = score2;
    }
  }
}

function newGame() {
  //   rollDiceBtn.disabled = false;
  //   holdBtn.disabled = false;
  //   diceImage.hidden = false;
  //   currentPlayer[0].classList.add('player--active');
  //   currentPlayer[1].classList.remove('player--active');
  //   currentPlayer[0].classList.remove('player--winner');
  //   currentPlayer[1].classList.remove('player--winner');
  //   totalScore[0].textContent = 0;
  //   totalScore[1].textContent = 0;
  //   currentScore[0].textContent = 0;
  //   currentScore[1].textContent = 0;
  //   init();
  location.reload();
}

init();
rollDiceBtn.addEventListener('click', generateDice);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
