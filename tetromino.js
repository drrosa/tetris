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
    if (this.checkCollision(0, 1)) this.#y += 1;
  }

  moveRight() {
    if (this.checkCollision(1, 0)) this.#x += 1;
  }

  moveLeft() {
    if (this.checkCollision(-1, 0)) this.#x -= 1;
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
    this.#shape = shape;
  }

  checkCollision(x, y) {
    const left = this.#getLeftMostBlock();
    left.x += this.#x + x;
    left.y += this.#y + y;
    const right = this.#getRightMostBlock();
    right.x += this.#x + x;
    right.y += this.#y + y;
    return (left.x >= 0 && left.y < ROWS && right.x < COLS && right.y < ROWS);
  }

  #getLeftMostBlock() {
    let left = { x: this.#shape[0].length, y: 0 };
    for (let y = 0; y < this.#shape.length; y += 1) {
      const x = this.#shape[y].findIndex((block) => block !== 0);
      if (x !== -1 && x <= left.x) {
        left = { x, y };
      }
    }
    return left;
  }

  #getRightMostBlock() {
    let right = { x: 0, y: 0 };
    for (let y = 0; y < this.#shape.length; y += 1) {
      const x = this.#shape[y].findLastIndex((block) => block !== 0);
      if (x !== -1 && x >= right.x) {
        right = { x, y };
      }
    }
    return right;
  }

  render(canvasCtx) {
    this.#shape.forEach((row, y) => {
      row.forEach((blockColor, x) => {
        if (this.#shape[y][x]) {
          // eslint-disable-next-line no-param-reassign
          canvasCtx.fillStyle = Tetromino.#COLORS[blockColor];
          canvasCtx.fillRect(this.#x + x, this.#y + y, 1, 1);
        }
      });
    });
  }
}
