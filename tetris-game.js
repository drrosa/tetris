import Tetromino from './tetromino.js';

export default class TetrisGame {
  constructor(boardDisplay, score, nextPieceDisplay, msg) {
    this.boardDisplay = boardDisplay;
    this.scoreEl = score;
    this.nextPieceDisplay = nextPieceDisplay;
    this.msgEl = msg;
  }

  start() {
    this.board = [];
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = null;
    this.#render();
  }

  #render() {
    this.currentTetromino.render(this.boardDisplay);
  }
}
