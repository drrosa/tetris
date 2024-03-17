import Tetromino from './tetromino.js';

/* ----- constants -----*/

/* ----- app's state (variables) -----*/
let game;

/* ----- cached element references -----*/
const boardEl = document.getElementById('board-canvas');
const scoreEl = document.getElementById('score');
const nextPiecelEl = document.getElementById('next-piece-canvas');
const msgEl = document.getElementById('message');

/* ----- event listeners -----*/

/* ----- classes -----*/

class TetrisGame {
  constructor(board, score, nextPiece, msg) {
    this.boardEl = board;
    this.scoreEl = score;
    this.nextPieceEl = nextPiece;
    this.msgEl = msg;
    this.boardDisplay = board.getContext('2d');
    this.nextPieceDisplay = nextPiece.getContext('2d');
    this.boardEl.width = 10;
    this.boardEl.height = 20;
  }

  start() {
    this.board = [];
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino(this.boardDisplay);
    this.nextTetromino = null;
    this.render();
  }

  render() {
    console.log('Render game');
    this.currentTetromino.render();
  }
}

/* ----- functions -----*/
function init() {
  game = new TetrisGame(boardEl, scoreEl, nextPiecelEl, msgEl);
  game.start();
}

init();
