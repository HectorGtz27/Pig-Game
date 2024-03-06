'use strict';

//These are DOM elements, being selected, these are so important!!!
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial conditions
score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');

//Restarting The Game
const init = function () {
  score0El.textContent = '0';
  score1El.textContent = '0';
  diceEl.classList.add('hidden');
  current0El.textContent = '0';
  current1El.textContent = '0';
  playing = true;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;

  //New changes
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

btnNew.addEventListener('click', init);

//Roll Dice Button
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  //Swith to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle method is used to switch between the two classes
  // In here we are using it to switch between the two players
  // If the class is there, it will be removed and if it is not there, it will be added
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    // Manipulating the src style
    diceEl.src = `images/dice-${dice}.png`;
    console.log(dice);

    //3. Check for rolled 1: if true, swith to the next player

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollDice);

// Holding Button
const hold = function () {
  if (playing) {
    // 1. Add current score to active player´s score
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player´s score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
};

btnHold.addEventListener('click', hold);
