import Tetromino from './tetromino.js';

/* ----- constants -----*/
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 15;
export const WIDTH = COLS * BLOCK_SIZE;
export const HEIGHT = ROWS * BLOCK_SIZE;
const MSGS = {
  null: '',
  0: 'GAME OVER!',
  1: 'YOU WON!',
};

export default class TetrisGame {
  constructor(boardDisplay, score, nextPieceDisplay, msg) {
    this.boardDisplay = boardDisplay;
    this.scoreEl = score;
    this.nextPieceDisplay = nextPieceDisplay;
    this.msgEl = msg;
    this.boardImgData = this.boardDisplay.getImageData(0, 0, WIDTH, HEIGHT);
    this.keydownHandler = (kybd) => {
      if (kybd.code in this.moves) {
        kybd.preventDefault();
        this.moves[kybd.code]();
        this.#render();
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  start() {
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = new Tetromino();
    this.#render();
    this.moves = {
      ArrowDown: () => { this.currentTetromino.moveDown(); },
      ArrowRight: () => { this.currentTetromino.moveRight(); },
      ArrowLeft: () => { this.currentTetromino.moveLeft(); },
      ArrowUp: () => { this.currentTetromino.rotate(); },
    };
    this.intervalID = setInterval(() => this.#update(), 500);
  }

  #update() {
    this.#render();
    const moveDown = this.currentTetromino.moveDown();
    if (!moveDown) {
      const lines = Tetromino.checkClearLines();
      if (lines) {
        this.boardDisplay.clearRect(0, 0, COLS, ROWS);
        Tetromino.renderBoard(this.boardDisplay);
        this.score += lines;
      }
      this.boardImgData = this.boardDisplay.getImageData(0, 0, WIDTH, HEIGHT);
      this.currentTetromino = this.nextTetromino;
      this.nextTetromino = new Tetromino();
    } else if (moveDown === -1) this.gameStatus = 0;

    if (this.gameStatus != null) this.stop();
  }

  stop() {
    this.#render();
    clearInterval(this.intervalID);
    document.removeEventListener('keydown', this.keydownHandler);
    Tetromino.resetBoard();
  }

  #render() {
    this.boardDisplay.putImageData(this.boardImgData, 0, 0);
    this.currentTetromino.render(this.boardDisplay);
    this.nextPieceDisplay.clearRect(0, 0, HEIGHT, WIDTH);
    this.nextTetromino.render(this.nextPieceDisplay, true);
    this.scoreEl.innerText = this.score;
    this.msgEl.innerText = MSGS[this.gameStatus];
  }
}
