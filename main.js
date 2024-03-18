import TetrisGame from './tetris-game.js';

/* ----- constants -----*/

const BLOCK_SIZE = 15;
const COLS = 10;
const ROWS = 20;

/* ----- app's state (variables) -----*/

let game;

/* ----- cached element references -----*/

const boardEl = document.getElementById('board-canvas');
const scoreEl = document.getElementById('score');
const nextPiecelEl = document.getElementById('next-piece-canvas');
const msgEl = document.getElementById('message');

/* ----- functions -----*/

function init() {
  const boardDisplay = boardEl.getContext('2d');
  const nextPieceDisplay = nextPiecelEl.getContext('2d');

  boardEl.width = COLS * BLOCK_SIZE;
  boardEl.height = ROWS * BLOCK_SIZE;
  boardDisplay.scale(BLOCK_SIZE, BLOCK_SIZE);

  game = new TetrisGame(boardDisplay, scoreEl, nextPieceDisplay, msgEl);
  game.start();
}

/* ----- event listeners -----*/

document.getElementById('start-button').addEventListener('click', init);
