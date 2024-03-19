import Tetromino from './tetromino.js';

/* ----- constants -----*/
const COLS = 10;
const ROWS = 20;
export const BLOCK_SIZE = 15;
export const WIDTH = COLS * BLOCK_SIZE;
export const HEIGHT = ROWS * BLOCK_SIZE;

export default class TetrisGame {
  constructor(boardDisplay, score, nextPieceDisplay, msg) {
    this.boardDisplay = boardDisplay;
    this.scoreEl = score;
    this.nextPieceDisplay = nextPieceDisplay;
    this.msgEl = msg;
    document.addEventListener('keydown', () => this.handleInput());
  }

  start() {
    this.board = [];
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = null;
    setInterval(() => this.#gameLoop(), 500);
  }

  #gameLoop() {
    this.#clearScreen();
    this.currentTetromino.moveDown();
    this.#render();
  }

  handleInput() {
    this.#clearScreen();
    this.currentTetromino.moveDown();
    this.#render();
  }

  #render() {
    this.currentTetromino.render(this.boardDisplay);
  }

  #clearScreen() {
    this.boardDisplay.clearRect(0, 0, WIDTH, HEIGHT);
  }
}
