'use strict';

const totScore0 = document.getElementById('score--0');
const totScore1 = document.getElementById('score--1');
const diceObj = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentElem0 = document.getElementById('current--0');
const currentElem1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let current, totals, activePlayer, playing;

//resets
const reset = () => {
  current = 0;
  totals = [0, 0];
  activePlayer = 0;
  totScore0.textContent = 0;
  totScore1.textContent = 0;
  currentElem0.textContent = 0;
  currentElem1.textContent = 0;
  playing = true;

  diceObj.classList.add('hidden');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--winner');
};

reset();
//switching player
const switchPlayer = () => {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//roll dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generate random number (1-6)
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //display the corresponding dice object
    diceObj.src = `img/dice-${diceRoll}.png`;
    diceObj.classList.remove('hidden');

    //if diceroll!=1 add to current score else reset to 0 and switch player
    if (diceRoll !== 1) {
      current += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

//hold dice
btnHold.addEventListener('click', () => {
  if (playing) {
    totals[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      totals[activePlayer];

    if (totals[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceObj.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener('click', reset);
