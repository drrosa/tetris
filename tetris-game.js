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
    document.addEventListener('keydown', (kybd) => this.handleInput(kybd.code));
  }

  start() {
    this.board = [];
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = null;
    this.moves = {
      ArrowDown: () => { this.currentTetromino.moveDown(); },
      ArrowRight: () => { this.currentTetromino.moveRight(); },
      ArrowLeft: () => { this.currentTetromino.moveLeft(); },
    };
    setInterval(() => this.#gameLoop(), 500);
  }

  #gameLoop() {
    this.#clearScreen();
    this.currentTetromino.moveDown();
    this.#render();
  }

  handleInput(key) {
    if (key in this.moves) {
      this.#clearScreen();
      this.moves[key]();
      this.#render();
    }
  }

  #render() {
    this.currentTetromino.render(this.boardDisplay);
  }

  #clearScreen() {
    this.boardDisplay.clearRect(0, 0, WIDTH, HEIGHT);
  }
}
