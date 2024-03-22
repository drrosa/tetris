import { ROWS, COLS } from './tetris-game.js';

export default class Tetromino {
  /* ----- constants -----*/

  static #SHAPES = Object.freeze([
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    [
      [4, 4, 0],
      [0, 4, 4],
      [0, 0, 0],
    ],
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 7, 0],
      [0, 7, 7, 0],
      [0, 0, 0, 0],
    ],
  ]);

  static #COLORS = Object.freeze([
    '#15171b',
    'cyan',
    'blue',
    'orange',
    'red',
    'green',
    'purple',
    'yellow',
  ]);

  /* ----- state variables -----*/
  static #board = new Array(20).fill(null).map(() => new Array(10).fill(null));

  #shape;

  #x;

  #y;

  /* ----- methods -----*/

  constructor() {
    const idx = Math.floor(Math.random() * Tetromino.#SHAPES.length);
    this.#shape = Tetromino.#SHAPES[idx];
    // The even width tetrominoes (⎢ and □) spawn in the center;
    // the 3-cell wide tetrominoes spawn in the center of the left half.
    this.#x = (this.#shape[0].length % 2 === 0) ? 3 : 1;
    this.#y = -1;
  }

  moveDown() {
    const validMove = this.validMove(this.#x, this.#y + 1);
    if (validMove) this.#y += 1;
    else if (this.#y >= 0) this.#saveLocation();
    return (this.#y === -1) ? -1 : validMove;
  }

  moveRight() {
    if (this.validMove(this.#x + 1, this.#y)) this.#x += 1;
  }

  moveLeft() {
    if (this.validMove(this.#x - 1, this.#y)) this.#x -= 1;
  }

  rotate() {
    // Transpose and reverse rows
    // to get a 90º rotation.
    const shape = [];
    this.#shape.forEach((row, i) => {
      shape.push([]);
      row.forEach((_, j) => {
        shape[i][j] = this.#shape[j][i];
      });
      shape[i].reverse();
    });
    if (this.validMove(this.#x, this.#y, shape)) this.#shape = shape;
  }

  validMove(x, y, rotated = null) {
    const left = this.#getLeftMostBlock(rotated);
    const right = this.#getRightMostBlock(rotated);
    return (
      left.x + x >= 0
      && left.y + y < ROWS
      && right.x + x < COLS
      && right.y + y < ROWS
      && !Tetromino.#board[left.y + y][left.x + x]
      && !Tetromino.#board[right.y + y][right.x + x]
    );
  }

  #getLeftMostBlock(rotated = null) {
    const shape = rotated || this.#shape;
    let left = { x: shape[0].length, y: 0 };
    shape.forEach((row, y) => {
      const x = row.findIndex((block) => block !== 0);
      if (x !== -1 && x <= left.x) {
        left = { x, y };
      }
    });
    return left;
  }

  #getRightMostBlock(rotated = null) {
    const shape = rotated || this.#shape;
    let right = { x: 0, y: 0 };
    shape.forEach((row, y) => {
      const x = row.findLastIndex((block) => block !== 0);
      if (x !== -1 && x >= right.x) {
        right = { x, y };
      }
    });
    return right;
  }

  #saveLocation() {
    this.#shape.forEach((row, y) => {
      row.forEach((blockColor, x) => {
        if (blockColor) {
          Tetromino.#board[this.#y + y][this.#x + x] = blockColor;
        }
      });
    });
  }

  static checkClearLines() {
    let lineCount = 0;
    Tetromino.#board.forEach((row, y) => {
      if (!row.includes(null)) {
        Tetromino.#board.splice(y, 1);
        Tetromino.#board.unshift(new Array(COLS).fill(null));
        lineCount += 1;
      }
    });
    return lineCount;
  }

  static renderBoard(boardDisplay) {
    Tetromino.#board.forEach((row, y) => {
      row.forEach((blockColor, x) => {
        if (blockColor) {
          // eslint-disable-next-line no-param-reassign
          boardDisplay.fillStyle = Tetromino.#COLORS[blockColor];
          boardDisplay.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  render(canvasCtx) {
    this.#shape.forEach((row, y) => {
      row.forEach((blockColor, x) => {
        if (blockColor) {
          // eslint-disable-next-line no-param-reassign
          canvasCtx.fillStyle = Tetromino.#COLORS[blockColor];
          canvasCtx.fillRect(this.#x + x, this.#y + y, 1, 1);
        }
      });
    });
  }
}
