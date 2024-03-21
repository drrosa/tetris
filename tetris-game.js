import Tetromino from './tetromino.js';

/* ----- constants -----*/
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 15;
export const WIDTH = COLS * BLOCK_SIZE;
export const HEIGHT = ROWS * BLOCK_SIZE;

export default class TetrisGame {
  constructor(boardDisplay, score, nextPieceDisplay, msg) {
    this.boardDisplay = boardDisplay;
    this.scoreEl = score;
    this.nextPieceDisplay = nextPieceDisplay;
    this.msgEl = msg;
    this.boardImgData = this.boardDisplay.getImageData(0, 0, WIDTH, HEIGHT);
    document.addEventListener('keydown', (kybd) => {
      if (kybd.code in this.moves) {
        kybd.preventDefault();
        this.#update(kybd.code);
      }
    });
  }

  start() {
    this.score = 0;
    this.gameStatus = null;
    this.currentTetromino = new Tetromino();
    this.nextTetromino = null;
    this.moves = {
      ArrowDown: () => { this.currentTetromino.moveDown(); },
      ArrowRight: () => { this.currentTetromino.moveRight(); },
      ArrowLeft: () => { this.currentTetromino.moveLeft(); },
      ArrowUp: () => { this.currentTetromino.rotate(); },
    };
    setInterval(() => this.#update(), 500);
  }

  #update(key) {
    this.#render();

    if (key in this.moves) { this.moves[key](); return; }

    const moveDown = this.currentTetromino.moveDown();
    if (!moveDown) {
      this.boardImgData = this.boardDisplay.getImageData(0, 0, WIDTH, HEIGHT);
      this.currentTetromino = new Tetromino();
    } else if (moveDown === -1) this.msgEl.innerText = 'Game Over!';
  }

  #render() {
    this.boardDisplay.putImageData(this.boardImgData, 0, 0);
    this.currentTetromino.render(this.boardDisplay);
  }
}
