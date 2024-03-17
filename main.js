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
  }

  start() {
    this.board = [];
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = null;
    this.nextTetromino = null;
    this.render();
  }

  render() {
    console.log('Render game');
  }
}

/* ----- functions -----*/
function init() {
  game = new TetrisGame(boardEl, scoreEl, nextPiecelEl, msgEl);
  game.start();
}

init();
