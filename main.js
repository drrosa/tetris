import TetrisGame, { WIDTH, HEIGHT, BLOCK_SIZE } from './tetris-game.js';

/* ----- app's state (variables) -----*/

let game;

/* ----- cached element references -----*/

const boardEl = document.getElementById('board-canvas');
const scoreEl = document.getElementById('score');
const nextPiecelEl = document.getElementById('next-piece-canvas');
const msgEl = document.getElementById('message');

/* ----- functions -----*/

function init() {
  if (!game) {
    const boardDisplay = boardEl.getContext('2d', { willReadFrequently: true });
    const nextPieceDisplay = nextPiecelEl.getContext('2d');

    boardEl.width = WIDTH;
    boardEl.height = HEIGHT;
    boardDisplay.scale(BLOCK_SIZE, BLOCK_SIZE);

    nextPiecelEl.width = HEIGHT;
    nextPiecelEl.height = WIDTH;
    nextPieceDisplay.scale(HEIGHT / 6, WIDTH / 6);

    game = new TetrisGame(boardDisplay, scoreEl, nextPieceDisplay, msgEl);
    game.start();
  }
}

/* ----- event listeners -----*/
document.getElementById('start-button').addEventListener('click', init);
